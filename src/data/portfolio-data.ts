// src/data/portfolio-data.ts
// Portfolio data — migrated from Next.js data.tsx
// NO ReactNode, NO JSX — pure TypeScript

// ─── Category Types ───────────────────────────────────────────────────────────

export type ProjectCategory =
  | "platform"
  | "commerce"
  | "brand"
  | "ai"
  | "vision";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface SocialNetwork {
  id: number;
  name: string;
  url: string;
  icon: string;
}

export interface NavigationItem {
  id: number;
  label: string;
  href: string;
  sectionId?: string;
}

export interface CareerEntry {
  id: number;
  title: string;
  role: string;
  period: string;
  description: string;
}

export interface Statistic {
  id: number;
  value: number;
  label: string;
  suffix?: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  image: string;
  urlGithub?: string;
  urlDemo?: string;
  summary: string;
  description: string;
  year: number;
  category: ProjectCategory;
  featured: boolean;
  technologies: string[];
  highlights: string[];
}

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  tagline: string;
  availableForWork: boolean;
}

// ─── Personal Info ────────────────────────────────────────────────────────────

export const personalInfo: PersonalInfo = {
  name: "Ignacio Chiappero",
  role: "Full Stack & AI Developer",
  location: "Santa Fe, Argentina",
  email: "hola@nachodev.com",
  phone: "+54 342 409-4061",
  tagline: "Desarrollo robusto y creativo.",
  availableForWork: true,
};

// ─── About Text ───────────────────────────────────────────────────────────────

export const aboutText: string[] = [
  "Soy Nacho, desarrollador frontend y de IA con foco en interfaces que dicen algo — con criterio, no con ruido. Combino diseño y código para construir productos digitales que tienen carácter.",
  "Trabajo con varias tecnologías de vanguardia para lograr combinar estilo y performance, y estoy especializado en integración de IA generativa, automatización con n8n, despliegue de agentes autónomos, así como también desarrollo y despliegue punta a punta de todo tipo de software a medida. Además, llevo más de una década en diseño de interfaces y cuento con un grado en honores de artes gráficas, lo que le da a cada proyecto una base visual sólida.",
  "Me interesa construir herramientas que funcionen bien y que se vean bien. No como opuestos — como lo mismo.",
];

// ─── Social Networks ──────────────────────────────────────────────────────────

export const socialNetworks: SocialNetwork[] = [
  {
    id: 1,
    name: "WhatsApp",
    url: "https://wa.me/+543424094061",
    icon: "whatsapp",
  },
  {
    id: 2,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ignacio-chiappero-129360228/",
    icon: "linkedin",
  },
  {
    id: 3,
    name: "GitHub",
    url: "https://github.com/ignaciochiappero",
    icon: "github",
  },
  {
    id: 4,
    name: "YouTube",
    url: "https://www.youtube.com/@nachochiapperodev",
    icon: "youtube",
  },
];

// ─── Navigation Items ─────────────────────────────────────────────────────────

export const navigationItems: NavigationItem[] = [
  {
    id: 1,
    label: "Home",
    href: "/",
    sectionId: "inicio",
  },
  {
    id: 2,
    label: "Manifesto",
    href: "/manifesto",
    sectionId: "manifesto",
  },
  {
    id: 3,
    label: "Work",
    href: "/work",
    sectionId: "work",
  },
];

// ─── Career Timeline ──────────────────────────────────────────────────────────

export const careerTimeline: CareerEntry[] = [
  {
    id: 1,
    title: "Especialización en IA & Ecosistemas Autónomos",
    role: "IA Engineer & Automation Specialist",
    period: "Presente",
    description:
      "Actualmente enfocado en la vanguardia de la IA Generativa y la eficiencia operativa. Desarrollo soluciones avanzadas de automatización utilizando n8n, servidores a medida basados en Go, Express y NestJs, integración de MCP Servers en aplicaciones web y el despliegue y desarrollo de agentes para CRMs. Mi formación actual se centra en Machine Learning, AI Generation y el diseño de arquitecturas que permiten a los modelos de lenguaje interactuar con herramientas externas de forma autónoma para resolver flujos de negocio complejos.",
  },
  {
    id: 2,
    title: "Desarrollo de Software a Escala Corporativa",
    role: "Full Stack Engineer",
    period: "2024 - Actualidad",
    description:
      "Arquitecto y desarrollador de soluciones punta a punta para marcas líderes globales como Puma, Puma Energy, Shell y Texaco, participando en la creación de sistemas críticos de fidelización y plataformas de formación de alto tráfico. Asimismo, contribuí al ecosistema digital de la Provincia de Santa Fe, integrando trámites gubernamentales en una plataforma unificada. Tecnologías y entornos: Next.js, GraphQL, NestJS, React, Servicio de cloud de AWS, entre otros, asegurando escalabilidad y performance en entornos de alta demanda.",
  },
  {
    id: 3,
    title: "Ingeniería en Sistemas e Inteligencia Artificial",
    role: "Formación Académica y Fundamentos",
    period: "2022 - 2024",
    description:
      "Profundización en las bases científicas de la computación. Durante este periodo, consolidé conocimientos en arquitecturas de sistemas, algoritmos avanzados en C++ y Java, y análisis de datos. Con el auge de la Inteligencia Artificial, orienté mi formación hacia el aprendizaje autónomo (Machine Learning), robótica aplicada y el procesamiento de grandes volúmenes de datos para modelos de regresión y clasificación. Primeros trabajos freelance para pymes orientadas a soluciones de software de gestión y stock a medida.",
  },
  {
    id: 4,
    title: "Arquitectura de Hardware y Programación de Sistemas",
    role: "Robótica y Computación Física",
    period: "2021 - Actualidad",
    description:
      "Luego de graduarme, decidí aplicar todo mi conocimiento visual para llevarlo al siguiente nivel: conectar lo técnico con lo artístico, a través de creación de sistemas ciber físicos, dando clases como Profesor Titular de Tecnología, Robótica y Programación en varias instituciones, y estudiando y enseñando las bases de la ingeniería de software y sitemas de bajo nivel. Desarrollé proyectos para pequeñas empresas orientadas al prototipado de electrónica automatizada para el hogar.",
  },
  {
    id: 5,
    title: "Grado en Diseño y Artes Visuales",
    role: "Profesorado de Tecnología y Artes Visuales",
    period: "2017 - 2021",
    description:
      "Decido inscribirme a la carrera de Artes Gráficas, Visuales y Tecnología, para perfeccionar y especializarme en agudizar mi percepción estética y desarrollar el apartado creativo, lo que me llevó a incursionar y perfeccionarme todavía más en el dominio del branding e impacto de marketing.",
  },

  {
    id: 6,
    title: "Primeros Pasos en Desarrollo de interfaces",
    role: "Desarrollo Autodidacta",
    period: "2013 - 2017",
    description:
      "Inicio de mi camino como diseñador web a través de interfaces gráficas como Figma, Wix, WordPress, explorando en desarrollo de branding a medida y marketing digital.",
  },
];

// ─── Statistics ───────────────────────────────────────────────────────────────

export const statistics: Statistic[] = [
  {
    id: 0,
    value: 5,
    label: "Años de experiencia de desarrollo de softare punta a punta",
    suffix: "+",
  },
  {
    id: 1,
    value: 10,
    label: "Años de experiencia en desarrollo de interfaces",
    suffix: "+",
  },
  {
    id: 2,
    value: 15,
    label: "Tecnologías de integración agéntica y desarrollo con AI",
    suffix: "+",
  },
  {
    id: 3,
    value: 20,
    label: "Dominio de tecnologías de desarrollo y diseño",
    suffix: "+",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 1,
    title: "Nex Hub - Plataforma Gamificada",
    slug: "nex-hub",
    image: "/nexhub.png",
    urlGithub: "https://github.com/ignaciochiappero/NexHub",
    urlDemo: "https://nex-hub-beta.vercel.app/",
    summary:
      "Plataforma gamificada para engagement interno con checkpoints, premios, blog social y mensajería en tiempo real.",
    description:
      "Plataforma gamificada diseñada para fomentar la participación y la motivación en entornos empresariales y educativos. Permite a los usuarios registrar logros, completar checkpoints y recibir premios personalizados. Incluye un panel de administración para gestionar usuarios, logros y recompensas. La aplicación también cuenta con un sistema de mensajería en tiempo real basado en WebSockets y un blog integrado para compartir publicaciones al estilo de Facebook. Implementa autenticación segura y subida de imágenes a Cloudinary. - Tecnologías utilizadas: Next.js + TypeScript + MySQL + Prisma + Cloudinary + Pusher + Framer Motion + TailwindCSS - Desplegada en Vercel.",
    year: 2024,
    category: "platform",
    featured: true,
    technologies: [
      "nextjs",
      "typescript",
      "mysql",
      "prisma",
      "cloudinary",
      "pusher",
      "framer-motion",
      "tailwindcss",
      "vercel",
    ],
    highlights: [
      "Gamificación con dashboard admin",
      "Mensajería realtime y blog social",
      "Arquitectura pensada para escalar features",
    ],
  },
  {
    id: 2,
    title: "NIA - Shop",
    slug: "nia-shop",
    image: "/nia3.png",
    urlGithub: "https://github.com/ignaciochiappero/niashop",
    urlDemo: "https://niashop-six.vercel.app/",
    summary:
      "E-commerce full stack con checkout real, autenticación y backoffice preparado para catálogo y medios.",
    description:
      "Tienda online completamente funcional que permite realizar pagos mediante tarjetas de crédito, débito y PayPal. La tienda está diseñada con Next.js para el frontend, Tailwind CSS para la estilización, Prisma y PostgreSQL para la base de datos, NextAuth para la autenticación de usuarios y Cloudinary para el manejo de imágenes. - Tecnologías utilizadas: Next.js + TailwindCSS + Prisma + PostgreSQL + NextAuth + Cloudinary - Desplegada en Vercel.",
    year: 2024,
    category: "commerce",
    featured: true,
    technologies: [
      "nextjs",
      "tailwindcss",
      "prisma",
      "postgresql",
      "nextauth",
      "cloudinary",
      "vercel",
    ],
    highlights: [
      "Checkout con múltiples medios de pago",
      "Auth lista para cuentas de usuario",
      "Catálogo y assets administrables",
    ],
  },
  {
    id: 3,
    title: "Portfolio Influencer - Jazmín Fintón",
    slug: "jazmin-finton-portfolio",
    image: "/image-7.png",
    urlGithub: "https://github.com/ignaciochiappero/jazmindfinton",
    urlDemo: "https://jazminfinton.vercel.app/",
    summary:
      "Portfolio visual orientado a marca personal, contenido y actualización continua junto a la cliente.",
    description:
      "Portfolio profesional con trabajos de una influencer local, utilizando diversas tecnologías de frontend hecho a medida y pedido de la cliente, usando instancias de consultas con la misma y con un soporte constante de actualizaciones a pedido de la misma. - Tecnologías utilizadas: Next.js + Tailwind CSS + Swiper.js + JavaScript + React - Desplegada en Vercel.",
    year: 2024,
    category: "brand",
    featured: false,
    technologies: [
      "nextjs",
      "tailwindcss",
      "swiper",
      "javascript",
      "react",
      "vercel",
    ],
    highlights: [
      "Diseño a medida para marca personal",
      "Contenido visual priorizado",
      "Soporte de iteración continua",
    ],
  },
  {
    id: 4,
    title: "nIA Chatbot - IA",
    slug: "nia-chatbot",
    image: "/image-4.png",
    urlGithub: "https://github.com/ignaciochiappero/chatai-nachodev",
    urlDemo: "https://chatai-nachodev.vercel.app",
    summary:
      "Chatbot con streaming y render Markdown, pensado para una conversación más natural y rápida en web.",
    description:
      "Aplicación web que integra un chatbot basado en el modelo de lenguaje Gemini Pro. Utiliza Next.js para el desarrollo del frontend, Tailwind CSS para la estilización y una API de streaming para manejar la interacción en tiempo real. La salida del chatbot se presenta en formato Markdown para una visualización dinámica y bien formateada. - Tecnologías utilizadas: Next.js + Tailwind CSS + Gemini Pro API + Markdown - Desplegada en Vercel.",
    year: 2024,
    category: "ai",
    featured: true,
    technologies: [
      "nextjs",
      "tailwindcss",
      "gemini",
      "markdown",
      "openrouter",
      "vercel",
    ],
    highlights: [
      "Streaming de respuestas en tiempo real",
      "Render rico con Markdown",
      "UX enfocada en conversación",
    ],
  },
  {
    id: 5,
    title: "Reconocedor de gestos - IA",
    slug: "gesture-recognition",
    image: "/image-6.png",
    urlGithub: "https://github.com/ignaciochiappero/niarocketgame",
    urlDemo: "https://niarocketgame.vercel.app",
    summary:
      "Experimento interactivo donde el control del juego ocurre mediante gestos capturados en cámara.",
    description:
      "Videojuego experimental que utiliza tecnologías avanzadas como Next.js y MediaPipe.js para el reconocimiento de gestos. El juego responde a los movimientos de las manos para controlar las acciones en pantalla. - Tecnologías utilizadas: Next.js + MediaPipe.js - Desplegada en Vercel.",
    year: 2024,
    category: "vision",
    featured: false,
    technologies: ["nextjs", "mediapipe", "typescript", "vercel"],
    highlights: [
      "Input alternativo con visión por computadora",
      "Lógica interactiva en tiempo real",
      "Experimentación con interfaces naturales",
    ],
  },
  {
    id: 6,
    title: "Reconocedor de objetos - IA",
    slug: "object-recognition",
    image: "/image-5.png",
    urlGithub: "https://github.com/ignaciochiappero/watchai-nachodev",
    urlDemo: "https://watchai-nachodev.vercel.app",
    summary:
      "Aplicación de computer vision para detectar objetos y personas usando cámara en desktop o mobile.",
    description:
      "Aplicación web experimental que utiliza la cámara del ordenador o móvil para reconocer y diferenciar objetos genéricos y personas. Construida con Next.js para la interfaz de usuario, TensorFlow.js para el entrenamiento e implementación de modelos de aprendizaje automático, y ShadcnUI para los componentes de interfaz. - Tecnologías utilizadas: Next.js + TailwindCSS + ShadcnUI + TensorFlow.js - Desplegada en Vercel.",
    year: 2024,
    category: "vision",
    featured: true,
    technologies: [
      "nextjs",
      "tailwindcss",
      "shadcn-ui",
      "tensorflow",
      "react",
      "vercel",
    ],
    highlights: [
      "Reconocimiento desde cámara en web",
      "UI de feedback inmediata",
      "Integración de modelos en cliente",
    ],
  },
];
