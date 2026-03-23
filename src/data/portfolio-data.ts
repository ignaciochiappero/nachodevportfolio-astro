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

export type TechnologyCategory =
  | "frontend"
  | "backend"
  | "database"
  | "ai"
  | "cloud"
  | "tooling"
  | "automation";

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

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
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

export interface Technology {
  id: number;
  slug: string;
  name: string;
  category: TechnologyCategory;
  description: string;
  imageUrl: string;
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
  role: "Creative Frontend & AI Developer",
  location: "Santa Fe, Argentina",
  email: "hola@nachodev.com",
  phone: "+54 342 409-4061",
  tagline: "Quiet interfaces with a strong point of view.",
  availableForWork: true,
};

// ─── About Text ───────────────────────────────────────────────────────────────

export const aboutText: string[] = [
  "Soy Nacho, desarrollador frontend y de IA con foco en interfaces que dicen algo — con criterio, no con ruido. Combino diseño y código para construir productos digitales que tienen carácter.",
  "Trabajo con el stack moderno (Astro, Next.js, TypeScript, Tailwind) y estoy especializado en integración de IA generativa, automatización con n8n y despliegue de agentes autónomos. Llevo más de una década en diseño gráfico, lo que le da a cada proyecto una base visual sólida.",
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
  {
    id: 4,
    label: "Services",
    href: "/services",
    sectionId: "services",
  },
  {
    id: 5,
    label: "Stack",
    href: "/stack",
    sectionId: "stack",
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
      "Actualmente enfocado en la vanguardia de la IA Generativa y la eficiencia operativa. Desarrollo soluciones avanzadas de automatización utilizando n8n, integración de MCP Servers (Model Context Protocol) y el despliegue de agentes inteligentes a medida. Mi formación actual se centra en Machine Learning avanzado y el diseño de arquitecturas que permiten a los modelos de lenguaje interactuar con herramientas externas de forma autónoma para resolver flujos de negocio complejos.",
  },
  {
    id: 2,
    title: "Desarrollo de Software a Escala Corporativa",
    role: "Full Stack Engineer",
    period: "2024 - 2025",
    description:
      "Arquitecto y desarrollador de soluciones para marcas líderes globales como Puma, Puma Energy, Shell y Texaco, participando en la creación de sistemas críticos de fidelización y plataformas de formación de alto tráfico. Asimismo, contribuí al ecosistema digital de la Provincia de Santa Fe, integrando trámites gubernamentales en una plataforma unificada. Stack principal: Next.js, GraphQL, NestJS, y microservicios, asegurando escalabilidad y performance en entornos de alta demanda.",
  },
  {
    id: 3,
    title: "Ingeniería en Sistemas e Inteligencia Artificial",
    role: "Formación Académica y Fundamentos",
    period: "2022 - 2023",
    description:
      "Profundización en las bases científicas de la computación. Durante este periodo, consolidé conocimientos en arquitecturas de sistemas, algoritmos avanzados en C++ y Java, y análisis de datos. Con el auge de la Inteligencia Artificial, orienté mi formación hacia el aprendizaje autónomo (Machine Learning), robótica aplicada y el procesamiento de grandes volúmenes de datos para modelos de regresión y clasificación.",
  },
  {
    id: 4,
    title: "Arquitectura de Hardware y Programación de Sistemas",
    role: "Robótica y Computación Física",
    period: "2021",
    description:
      "Investigación y desarrollo en el área de hardware-software integration. Trabajé en el diseño de sistemas complejos utilizando microcontroladores (Arduino/ESP32) y sensores avanzados, aplicando lógica de programación de bajo nivel para resolver problemas de automatización física y robótica educativa de alto nivel técnico.",
  },
  {
    id: 5,
    title: "Primeros Pasos en Ingeniería de Software",
    role: "Desarrollo Autodidacta",
    period: "2013 - 2020",
    description:
      "Inicio del camino técnico mediante el estudio de algoritmos y estructuras de datos. Lo que comenzó como una curiosidad por la lógica de programación y el diseño de sistemas, se transformó rápidamente en una carrera profesional enfocada en construir herramientas digitales que resuelven problemas reales a través del código.",
  },
];

// ─── Statistics ───────────────────────────────────────────────────────────────

export const statistics: Statistic[] = [
  {
    id: 0,
    value: 3,
    label: "Años como programador",
    suffix: "+",
  },
  {
    id: 1,
    value: 10,
    label: "Años de experiencia en diseño gráfico",
    suffix: "+",
  },
  {
    id: 2,
    value: 15,
    label: "Proyectos",
    suffix: "+",
  },
  {
    id: 3,
    value: 20,
    label: "Dominio de tecnologías de desarrollo y diseño",
    suffix: "+",
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    id: 1,
    icon: "bot",
    title: "Implementación de IA & Agentes",
    description:
      "Diseño y despliegue de soluciones basadas en LLMs y modelos personalizados. Automatizo flujos de trabajo complejos mediante agentes inteligentes que optimizan la toma de decisiones y la productividad operativa.",
  },
  {
    id: 2,
    icon: "cpu",
    title: "Automatización de Procesos",
    description:
      "Transformo tareas manuales en flujos digitales eficientes. Desarrollo integraciones robustas que conectan tus herramientas críticas para eliminar cuellos de botella y reducir el error humano.",
  },
  {
    id: 3,
    icon: "layers",
    title: "Software a Medida & Internal Tools",
    description:
      "Arquitectura y desarrollo de plataformas internas personalizadas (ERP/CRM/Dashboards) diseñadas específicamente para resolver la lógica de negocio única de tu empresa, garantizando escalabilidad y control total.",
  },
  {
    id: 4,
    icon: "code",
    title: "Desarrollo Web de Alto Rendimiento",
    description:
      "Ecosistemas digitales modernos construidos con Next.js y React. Enfoque en performance extrema, SEO avanzado y arquitecturas limpias que soportan un crecimiento sostenido de usuarios.",
  },
  {
    id: 5,
    icon: "fingerprint",
    title: "Branding Estratégico & Producto",
    description:
      "Construcción de identidades de marca digitales con propósito. No solo diseño estética; creo sistemas visuales coherentes que comunican autoridad y alinean la percepción del usuario con los objetivos de negocio.",
  },
  {
    id: 6,
    icon: "cloud",
    title: "Arquitectura Cloud & Escalabilidad",
    description:
      "Diseño de infraestructura en la nube enfocada en la disponibilidad y seguridad. Especialista en orquestar servicios que permitan a las aplicaciones crecer sin fricciones técnicas.",
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
    technologies: ["nextjs", "tailwindcss", "swiper", "javascript", "react", "vercel"],
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

// ─── Technologies ─────────────────────────────────────────────────────────────

export const technologies: Technology[] = [
  {
    id: 100,
    slug: "n8n",
    name: "n8n",
    category: "automation",
    description:
      "Utilizo n8n para automatizar flujos de trabajo empresariales. He desarrollado sistemas de onboarding automático, sincronización de CRMs con bases de datos, y pipelines de procesamiento de leads que reducen tareas manuales en un 80%.",
    imageUrl: "/N8N.png",
  },
  {
    id: 101,
    slug: "mcp-servers",
    name: "MCP Servers",
    category: "automation",
    description:
      "Implemento servidores MCP para crear agentes de IA autónomos. He construido asistentes que consultan bases de datos en tiempo real, ejecutan código y gestionan archivos, permitiendo a los LLMs interactuar con sistemas empresariales de forma segura.",
    imageUrl: "/MCP.png",
  },
  {
    id: 108,
    slug: "openrouter",
    name: "OpenRouter",
    category: "ai",
    description:
      "Uso OpenRouter para integrar múltiples LLMs en mis aplicaciones. He desarrollado chatbots inteligentes con fallback automático entre modelos, optimizando costos y garantizando disponibilidad 24/7 en producción. Un ejemplo es mi portfolio!",
    imageUrl: "/OpenRouter.png",
  },
  {
    id: 102,
    slug: "python",
    name: "Python",
    category: "ai",
    description:
      "Desarrollo scripts de automatización, pipelines de datos y modelos de ML con Python. He creado sistemas de scraping inteligente, procesamiento de documentos con IA y APIs para análisis predictivo en tiempo real.",
    imageUrl: "/Python.png",
  },
  {
    id: 103,
    slug: "hugging-face",
    name: "Hugging Face",
    category: "ai",
    description:
      "Integro modelos de Hugging Face en aplicaciones de producción. He implementado sistemas de análisis de sentimiento, clasificación de texto y generación de embeddings para búsqueda semántica en bases de conocimiento empresariales.",
    imageUrl: "/HuggingFace.png",
  },
  {
    id: 104,
    slug: "docker",
    name: "Docker",
    category: "cloud",
    description:
      "Containerizo todas mis aplicaciones con Docker para garantizar deployments consistentes. He orquestado microservicios, configurado CI/CD pipelines y desplegado stacks completos con Docker Compose en múltiples entornos.",
    imageUrl: "/Docker.png",
  },
  {
    id: 105,
    slug: "aws",
    name: "AWS",
    category: "cloud",
    description:
      "Diseño arquitecturas cloud en AWS para aplicaciones escalables. He trabajado con Lambda, S3, RDS, EC2 y SQS para construir sistemas serverless, pipelines de datos y backends que manejan miles de requests por segundo.",
    imageUrl: "/AWS.png",
  },
  {
    id: 106,
    slug: "gcp",
    name: "Google Cloud",
    category: "cloud",
    description:
      "Implemento soluciones en GCP aprovechando sus servicios de IA. He utilizado Cloud Run, BigQuery y Vertex AI para crear pipelines de ML, análisis de datos a gran escala y aplicaciones con procesamiento de lenguaje natural.",
    imageUrl: "/GCP.png",
  },
  {
    id: 107,
    slug: "graphql",
    name: "GraphQL",
    category: "backend",
    description:
      "Diseño APIs con GraphQL para optimizar la transferencia de datos. He implementado schemas tipados, resolvers eficientes y suscripciones en tiempo real para dashboards y aplicaciones que requieren datos precisos sin over-fetching.",
    imageUrl: "/GraphQL.png",
  },
  {
    id: 109,
    slug: "vercel",
    name: "Vercel",
    category: "cloud",
    description:
      "Despliego todas mis aplicaciones en producción con Vercel. Aprovecho su integración nativa con Next.js, edge functions, preview deployments automáticos y analytics para entregar experiencias web ultra-rápidas a nivel global.",
    imageUrl: "/Vercel.png",
  },
  {
    id: 1,
    slug: "nextjs",
    name: "Next.js",
    category: "frontend",
    description:
      "Construyo todas mis aplicaciones web con Next.js. He desarrollado e-commerce, plataformas gamificadas, portfolios y dashboards aprovechando SSR, ISR y App Router para lograr rendimiento óptimo y SEO perfecto.",
    imageUrl: "/Next.png",
  },
  {
    id: 13,
    slug: "vite",
    name: "Vite",
    category: "tooling",
    description:
      "Uso Vite para proyectos que requieren velocidad extrema en desarrollo. He creado SPAs, landing pages y prototipos rápidos con HMR instantáneo que acelera mi flujo de trabajo significativamente.",
    imageUrl: "/Vite.png",
  },
  {
    id: 2,
    slug: "nestjs",
    name: "Nest.js",
    category: "backend",
    description:
      "Desarrollo APIs REST y microservicios robustos con Nest.js. He construido backends escalables con autenticación JWT, guards, interceptors y arquitectura modular para sistemas empresariales complejos.",
    imageUrl: "/Nest.png",
  },
  {
    id: 3,
    slug: "git",
    name: "Git",
    category: "tooling",
    description:
      "Gestiono todos mis proyectos con Git y GitHub. Implemento flujos de trabajo con branches, pull requests, code reviews y CI/CD para mantener código limpio y colaborar eficientemente en equipos.",
    imageUrl: "/Git.png",
  },
  {
    id: 4,
    slug: "react",
    name: "React",
    category: "frontend",
    description:
      "Creo interfaces de usuario interactivas con React. He desarrollado componentes reutilizables, custom hooks, context providers y aplicaciones SPA con estado complejo y rendimiento optimizado.",
    imageUrl: "/React.png",
  },
  {
    id: 9,
    slug: "postgresql",
    name: "PostgreSQL",
    category: "database",
    description:
      "Diseño bases de datos relacionales con PostgreSQL para aplicaciones de producción. He implementado schemas complejos, índices optimizados, triggers y queries avanzadas para sistemas con millones de registros.",
    imageUrl: "/Postgre.png",
  },
  {
    id: 5,
    slug: "mongodb",
    name: "Mongo DB",
    category: "database",
    description:
      "Utilizo MongoDB para aplicaciones que requieren flexibilidad en datos. He construido sistemas de logs, bases de conocimiento y aplicaciones con datos no estructurados aprovechando agregaciones y índices.",
    imageUrl: "/Mongo.png",
  },
  {
    id: 6,
    slug: "nodejs",
    name: "Node.js",
    category: "backend",
    description:
      "Desarrollo backends y APIs con Node.js para aplicaciones en tiempo real. He creado servidores WebSocket, sistemas de mensajería, microservicios y herramientas CLI que procesan datos eficientemente.",
    imageUrl: "/Node.png",
  },
  {
    id: 7,
    slug: "cpp",
    name: "C++",
    category: "tooling",
    description:
      "Aplico C++ en proyectos de robótica y sistemas embebidos. He programado microcontroladores, sensores y actuadores para robots autónomos, y sistemas de domótica integral para casas inteligentes.",
    imageUrl: "/C++.png",
  },
  {
    id: 8,
    slug: "prisma",
    name: "Prisma ORM",
    category: "database",
    description:
      "Gestiono bases de datos con Prisma en todos mis proyectos TypeScript. He implementado migraciones, relaciones complejas, transacciones y queries type-safe que eliminan errores en runtime.",
    imageUrl: "/Prisma.png",
  },
  {
    id: 10,
    slug: "java",
    name: "Java",
    category: "backend",
    description:
      "Desarrollo aplicaciones empresariales con Java y Spring Boot. He construido APIs REST, sistemas de autenticación y servicios backend robustos con patrones de diseño y arquitectura limpia.",
    imageUrl: "/Java.png",
  },
  {
    id: 110,
    slug: "typescript",
    name: "TypeScript",
    category: "frontend",
    description:
      "Trabajo con TypeScript para desarrollar interfaces y backends más seguros, expresivos y mantenibles. Me permite modelar bien dominios complejos y moverme rápido sin sacrificar estabilidad.",
    imageUrl: "/Typescript.png",
  },
  {
    id: 111,
    slug: "tailwindcss",
    name: "Tailwind CSS",
    category: "frontend",
    description:
      "Uso Tailwind CSS para construir interfaces rápidas, consistentes y altamente iterables. Me permite combinar diseño de sistema, responsive y prototipado avanzado sin perder control visual.",
    imageUrl: "/Tailwind.png",
  },
  {
    id: 112,
    slug: "mysql",
    name: "MySQL",
    category: "database",
    description:
      "Utilizo MySQL en productos donde necesito una base relacional confiable y performante. Lo apliqué en plataformas internas y productos con reglas de negocio bien definidas.",
    imageUrl: "/MySQL.png",
  },
  {
    id: 113,
    slug: "framer-motion",
    name: "Framer Motion",
    category: "frontend",
    description:
      "Aplico Framer Motion para diseñar motion systems con intención: jerarquía visual, microinteracciones claras y transiciones que comunican estado sin ruido.",
    imageUrl: "/Framer.png",
  },
  {
    id: 114,
    slug: "cloudinary",
    name: "Cloudinary",
    category: "cloud",
    description:
      "Integro Cloudinary para manejar assets dinámicos, optimización de imágenes y flujos de carga consistentes en productos con contenido visual.",
    imageUrl: "/Cloudinary.png",
  },
  {
    id: 115,
    slug: "pusher",
    name: "Pusher",
    category: "backend",
    description:
      "Utilizo Pusher para eventos realtime en productos colaborativos, chats y experiencias donde el feedback instantáneo cambia la percepción del sistema.",
    imageUrl: "/Pusher.png",
  },
  {
    id: 116,
    slug: "nextauth",
    name: "NextAuth",
    category: "backend",
    description:
      "Implemento flujos de autenticación seguros con NextAuth para productos construidos sobre Next.js, unificando providers, sesiones y permisos.",
    imageUrl: "/NextAuth.png",
  },
  {
    id: 117,
    slug: "javascript",
    name: "JavaScript",
    category: "frontend",
    description:
      "JavaScript sigue siendo una herramienta clave en mi stack para interfaces, integraciones y prototipos rápidos donde necesito iterar sin fricción.",
    imageUrl: "/Javascript.png",
  },
  {
    id: 118,
    slug: "mediapipe",
    name: "MediaPipe",
    category: "ai",
    description:
      "Uso MediaPipe para experiencias de visión por computadora en tiempo real, especialmente en reconocimiento de manos, pose y gestos dentro de entornos interactivos.",
    imageUrl: "/MediaPipe.png",
  },
  {
    id: 119,
    slug: "tensorflow",
    name: "TensorFlow.js",
    category: "ai",
    description:
      "Implemento TensorFlow.js para llevar modelos al navegador y construir experiencias de computer vision y ML directamente del lado del cliente.",
    imageUrl: "/TensorFlow.png",
  },
  {
    id: 120,
    slug: "shadcn-ui",
    name: "shadcn/ui",
    category: "frontend",
    description:
      "Uso shadcn/ui cuando necesito una base de componentes accesible y flexible, con buen control de detalle visual y composición sobre Tailwind.",
    imageUrl: "/Shadcn.png",
  },
  {
    id: 121,
    slug: "gemini",
    name: "Gemini API",
    category: "ai",
    description:
      "Integro modelos Gemini para experiencias conversacionales y features de IA generativa con foco en velocidad de respuesta y calidad del contexto.",
    imageUrl: "/Gemini.png",
  },
  {
    id: 122,
    slug: "markdown",
    name: "Markdown",
    category: "tooling",
    description:
      "Aprovecho Markdown para presentar respuestas y documentación de forma legible, flexible y fácil de transformar en experiencias de contenido ricas.",
    imageUrl: "/Markdown.png",
  },
  {
    id: 123,
    slug: "swiper",
    name: "Swiper",
    category: "frontend",
    description:
      "Uso Swiper para experiencias touch-first, carruseles editoriales y componentes navegables donde la interacción táctil tiene peso real.",
    imageUrl: "/Swiper.png",
  },
];
