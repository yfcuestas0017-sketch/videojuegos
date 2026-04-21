import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Notion client with the secret key from environment
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  app.use(express.json());

  // API Endpoint to fetch projects from a Notion PAGE called "Portafolio"
  app.get('/api/notion-projects', async (req, res) => {
    try {
      if (!process.env.NOTION_API_KEY) {
        return res.status(500).json({ error: 'NOTION_API_KEY no está configurada en los Secrets.' });
      }

      // Step 1: Search for the page titled "Portafolio"
      const searchResponse = await notion.search({
        query: 'Portafolio',
        filter: { property: 'object', value: 'page' },
      });

      const page = searchResponse.results[0];
      if (!page) {
        return res.status(404).json({ error: 'No se encontró una página llamada "Portafolio" en Notion.' });
      }

      // Step 2: Get the blocks (content) of that page
      const blocksResponse = await notion.blocks.children.list({
        block_id: page.id,
      });

      // Step 3: Parse blocks into project objects
      // Logic: A Heading 2 starts a new project, Paragraphs are descriptions, Images are images.
      const projects: any[] = [];
      let currentProject: any = null;

      blocksResponse.results.forEach((block: any) => {
        if (block.type === 'heading_2') {
          // New project found
          if (currentProject) projects.push(currentProject);
          currentProject = {
            id: block.id,
            title: block.heading_2.rich_text[0]?.plain_text || 'Proyecto sin título',
            desc: '',
            img: '',
            tags: ['NOTION']
          };
        } else if (block.type === 'paragraph' && currentProject) {
          // Append to project description
          currentProject.desc += block.paragraph.rich_text[0]?.plain_text + ' ';
        } else if (block.type === 'image' && currentProject) {
          // Set project image
          currentProject.img = block.image.file?.url || block.image.external?.url || '';
        }
      });

      // Push the last project found
      if (currentProject) projects.push(currentProject);

      // Filter out incomplete projects and add defaults for missing images
      const finalizedProjects = projects.map(p => ({
        ...p,
        img: p.img || 'https://picsum.photos/seed/' + p.id + '/600/400'
      }));

      res.json(finalizedProjects);
    } catch (error: any) {
      console.error('Error Notion:', error);
      res.status(500).json({ error: error.message || 'Error al conectar con Notion' });
    }
  });

  // Handle Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
