/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { 
  User, 
  Briefcase, 
  FolderKanban, 
  FileText, 
  BarChart3, 
  Mail, 
  MapPin, 
  Phone, 
  Globe, 
  Share2, 
  Link as LinkIcon, 
  Award,
  ChevronRight,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Code2,
  Palette,
  Layout
} from 'lucide-react';

// --- Types ---
type Tab = 'inicio' | 'informacion' | 'proyectos' | 'hoja-de-vida' | 'experiencia' | 'estadisticas' | 'contacto';

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (tab: Tab) => void }) => {
  const tabs: { id: Tab, label: string }[] = [
    { id: 'inicio', label: 'INICIO' },
    { id: 'informacion', label: 'MI INFORMACIÓN' },
    { id: 'proyectos', label: 'MIS PROYECTOS' },
    { id: 'hoja-de-vida', label: 'HOJA DE VIDA' },
    { id: 'experiencia', label: 'EXPERIENCIA' },
    { id: 'estadisticas', label: 'ESTADÍSTICAS' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-2xl font-serif font-bold tracking-tight">Portfolio</div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] md:text-xs font-semibold tracking-widest">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`transition-colors hover:text-brand relative py-1 ${activeTab === tab.id ? 'text-brand' : 'text-slate-400'}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand" />
            )}
          </button>
        ))}
      </div>
      <button 
        onClick={() => setActiveTab('contacto')}
        className="bg-brand hover:bg-amber-700 text-white px-6 py-2 text-[10px] font-bold tracking-widest transition-colors"
      >
        HAGAMOS ALGO INCREÍBLE
      </button>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-widest text-slate-500 font-medium">
    <div>© 2024 LIGHT EDITORIAL PORTFOLIO. ALL RIGHTS RESERVED.</div>
    <div className="flex gap-8">
      <a href="#" className="hover:text-brand transition-colors">LINKEDIN</a>
      <a href="#" className="hover:text-brand transition-colors">GITHUB</a>
      <a href="#" className="hover:text-brand transition-colors">DRIBBBLE</a>
    </div>
  </footer>
);

// --- Sections ---

const Inicio = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-1 h-12 bg-brand" />
            <span className="text-brand font-bold tracking-[0.3em] text-xs">EDICIÓN 2024</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-bold leading-[0.9] text-slate-900 mb-8"
          >
            Mi<br />
            <motion.span 
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              Portafolio
            </motion.span>
            <br />Profesional
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Ingeniería de Sistemas - Diseño</h2>
            <p className="text-slate-500 tracking-widest text-sm font-medium uppercase">Vimmy Ferney Cuestas Coral</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-200"
          >
            <div>
              <div className="text-3xl font-bold text-slate-900">10+</div>
              <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">Años Experiencia</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">50+</div>
              <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">Proyectos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">12</div>
              <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">Premios</div>
            </div>
          </motion.div>
        </div>
        
        <div className="lg:col-span-5 relative perspective-1000">
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateY,
              rotateX,
              transformStyle: "preserve-3d",
            }}
            className="aspect-square bg-slate-900 p-8 relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer group"
          >
            {/* Inner border layer */}
            <motion.div
              style={{
                transform: "translateZ(75px)",
                transformStyle: "preserve-3d",
              }}
              className="absolute inset-4 border-2 border-brand/30 rounded-xl pointer-events-none z-10"
            />
            
            {/* Main image layer */}
            <motion.img 
              src="https://picsum.photos/seed/tech-abstract/800/800" 
              alt="Abstract Tech" 
              style={{
                transform: "translateZ(50px)",
              }}
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity rounded-lg"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            
            {/* Bottom info layer */}
            <motion.div 
              style={{
                transform: "translateZ(100px)",
              }}
              className="absolute bottom-0 left-0 right-0 p-8 bg-black/80 backdrop-blur-sm flex items-start gap-4"
            >
              <div className="p-2 bg-brand rounded shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-1">Visión Técnica</h3>
                <p className="text-slate-400 text-[10px] leading-relaxed">
                  Fusionando lógica de sistemas con estética editorial contemporánea.
                </p>
              </div>
            </motion.div>

            {/* Floating decorative elements with different depths */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-10 right-10 w-12 h-12 border border-brand/50 rounded-full z-20"
              style={{ transform: "translateZ(120px)" }}
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-20 left-10 w-8 h-8 bg-brand/20 backdrop-blur-md rounded-lg z-20"
              style={{ transform: "translateZ(90px)" }}
            />
            
            {/* New 3D floating tag */}
            <motion.div
              style={{
                transform: "translateZ(150px)",
              }}
              className="absolute top-1/4 -right-4 bg-brand text-white text-[8px] font-bold px-3 py-1 rounded-full shadow-xl z-30"
            >
              PREMIUM
            </motion.div>
          </motion.div>
          
          {/* Background glow with pulse */}
          <div className="absolute -inset-4 bg-brand/10 blur-3xl rounded-full -z-10 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-slate-100 p-12 relative overflow-hidden group">
        <div className="relative z-10">
          <div className="w-12 h-1 bg-brand mb-8" />
          <h3 className="text-4xl font-bold text-slate-900 mb-4">Diseño de<br />Sistemas</h3>
          <p className="text-slate-500 max-w-md leading-relaxed">
            Arquitecturas escalables que priorizan la experiencia del usuario y la eficiencia operativa.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <img src="https://picsum.photos/seed/blueprint/800/600" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>
      
      <div className="flex flex-col gap-6">
        <div className="bg-slate-50 border-t-4 border-brand p-8 flex-1">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Desarrollo Frontend</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Interfaces pixel-perfect con rendimiento optimizado para la web moderna.
          </p>
          <div className="flex justify-end">
            <Code2 className="w-6 h-6 text-brand" />
          </div>
        </div>
        
        <div className="bg-black p-8 flex-1 flex flex-col justify-end">
          <Palette className="w-8 h-8 text-brand mb-4" />
          <h3 className="text-2xl font-bold text-white">Identidad Visual Premium</h3>
        </div>
      </div>
    </div>

    <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold tracking-[0.4em] text-slate-400 uppercase">Rating</span>
        <span className="text-6xl font-serif font-bold text-brand italic">99%</span>
      </div>
      <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase text-center md:text-right max-w-xs">
        Satisfacción total garantizada en cada entrega profesional.
      </p>
    </div>
  </div>
  );
};

const Informacion = () => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      <div className="lg:col-span-4 flex flex-col items-center">
        <div className="w-full aspect-square rounded-[3rem] overflow-hidden mb-8 shadow-2xl">
          <img 
            src="https://picsum.photos/seed/vimmy/600/600" 
            alt="Vimmy Ferney" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-2">Vimmy Ferney<br />Cuestas Coral</h2>
        <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">Digital Strategist / Editorial Curator</p>
        
        <div className="flex gap-4">
          <button className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-brand"><Share2 className="w-4 h-4" /></button>
          <button className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-brand"><LinkIcon className="w-4 h-4" /></button>
          <button className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-brand"><Briefcase className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="lg:col-span-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-12 bg-brand" />
          <h2 className="text-6xl font-bold text-slate-900">Mi Información</h2>
        </div>
        
        <p className="text-slate-500 text-lg leading-relaxed mb-12 max-w-2xl">
          Soy un Ingeniero de sistemas profesional con mucho trabajo como desarrollador. Transformo visiones conceptuales en arquitecturas digitales de alto impacto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex items-start gap-6">
            <div className="p-3 bg-brand/10 rounded-lg"><MapPin className="w-6 h-6 text-brand" /></div>
            <div>
              <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Ubicación</h4>
              <p className="text-slate-900 font-medium">Pasto, Colombia</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="p-3 bg-brand/10 rounded-lg"><Mail className="w-6 h-6 text-brand" /></div>
            <div>
              <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Correo Electrónico</h4>
              <p className="text-slate-900 font-medium">vimmy.cuestas@example.com</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="p-3 bg-brand/10 rounded-lg"><Phone className="w-6 h-6 text-brand" /></div>
            <div>
              <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Teléfono</h4>
              <p className="text-slate-900 font-medium">+57 300 456 7890</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="p-3 bg-brand/10 rounded-lg"><Globe className="w-6 h-6 text-brand" /></div>
            <div>
              <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Sitio Web</h4>
              <p className="text-slate-900 font-medium">www.miPortfolio.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-24 pt-12 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h4 className="text-[10px] font-bold tracking-[0.3em] text-brand uppercase mb-4">Base de Operaciones</h4>
        <p className="text-2xl font-serif italic text-slate-500">"Innovando desde el corazón de Nariño para el mundo digital."</p>
      </div>
      <div className="h-64 bg-slate-100 rounded-3xl overflow-hidden relative">
        <img 
          src="https://picsum.photos/seed/map-pasto/800/400" 
          alt="Map Location" 
          className="w-full h-full object-cover opacity-50 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-brand rounded-full animate-ping" />
          <div className="w-3 h-3 bg-brand rounded-full absolute" />
        </div>
      </div>
    </div>
  </div>
);

const Proyectos = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotionData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/notion-projects');
        
        const contentType = response.headers.get("content-type");
        const isJson = contentType && contentType.includes("application/json");

        if (!isJson) {
          const text = await response.text();
          console.error('Respuesta no-JSON recibida:', text);
          throw new Error(`El servidor devolvió un error (formato ${contentType}). Es probable que la ruta /api/notion-projects no esté disponible en Vercel.`);
        }

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || `Error del servidor (Status: ${response.status})`);
        }
        
        setProjects(data);
      } catch (err: any) {
        console.error('Error al cargar proyectos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotionData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-12 bg-brand" />
          <h2 className="text-6xl font-bold text-slate-900">Mis Proyectos</h2>
        </div>
        <p className="text-slate-500 text-lg">Trabajos sincronizados dinámicamente desde mi página "Portafolio" en Notion.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-8 rounded-3xl text-center border border-red-100">
          <p className="font-bold mb-2">Ups! Algo salió mal</p>
          <p className="text-sm">{error}</p>
          <p className="mt-4 text-xs font-mono bg-white inline-block px-4 py-2 rounded-lg">
            Asegúrate de que la integración en Notion tenga acceso a la página "Portafolio".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((proj, i) => (
            <motion.div 
              key={proj.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden mb-6 relative shadow-sm border border-slate-200">
                <img 
                  src={proj.img} 
                  alt={proj.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="text-white w-10 h-10" />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand transition-colors">{proj.title}</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">{proj.desc}</p>
              <div className="flex gap-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                {proj.tags.map((tag: any) => <span key={tag}>{tag}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const HojaDeVida = () => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
    <div className="bg-white p-12 md:p-24 shadow-2xl rounded-[4rem] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-0" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-6 mb-16">
          <div className="w-16 h-1 bg-brand" />
          <h2 className="text-7xl font-bold text-slate-900">Hoja de Vida</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-6 h-6 text-brand" />
                <h3 className="text-xl font-bold tracking-widest uppercase text-slate-900">EDUCACIÓN</h3>
              </div>
              
              <div className="space-y-12">
                <div>
                  <span className="text-[10px] font-bold text-slate-400">2014 - 2018</span>
                  <h4 className="text-2xl font-bold text-slate-900 mt-1">título bachiller</h4>
                  <p className="text-slate-500 mt-2">Recibido académicamente en la institución educativa san Juan Bautista</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400">2020 - 2024</span>
                  <h4 className="text-2xl font-bold text-slate-900 mt-1">título universitario</h4>
                  <p className="text-slate-500 italic mt-2">ingeniería en computación e informática</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-12 border-t border-slate-100">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">EDAD</h4>
                <p className="text-slate-900 font-medium">22</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">FECHA DE NACIMIENTO</h4>
                <p className="text-slate-900 font-medium">07-12-2001</p>
              </div>
              <div className="col-span-2">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">EXPERIENCIA LABORAL</h4>
                <p className="text-slate-900 font-medium">trabaje como celador, atendiendo en una cafetería</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="relative">
              <div className="aspect-[4/5] bg-slate-200 rounded-3xl overflow-hidden rotate-3 shadow-xl">
                <img src="https://picsum.photos/seed/portrait-cv/500/600" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute inset-0 border-2 border-slate-900 rounded-3xl -rotate-3 pointer-events-none" />
            </div>

            <div className="bg-slate-100 p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Layout className="w-5 h-5 text-brand" />
                <h3 className="text-sm font-bold tracking-widest uppercase text-slate-900">HABILIDADES CLAVE</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {['CSS', 'JAVA', 'PHP', 'SQL', 'JS'].map(skill => (
                  <span key={skill} className="bg-white px-4 py-2 rounded-lg text-[10px] font-bold text-slate-600 shadow-sm">{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-brand" />
                <h3 className="text-sm font-bold tracking-widest uppercase text-slate-900">IDIOMAS</h3>
              </div>
              <div className="space-y-6">
                {[
                  { lang: 'ESPAÑOL', level: 'NATIVO', val: 100 },
                  { lang: 'INGLÉS', level: 'AVANZADO', val: 80 },
                  { lang: 'PORTUGUÉS', level: 'INTERMEDIO', val: 60 },
                ].map(i => (
                  <div key={i.lang}>
                    <div className="flex justify-between text-[10px] font-bold mb-2">
                      <span className="text-slate-900">{i.lang}</span>
                      <span className="text-slate-400">{i.level}</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand" style={{ width: `${i.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Experiencia = () => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-1 h-12 bg-brand" />
      <h2 className="text-6xl font-bold text-slate-900">Experiencia Profesional</h2>
    </div>
    <p className="text-slate-500 text-lg italic mb-24">"Un viaje de evolución constante, desde la disciplina física hasta la arquitectura digital."</p>

    <div className="space-y-24 relative">
      <div className="absolute left-0 md:left-48 top-0 bottom-0 w-px bg-slate-100 hidden md:block" />
      
      {[
        { year: '2022 - ACTUALIDAD', role: 'desarrollador', status: 'ACTUAL', desc: 'Liderando la arquitectura y el desarrollo de interfaces de usuario de alto impacto. Especializado en ecosistemas de diseño escalables y optimización de rendimiento en el lado del cliente.' },
        { year: '2018 - 2021', role: 'celador', desc: 'Responsable de la seguridad perimetral y el control de accesos en entornos corporativos de alta demanda. Una etapa definida por la disciplina, la observación aguda y la resolución de conflictos en tiempo real.' },
        { year: '2014 - 2017', role: 'panadero', desc: 'Maestría artesanal en la elaboración de productos de panadería fina. Gestión de inventarios, optimización de tiempos de producción y control de calidad bajo estándares rigurosos.' }
      ].map((exp, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 relative">
          <div className="md:col-span-3">
            <span className="text-[10px] font-bold text-slate-400 tracking-widest">{exp.year}</span>
            {exp.status && <div className="text-brand text-[10px] font-bold mt-1">{exp.status}</div>}
          </div>
          <div className="md:col-span-1 flex justify-center relative">
            <div className="w-3 h-3 rounded-full bg-brand mt-2 z-10" />
          </div>
          <div className="md:col-span-8 border-l-2 border-brand pl-8 py-2">
            <h3 className="text-4xl font-bold text-slate-900 mb-6">{exp.role}</h3>
            <p className="text-slate-500 leading-relaxed mb-8 max-w-2xl">{exp.desc}</p>
            <div className="flex gap-8 text-[10px] font-bold tracking-widest text-brand uppercase">
              <button className="hover:underline">IR (PAGO MES 1)</button>
              <button className="hover:underline">IR (PAGO MES 2)</button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="group">
        <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden mb-6">
          <img src="https://picsum.photos/seed/exp1/800/450" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
        </div>
        <h4 className="text-2xl font-bold text-slate-900">Arquitectura Digital</h4>
        <p className="text-[10px] font-bold tracking-widest text-brand uppercase mt-2">ENFOQUE ACTUAL</p>
      </div>
      <div className="group">
        <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden mb-6">
          <img src="https://picsum.photos/seed/exp2/800/450" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
        </div>
        <h4 className="text-2xl font-bold text-slate-900">Raíces Artesanales</h4>
        <p className="text-[10px] font-bold tracking-widest text-brand uppercase mt-2">EL COMIENZO</p>
      </div>
    </div>
  </div>
);

const Estadisticas = () => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
      <div className="flex items-center gap-4">
        <div className="w-1 h-12 bg-brand" />
        <h2 className="text-6xl font-bold text-slate-900">Estadísticas</h2>
      </div>
      <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase text-right max-w-xs leading-relaxed">
        MÉTRICAS QUE RESPALDAN MI TRAYECTORIA PROFESIONAL Y COMPROMISO CON LA EXCELENCIA.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
      {[
        { icon: Briefcase, val: '50+', label: 'PROYECTOS COMPLETADOS' },
        { icon: User, val: '30+', label: 'CLIENTES SATISFECHOS' },
        { icon: Award, val: '8', label: 'AÑOS DE EXPERIENCIA' },
        { icon: Award, val: '12', label: 'CERTIFICACIONES' },
      ].map((stat, i) => (
        <div key={i} className="bg-slate-50 p-8 flex items-center gap-6 group hover:bg-white hover:shadow-xl transition-all duration-300">
          <div className="p-3 bg-brand/10 rounded-lg group-hover:bg-brand group-hover:text-white transition-colors">
            <stat.icon className="w-6 h-6 text-brand group-hover:text-white" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">{stat.val}</div>
            <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>

    <div>
      <h3 className="text-3xl font-bold text-slate-900 mb-12">Dominio Técnico</h3>
      <div className="space-y-12">
        {[
          { skill: 'PHP', val: 92, color: 'bg-brand' },
          { skill: 'JAVA', val: 85, color: 'bg-brand' },
          { skill: 'C++', val: 78, color: 'bg-slate-700' },
          { skill: 'SQL', val: 95, color: 'bg-slate-700' },
        ].map(s => (
          <div key={s.skill}>
            <div className="flex justify-between text-[10px] font-bold mb-4">
              <span className="text-slate-900 tracking-widest">{s.skill}</span>
              <span className="text-slate-400">({s.val}%)</span>
            </div>
            <div className="h-4 bg-slate-50 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${s.val}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full ${s.color}`} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Contacto = () => (
  <div className="min-h-[calc(100vh-160px)] flex flex-col md:flex-row">
    <div className="md:w-1/2 bg-slate-50 flex items-center justify-center p-12">
      <div className="max-w-md w-full aspect-square bg-slate-900 relative overflow-hidden shadow-2xl">
        <img 
          src="https://picsum.photos/seed/contact-abstract/800/800" 
          alt="Contact Abstract" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent" />
      </div>
    </div>
    <div className="md:w-1/2 bg-white flex items-center justify-center p-12 md:p-24">
      <div className="max-w-lg w-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-0.5 bg-brand" />
          <span className="text-brand font-bold tracking-[0.3em] text-[10px] uppercase">TRABAJEMOS JUNTOS</span>
        </div>
        <h2 className="text-7xl font-bold text-slate-900 mb-16 leading-[0.9]">Hagamos algo increíble.</h2>
        
        <div className="space-y-12">
          <div className="flex items-center gap-8 group">
            <div className="p-3 bg-brand/10 rounded-lg group-hover:bg-brand transition-colors">
              <Mail className="w-6 h-6 text-brand group-hover:text-white" />
            </div>
            <p className="text-slate-500 text-lg font-medium">hello@midnight-editorial.com</p>
          </div>
          <div className="flex items-center gap-8 group">
            <div className="p-3 bg-brand/10 rounded-lg group-hover:bg-brand transition-colors">
              <Phone className="w-6 h-6 text-brand group-hover:text-white" />
            </div>
            <p className="text-slate-500 text-lg font-medium">+1 (555) 0123-4567</p>
          </div>
          <div className="flex items-center gap-8 group">
            <div className="p-3 bg-brand/10 rounded-lg group-hover:bg-brand transition-colors">
              <Globe className="w-6 h-6 text-brand group-hover:text-white" />
            </div>
            <p className="text-slate-500 text-lg font-medium">www.midnight-editorial.com</p>
          </div>
        </div>

        <div className="flex gap-4 mt-16">
          <button className="p-4 bg-slate-50 rounded-full hover:bg-brand hover:text-white transition-all text-slate-400"><Share2 className="w-5 h-5" /></button>
          <button className="p-4 bg-slate-50 rounded-full hover:bg-brand hover:text-white transition-all text-slate-400"><Globe className="w-5 h-5" /></button>
          <button className="p-4 bg-slate-50 rounded-full hover:bg-brand hover:text-white transition-all text-slate-400"><Twitter className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('inicio');

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio': return <Inicio />;
      case 'informacion': return <Informacion />;
      case 'proyectos': return <Proyectos />;
      case 'hoja-de-vida': return <HojaDeVida />;
      case 'experiencia': return <Experiencia />;
      case 'estadisticas': return <Estadisticas />;
      case 'contacto': return <Contacto />;
      default: return <Inicio />;
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-brand selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
