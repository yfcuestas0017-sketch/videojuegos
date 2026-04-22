import { Client } from '@notionhq/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers if needed (though on the same domain it's usually fine)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    if (!process.env.NOTION_API_KEY) {
      return res.status(500).json({ error: 'NOTION_API_KEY no está configurada.' });
    }

    // Search for the page titled "Portafolio"
    const searchResponse = await notion.search({
      query: 'Portafolio',
      filter: { property: 'object', value: 'page' },
    });

    const page = searchResponse.results[0];
    if (!page) {
      return res.status(404).json({ error: 'No se encontró una página llamada "Portafolio" en Notion. Asegúrate de que la integración tenga acceso a ella.' });
    }

    // Get the blocks (content)
    const blocksResponse = await notion.blocks.children.list({
      block_id: page.id,
    });

    const projects: any[] = [];
    let currentProject: any = null;

    blocksResponse.results.forEach((block: any) => {
      if (block.type === 'heading_2') {
        if (currentProject) projects.push(currentProject);
        currentProject = {
          id: block.id,
          title: block.heading_2.rich_text[0]?.plain_text || 'Proyecto sin título',
          desc: '',
          img: '',
          tags: ['NOTION']
        };
      } else if (block.type === 'paragraph' && currentProject) {
        currentProject.desc += block.paragraph.rich_text[0]?.plain_text + ' ';
      } else if (block.type === 'image' && currentProject) {
        currentProject.img = block.image.file?.url || block.image.external?.url || '';
      }
    });

    if (currentProject) projects.push(currentProject);

    const finalizedProjects = projects.map(p => ({
      ...p,
      img: p.img || 'https://picsum.photos/seed/' + p.id + '/600/400'
    }));

    return res.status(200).json(finalizedProjects);
  } catch (error: any) {
    console.error('Notion Error:', error);
    return res.status(500).json({ error: error.message || 'Error al conectar con Notion' });
  }
}
