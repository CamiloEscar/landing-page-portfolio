import {
  BookText,
  Briefcase,
  Brush,
  CodeSquare,
  Home,
  Inbox,
  Mail,
  PanelsTopLeft,
  UserRound,
  Wrench,
  GraduationCap,
  BarChart,
  Network,
  Cpu,
  Database,
  Pen,
  Globe,
  Calendar,
} from 'lucide-react';
import {
  FaWhatsapp,
} from 'react-icons/fa';
import { Github } from 'lucide-react';
import { TechnologyName } from './components/shared/GradientName';

interface Introduccion {
  greetings: string[];
  roles: string[];
  description: {
    before: string;
    reactText: TechnologyName;
    middle: string;
    nodeText: TechnologyName;
    y: string;
    nextText: TechnologyName;
    after: string;
  };
  link: {
    github: string;
    linkedin: string;
    whatsapp: string;
    blog: string,
    Portfolio: string;
    Miniportfolio: string,
    home: string,
    contacto:string
  }
  buttons: {
    home: string,
    contact: string;
    portfolioPage: string;
    portfolio: string;
    blog: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
  };
  cv: {
    button: string;
    dialog: {
      title: string;
      description: string;
      switchLanguage: string;
      close: string;
      download: string;
    };
  };
  scroll: string;
}

export interface ExperienceCategory {
  id: number;
  title: string;
  experience: ExperienceGroup[];
}

export interface ExperienceGroup {
  category: string;
  items: ExperienceItem[];
}

export interface ExperienceItem {
  name: string;
  subtitle: string;
  value?: number;
  experience?: string;
  technologies: string[];
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  gifImage?: string;
  technologies: string[];
  urlGithub?: string;
  urlDemo?: string;
}

export interface ExperienceItemMinimal {
  name: string;
  subtitle: string;
  value: number;
  experience: string;
  technologies: string[];
}

export interface ExperienceCategoryMinimal {
  id: number;
  title: string;
  experience: ExperienceItemMinimal[];
}

export interface TechModalData {
  key: string;           // debe coincidir con IconMapKey
  image: string;         // ruta de imagen personalizada ej: '/tech/react.webp'
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  yearsExp: string;      // ej: '3 años'
  summary: string;       // párrafo corto de qué hacés con esta tech
  highlights: string[];  // bullets de logros/usos
  relatedProjects: {
    title: string;
    url?: string;
    description: string;
  }[];
}

export const dataIntroduction: Introduccion[] = [
  {
    greetings: [
      'Hola 👋, soy',
      'Hi 👋, I am',
      'Ciao 👋, sono',
    ],
    roles: [
      'Analista en Sistemas de Información',
      'Full Stack Developer',
    ],
    description: {
    before:
      'Analista en Sistemas de Información y Desarrollador Full Stack con más de 3 años de experiencia construyendo aplicaciones web modernas. Trabajo principalmente con',
    nodeText: 'JavaScript',
    middle: ' y ',
    reactText: 'React',
    y: ' y creando APIs y servicios backend con ',
    nextText: 'Node.js',
    after:
      '. También tengo experiencia con TypeScript, NextJs, Laravel, bases de datos SQL y NoSQL, diseño y consumo de APIs REST, Docker y AWS. Mi enfoque está en desarrollar soluciones rápidas, escalables y mantenibles, alineadas a objetivos de negocio y con una experiencia de usuario cuidada.'
  },
    link: {
      linkedin: 'in/camiloescar/',
      github: 'CamiloEscar',
      whatsapp: '3442-475466',
      blog: 'Blog',
      Portfolio: 'Portfolio',
      Miniportfolio: 'Portfolio Impreso',
      home: 'Portfolio',
      contacto: 'camiloescar1995@gmail.com'
    },
    buttons: {
      home: 'Portfolio',
      contact: 'Contacto',
      portfolioPage: 'Proyectos',
      portfolio: 'Mini Portfolio',
      blog: 'Blog Personal',
    },
    socialLinks: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    cv: {
      button: 'Curriculum',
      dialog: {
        title: 'Curriculum Vitae',
        description:
          'Estás viendo la versión en Español. Puedes cambiar el idioma o descargar el CV utilizando los botones debajo.',
        switchLanguage: 'Switch to English',
        close: 'Cerrar',
        download: 'Descargar CV',
      },
    },
    scroll: 'Desplazar',
  }
];

export const dataAboutMe = [
  {
    id: 1,
    name: 'Experiencia',
    icon: <Briefcase />,
    description: '+3 años de experiencia',
  },
  {
    id: 2,
    name: 'Dev Web',
    icon: <Globe />,
    description: '20+ Tecnologías',
  },
  {
    id: 3,
    name: 'Proyectos',
    icon: <Wrench />,
    description: '+10 Proyectos Completados',
  },
  {
    id: 4,
    name: 'Educación',
    icon: <GraduationCap />,
    description: 'Lic. en Sistemas de Información (en curso)',
  },
];

export const dataLanguage = [
  {
    id: 1,
    title: 'Ingles',
    institution: 'Staff English World',
    value: 50,
    period: '2010 - 2014',
    level: 'Lecto compresion',
  },
];

export const educationTimeline = [
  {
    id: 1,
    title: 'Licenciatura en Sistemas de Información',
    institution: 'UADER FCyT',
    period: '2021 - Actualidad',
    description: 'Actualmente cursando estudios universitarios, enfocándome en el desarrollo de habilidades técnicas y analíticas en el ámbito de la tecnología y la información.',
  },
  {
    id: 2,
    title: 'Maestro Mayor de Obras',
    institution: 'EET N°13 H. B. Sauret',
    period: '2017 - 2019',
    description: 'Título obtenido, donde adquirí conocimientos en gestión y planificación de obras, así como habilidades técnicas en construcción.',
  },
  {
    id: 3,
    title: 'Ingeniería Civil',
    institution: 'UTN FRCU',
    period: '2014 - 2016',
    description: 'Estudios universitarios interrumpidos. Durante este tiempo, desarrollé una base sólida en principios de ingeniería y diseño estructural.',
  },
  {
    id: 4,
    title: 'Técnico Electricista con Orientación a Electrónica Industrial',
    institution: 'EET N°2 "Francisco Ramírez"',
    period: '2013',
    description: 'Educación secundaria técnica.',
  },
];

export const workExperience = [
  {
    id: 1,
    position: 'Técnico Instalador de Fibra Óptica',
    company: 'Video Digital SRL',
    period: '2018 - Actualidad',
    description: `Encargado del mantenimiento de redes de fibra óptica y soporte tecnico.
      Implementé un sistema de gestión de reclamos que redujo los tiempos de respuesta en un 50%.
      Enfoque en la atención al cliente y manejo de software de gestión.`,
  },
  {
    id: 2,
    position: 'Reposición y Ventas',
    company: 'Coca Cola Andina',
    period: '2017 - 2018',
    description: `Desarrollé habilidades en reposición y ventas, contribuyendo al crecimiento del equipo.
      Establecí relaciones sólidas con los clientes, satisfaciendo sus necesidades de manera efectiva.
      Recibí reconocimiento por parte de la gerencia por mis aportes al equipo de ventas.`,
  },
  {
    id: 3,
    position: 'Instalador de Aires Acondicionados y Montajes Eléctricos',
    company: 'MABSER',
    period: '2016 - 2018',
    description: `Responsable de la instalación de sistemas de aire acondicionado y montajes eléctricos.
      Mantuve un enfoque en la calidad y la seguridad, completando proyectos en tiempo y forma.
      Aprendí a trabajar bajo presión y a solucionar problemas técnicos de manera eficiente, fortaleciendo mis habilidades prácticas y capacidad de trabajo en equipo.`,
  },
];

export const itemsNavbar = [
  {
    id: 1,
    title: 'Home',
    icon: <Home size={20} />,
    link: '#home',
  },
  {
    id: 2,
    title: 'Sobre Mi',
    icon: <UserRound size={20} />,
    link: '#about-me',
  },
  {
    id: 3,
    title: 'Proyectos',
    icon: <CodeSquare size={20} />,
    link: '#portfolio',
  },
  {
    id: 4,
    title: 'Servicio',
    icon: <BookText size={20} />,
    link: '#experience-services',
  },
  {
    id: 5,
    title: 'TimeLine',
    icon: <Calendar size={20} />,
    link: '#timeline',
  },
  {
    id: 6,
    title: 'Blog',
    icon: <Pen size={20} />,
    link: '#blog',
  },
  {
    id: 7,
    title: 'Contacto',
    icon: <Mail size={20} />,
    link: '#contact',
  },
];

export const dataSlider = [
  {
    id: 1,
    url: '/slider-1.webp',
  },
  // {
  //   id: 2,
  //   url: "/slider-2.webp",
  // },
  {
    id: 3,
    url: '/slider-3.webp',
  },
  {
    id: 4,
    url: '/slider-4.webp',
  },
];

export const aboutMe = {
  age: 30,
  location: 'Concepción del Uruguay, Entre Ríos, Argentina',
  description:
    'Actualmente me encuentro finalizando la Licenciatura en Sistemas de Información. He participado en proyectos de punta a punta, desde el análisis y diseño hasta la implementación y despliegue, incluyendo plataformas e-commerce y sistemas de gestión. Estoy en constante aprendizaje de nuevas tecnologías y metodologías que me permiten escribir código más limpio, mantenible y orientado a negocio. Busco seguir creciendo profesionalmente en entornos desafiantes donde pueda aportar soluciones reales y escalables.'
};

export const dataPortfolio: PortfolioItem[] = [
  {
  id: 14,
  title: 'Ecommerce Fullstack',
  image: '/ecommerce.webp',
  gifImage: '/ecommerce.gif',
  urlGithub: 'https://github.com/CamiloEscar/ecommerce',
  urlDemo: '',
  description:
    'Actualmente me encuentro enfocado en el desarrollo de un ecommerce fullstack. El sistema permite gestionar productos, usuarios, pedidos y pagos, con un panel administrativo completo y diseño responsive.',
  technologies: ['Laravel', 'Angular', 'MySQL', 'Bootstrap', 'PHP'],
  },
  {
    id: 1,
    title: 'Pizzeria Web',
    image: '/pizzeriadonatello.webp',
    gifImage: '/pizzeriadonatelloG.webp',
    urlGithub: 'https://github.com/CamiloEscar/pizzeria-landing.git',
    urlDemo: 'https://pizzeria-donatello.vercel.app/',
    description:
      'Una aplicación web moderna para una pizzería que permite a los usuarios explorar el menú, personalizar sus pedidos y realizar compras en línea, mejorando la experiencia del cliente y la eficiencia del negocio.',
    technologies: ['React', 'next-js', 'TailwindCSS', 'Vercel', 'Sheets'],
  },
  {
    id: 2,
    title: 'Reclamos App',
    image: '/VDappsheets.webp',
    gifImage: '/VDappsheetsG.webp',
    urlGithub: '',
    urlDemo:
      'https://www.appsheet.com/start/0ad56ea3-db22-4a5f-8a3a-5ceecf293481',
    description:
      'Una aplicación intuitiva diseñada para optimizar la gestión de reclamos de clientes, facilitando el seguimiento, la resolución y el análisis de problemas para mejorar la satisfacción del cliente y la eficiencia operativa.',
    technologies: ['AppSheets'],
  },
  {
    id: 3,
    title: 'Arquitecto Page',
    image: '/arquitectolanding.webp',
    gifImage: '/arquitectolandingG.webp',
    urlGithub: 'https://github.com/CamiloEscar/Landing-page-arquitecto.git',
    urlDemo: 'https://landing-page-arquitecto.vercel.app/',
    description:
      'Una elegante landing page para un estudio de arquitectura, mostrando proyectos destacados, servicios ofrecidos y la filosofía del estudio, con un diseño moderno y responsive que refleja la estética del arquitecto.',
    technologies: ['Vercel', 'TailwindCSS', 'Astro', 'Vite', 'bun', 'Sheets'],
  },
  {
    id: 4,
    title: 'Divipagos',
    image: '/divipagos.png',
    gifImage: '/divipagosG.png',
    urlGithub: 'https://github.com/CamiloEscar/gastos-tracker-app',
    urlDemo: 'https://divi-pagos.vercel.app/',
    description: 'Divipagos te ayuda a organizar y repartir los gastos de tus salidas, viajes y juntadas con amigos. Simplifica la gestión de gastos y evita confusiones con nuestra plataforma fácil de usar.',
    technologies: ['Vite', 'React', 'TypeScript', 'CSS']
  },
  {
    id: 5,
    title: 'Colección de Juegos',
    image: '/juegos.png',
    gifImage: '/juegosG.webp',
    urlGithub: 'https://github.com/CamiloEscar/juegos-app',
    urlDemo: 'https://gameshub-eta.vercel.app/',
    description: 'Explora mi colección de juegos construidos con herramientas web modernas. El propósito de esta web es tener una biblioteca de juegos creados con HTML, CSS, y JavaScript.',
    technologies: ['Vite', 'React', 'TypeScript', 'CSS']
  },
  {
    id: 11,
    title: 'Imagen Compresor',
    image: '/imagencompressor.webp',
    urlGithub: 'https://github.com/CamiloEscar/imagen-compresor.git',
    urlDemo: 'https://imagencompressor.netlify.app/',
    description:
      'Herramienta web eficiente para comprimir imágenes, reduciendo el tamaño de archivo sin comprometer significativamente la calidad visual, ideal para optimizar imágenes para sitios web y aplicaciones.',
    technologies: ['JavaScript', 'CSS3', 'HTML5'],
  },
  {
    id: 4,
    title: 'Sala de chat',
    image: '/chattiemporealnode.webp',
    urlGithub: 'https://github.com/CamiloEscar/chat-tiempo-real-Node.git',
    urlDemo: '',
    description:
      'Una plataforma de chat en tiempo real que permite a los usuarios comunicarse instantáneamente, compartir archivos y crear salas temáticas, ideal para equipos de trabajo o comunidades en línea.',
    technologies: ['React', 'NodeJs', 'Express', 'MongoDB'],
  },
  {
    id: 5,
    title: 'MERN CRUD',
    image: '/MERNCRUDAUTH.webp',
    urlGithub: 'https://github.com/CamiloEscar/MERN-CRUD-AUTH.git',
    urlDemo: '',
    description:
      'Una aplicación web completa que demuestra operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con autenticación de usuarios, utilizando el stack MERN para una experiencia de desarrollo y usuario fluida.',
    technologies: ['React', 'NodeJs', 'Express', 'MongoDB'],
  },
  {
    id: 6,
    title: 'CHAT PDF',
    image: '/chatpdf.webp',
    urlGithub: 'https://github.com/CamiloEscar/chat-con-pdf.git',
    urlDemo: '',
    description:
      'Una innovadora aplicación que permite a los usuarios interactuar con documentos PDF a través de un chat inteligente, facilitando la extracción de información y la comprensión de documentos extensos.',
    technologies: ['Svelte', 'Astro', 'TypeScript', 'JavaScript'],
  },
  {
    id: 7,
    title: 'Google Traductor Clon',
    image: '/googletraductor.webp',
    urlGithub: 'https://github.com/CamiloEscar/google-translate-clone.git',
    urlDemo: '',
    description:
      'Una réplica funcional del popular servicio de Google Traductor, ofreciendo traducciones rápidas y precisas entre múltiples idiomas, con una interfaz limpia y fácil de usar.',
    technologies: ['Vite', 'OpenAI', 'TypeScript'],
  },
  {
    id: 8,
    title: 'Reserva Futbol 5',
    image: '/bookingappf5.webp',
    urlGithub: 'https://github.com/CamiloEscar/bookingapp-f5.git',
    urlDemo: '',
    description:
      'Sistema de reservas para canchas de fútbol 5, permitiendo a los usuarios ver disponibilidad en tiempo real, realizar reservas y gestionar sus partidos, optimizando el uso de las instalaciones deportivas.',
    technologies: ['React', 'NodeJs', 'Express', 'MongoDB'],
  },
  
  {
    id: 9,
    title: 'FlyBondi',
    image: '/flybondi.webp',
    gifImage: '/flybondi.gif',
    urlGithub: 'https://github.com/CamiloEscar/FlyBondi-PA23.git',
    urlDemo: 'https://flybondi-challenge.netlify.app/',
    description:
      'Plataforma de reserva de vuelos inspirada en FlyBondi, ofreciendo búsqueda de vuelos, comparación de precios y proceso de reserva simplificado, con una interfaz intuitiva y responsive.',
    technologies: ['JavaScript', 'CSS3', 'HTML5', 'React', 'Vite'],
  },
  {
    id: 10,
    title: 'Listado de CryptoCoin',
    image: '/spavanillacoin.webp',
    gifImage: '/spavanillacoin.gif',
    urlGithub: 'https://github.com/CamiloEscar/SPA-VanillaCoin.git',
    urlDemo: 'https://spavanillacoin.netlify.app/',
    description:
      'Aplicación de página única (SPA) que muestra un listado actualizado de criptomonedas, sus precios y tendencias, implementada con JavaScript puro para demostrar habilidades de desarrollo frontend sin frameworks.',
    technologies: ['JavaScript', 'CSS3', 'HTML5'],
  },
  // {
  //   id: 12,
  //   title: 'Trello Clone',
  //   image: '/trelloClon.webp',
  //   urlGithub: '',
  //   urlDemo: 'https://prueba-trello.vercel.app/',
  //   description:
  //     'Réplica funcional de Trello, ofreciendo gestión de proyectos y tareas con tableros personalizables, listas y tarjetas, permitiendo a los equipos organizar y colaborar en sus proyectos de manera visual y efectiva.',
  //   technologies: ['React', 'NodeJs', 'Express', 'MongoDB'],
  // },
  {
    id: 13,
    title: 'Fulbito-F5',
    image: '/fulbitof5.webp',
    gifImage: '/fulbitof5.gif',
    urlGithub: '',
    urlDemo: 'https://fulbito-f5.vercel.app/',
    description:
      'Plataforma dedicada al fútbol 5, facilitando la organización de partidos, gestión de equipos y seguimiento de estadísticas, creando una comunidad en línea para entusiastas del fútbol amateur.',
    technologies: ['React', 'NodeJs', 'Express', 'MongoDB'],
  },
  // {
  //   id: 14,
  //   title: "Ambo Web",
  //   image: "/ambo.webp",
  //   urlGithub: "https://github.com/CamiloEscar/Ambo-Nextjs.git",
  //   urlDemo: "https://ambo-app.vercel.app/",
  //   description:
  //     "Tienda en línea especializada en ambos y ropa médica, ofreciendo una experiencia de compra personalizada con opciones de tallas, colores y estilos, además de un sistema de recomendaciones basado en preferencias del usuario.",
  //   technologies: ["React", "next-js", "Tailwind CSS", "Vercel"],
  // },
  // {
  //   id: 15,
  //   title: 'Clima Json',
  //   image: '/clima.webp',
  //   gifImage: '/clima.gif',
  //   urlGithub: '',
  //   urlDemo: 'https://pruebaclima-api.netlify.app/',
  //   description:
  //     'Aplicación meteorológica que proporciona pronósticos precisos y actualizados, utilizando APIs de clima para mostrar condiciones actuales, previsiones a corto plazo y alertas meteorológicas en una interfaz clara y fácil de usar.',
  //   technologies: ['React', 'NodeJs', 'Express', 'MongoDB'],
  // },
];

export const dataExperienceMinimal: ExperienceCategoryMinimal[] = [
  {
    id: 1,
    title: 'Frontend Development 💄',
    experience: [
      {
        name: 'HTML',
        subtitle: 'Intermedio',
        value: 60,
        experience:
          'Más de 2 años de experiencia creando estructuras web semánticas y accesibles.',
        technologies: ['html5'],
      },
      {
        name: 'CSS',
        subtitle: 'Intermedio',
        value: 60,
        experience:
          'Amplio conocimiento en diseño responsivo y animaciones CSS.',
        technologies: [
          'css3',
          // "sass",
          // "less",
          'styled-components',
          'tailwindcss',
        ],
      },
      {
        name: 'JavaScript',
        subtitle: 'Intermedio',
        value: 60,
        experience:
          'Dominio de ES6+ y experiencia en desarrollo de aplicaciones SPA y PWA.',
        technologies: ['javascript', 'typescript', 'webpack', 'babel'],
      },
      {
        name: 'React',
        subtitle: 'Intermedio',
        value: 60,
        experience:
          'Desarrollo de aplicaciones utilizando React y su ecosistema.',
        technologies: [
          'react',
          // "redux",
          'next-js',
          // "gatsby"
        ],
      },
      // {
      //   name: 'Svelte',
      //   subtitle: 'Basico',
      //   value: 20,
      //   experience: 'Diseño de web simulando a Google Translate.',
      //   technologies: ['svelte', 'Astro'],
      // },
      // {
      //   name: "Vue.js",
      //   subtitle: "Basico",
      //   value: 10,
      //   experience:
      //     "Experiencia en el desarrollo de aplicaciones de una sola página utilizando Vue.js y Vuex para la gestión del estado.",
      //   technologies: ["vue", "vuex", "nuxt-js", "vue-router"],
      // },
      // {
      //   name: "Angular",
      //   subtitle: "Básico",
      //   value: 10,
      //   experience:
      //     "Familiaridad con el framework Angular para el desarrollo de aplicaciones web robustas y escalables.",
      //   technologies: ["angular", "rxjs", "ngrx", "angular-material"],
      // },
      // {
      //   name: "Mobile",
      //   subtitle: "Proximamente",
      //   value: 10,
      //   experience:
      //     "Desarrollo de aplicaciones móviles nativas y híbridas con React Native",
      //   technologies: ["react-native", "flutter", "kotlin"],
      // },
    ],
  },
  {
    id: 2,
    title: 'Backend Development 💻',
    experience: [
      {
        name: 'Node JS',
        subtitle: 'Basico',
        value: 30,
        experience:
          'Desarrollo de APIs RESTful, GraphQL y aplicaciones en tiempo real con Node.js, Express y Socket.io.',
        technologies: [
          'NodeJs',
          'express',
          'socket-io',
          'npm',
          'graphql',
          // "apollo-server",
        ],
      },
      {
        name: 'Python',
        subtitle: 'Basico',
        value: 40,
        experience:
          'Uso de Python para desarrollo de web con Django y Flask, scripts de automatización y análisis de datos.',
        technologies: ['python', 'django', 'flask', 'pandas', 'numpy'],
      },
      // {
      //   name: "PHP",
      //   subtitle: "Basico",
      //   value: 20,
      //   experience:
      //     "Desarrollo de aplicaciones web dinámicas y CMS personalizados con PHP.",
      //   technologies: ["php", "laravel", "wordpress"],
      // },
      // {
      //   name: "Java",
      //   subtitle: "Basico",
      //   value: 10,
      //   experience:
      //     "Desarrollo de aplicaciones empresariales y microservicios con Spring Boot y JPA.",
      //   technologies: [
      //     "socket",
          // "spring",
          // "hibernate",
          // "maven",
          // "junit",
      //   ],
      // },
      // {
      //   name: 'DevOps',
      //   subtitle: 'Basico',
      //   value: 20,
      //   experience:
      //     'Implementación, containerización de aplicaciones y despliegue en la nube.',
      //   technologies: [
      //     'docker',
      //     // "kubernetes",
      //     // "jenkins",
      //     // "aws",
      //     // "azure",
      //     // "gitlab-ci",
      //   ],
      // },
      // {
      //   name: "Seguridad Web",
      //   subtitle: "Básico",
      //   value: 20,
      //   experience:
      //     "Implementación de prácticas de seguridad web, autenticación y autorización en aplicaciones.",
      //   technologies: ["oauth", "jwt"],
      // },
    ],
  },
  {
    id: 3,
    title: 'Data Analytics 📊',
    experience: [
      {
        name: 'Power BI',
        subtitle: 'Basico',
        value: 40,
        experience:
          'Creación de dashboards y visualizaciones de datos para la toma de decisiones.',
        technologies: ['powerbi'],
      },
      {
        name: 'Tableau',
        subtitle: 'Basico',
        value: 40,
        experience: 'Desarrollo de visualizaciones y análisis de datos.',
        technologies: ['tableau'],
      },
    ],
  },
  {
    id: 4,
    title: 'Base de Datos 🗄️',
    experience: [
      {
        name: 'PostgreSQL',
        subtitle: 'Basico',
        value: 20,
        experience:
          'Diseño de esquemas de bases de datos, optimización de consultas y gestión de transacciones.',
        technologies: ['postgresql'],
      },

      // {
      //   name: "MySQL",
      //   subtitle: "Intermedio",
      //   value: 60,
      //   experience:
      //     "Implementación de bases de datos relacionales, creación de consultas complejas y mantenimiento de datos.",
      //   technologies: ["mysql"],
      // },
      {
        name: 'MongoDB',
        subtitle: 'Basico',
        value: 20,
        experience: 'Diseño y modelado de datos en bases de datos NoSQL.',
        technologies: ['mongodb'],
      },
    ],
  },
];

export const dataExperience: ExperienceCategory[] = [
  {
    id: 1,
    title: 'Frontend Development 💄',
    experience: [
      {
        category: 'Lenguajes',
        items: [
          {
            name: 'HTML & CSS',
            subtitle: 'Intermedio',
            value: 65,
            experience:
              'Más de 3 años construyendo interfaces semánticas, accesibles y responsivas. Uso Grid y Flexbox para layouts complejos, variables CSS para sistemas de diseño consistentes y animaciones personalizadas con keyframes.',
            technologies: ['html5', 'css3'],
          },
          {
            name: 'JavaScript',
            subtitle: 'Intermedio',
            value: 65,
            experience:
              'Dominio sólido de ES6+: destructuring, async/await, módulos, optional chaining y Fetch API. Base de todos mis proyectos, tanto SPAs en vanilla JS como aplicaciones con frameworks modernos.',
            technologies: ['javascript'],
          },
          {
            name: 'TypeScript',
            subtitle: 'Básico',
            value: 40,
            experience:
              'Uso TypeScript en proyectos React y Node para tipar props, interfaces de API y reducir errores en tiempo de desarrollo. Configuración de tsconfig, tipos genéricos y strict mode.',
            technologies: ['typescript'],
          },
        ],
      },
      {
        category: 'Frameworks',
        items: [
          {
            name: 'React',
            subtitle: 'Intermedio',
            value: 70,
            experience:
              'Mi framework principal con más de 3 años de uso. Hooks (useState, useEffect, useRef, useMemo, useCallback), Context API, composición de componentes, Framer Motion para animaciones y shadcn/ui para UI accesible.',
            technologies: ['react', 'next-js'],
          },
          {
            name: 'Angular',
            subtitle: 'Intermedio',
            value: 55,
            experience:
              'Desarrollo del frontend del ecommerce fullstack con Angular. Módulos, servicios con inyección de dependencias, routing con guards, RxJS para estado reactivo e integración con APIs Laravel.',
            technologies: ['angular'],
          },
        ],
      },
      {
        category: 'Tecnologías',
        items: [
          {
            name: 'Vite',
            subtitle: 'Intermedio',
            value: 60,
            experience:
              'Herramienta de build preferida para proyectos React y TypeScript. Configuración de path aliases, variables de entorno, plugins y builds optimizados para producción.',
            technologies: ['vite'],
          },
          {
            name: 'Tailwind CSS',
            subtitle: 'Intermedio',
            value: 65,
            experience:
              'Framework de estilos principal. Diseño responsive mobile-first, dark mode con next-themes, CVA para variantes de componentes e integración con shadcn/ui y Radix UI.',
            technologies: ['tailwindcss'],
          },
          {
            name: 'Webpack',
            subtitle: 'Básico',
            value: 30,
            experience:
              'Conocimiento para leer y modificar configuraciones existentes: loaders, plugins, path aliases y separación de entornos dev/prod.',
            technologies: ['webpack'],
          },
          {
            name: 'Babel',
            subtitle: 'Básico',
            value: 30,
            experience:
              'Transpilación de ES6+ con preset-env, soporte de JSX con preset-react e integración en pipelines de Webpack y Jest.',
            technologies: ['babel'],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Backend Development 💻',
    experience: [
      {
        category: 'Lenguajes',
        items: [
          {
            name: 'Node JS',
            subtitle: 'Básico',
            value: 45,
            experience:
              'Desarrollo de APIs REST con Express, autenticación con JWT, comunicación en tiempo real con Socket.io y manejo de archivos con Multer. Backend principal en proyectos MERN.',
            technologies: ['nodejs'],
          },
          {
            name: 'Python',
            subtitle: 'Básico',
            value: 40,
            experience:
              'Scripts de automatización interna, análisis de datos con Pandas y NumPy, APIs básicas con Flask y procesamiento de archivos CSV/JSON en contextos laborales y académicos.',
            technologies: ['python'],
          },
          {
            name: 'PHP',
            subtitle: 'Intermedio',
            value: 55,
            experience:
              'Backend del ecommerce fullstack con Laravel: Eloquent ORM, autenticación con Sanctum, API Resources, jobs asíncronos, Blade templates y manejo completo con Artisan CLI.',
            technologies: ['php'],
          },
        ],
      },
      {
        category: 'Frameworks',
        items: [
          {
            name: 'Express',
            subtitle: 'Básico',
            value: 45,
            experience:
              'Framework principal para APIs Node.js. Routing modular, middlewares de auth y error handling, integración con Mongoose, validación con express-validator y seguridad con helmet.',
            technologies: ['express'],
          },
          {
            name: 'Django',
            subtitle: 'Básico',
            value: 30,
            experience:
              'Exploración en proyectos académicos. ORM con relaciones y migraciones, Django REST Framework para APIs, panel de administración automático y autenticación integrada.',
            technologies: ['django'],
          },
          {
            name: 'Laravel',
            subtitle: 'Básico',
            value: 50,
            experience:
              'Framework PHP del ecommerce. Eloquent con relaciones hasMany/belongsTo, Sanctum para auth de SPA, API Resources, Jobs para emails y Tinker para exploración del modelo.',
            technologies: ['laravel'],
          },
        ],
      },
      {
        category: 'Tecnologías',
        items: [
          {
            name: 'Socket.io',
            subtitle: 'Básico',
            value: 40,
            experience:
              'Comunicación bidireccional en tiempo real: rooms y namespaces para chats, indicadores de escritura, lista de usuarios conectados y reconexión automática.',
            technologies: ['socket-io'],
          },
          {
            name: 'GraphQL',
            subtitle: 'Básico',
            value: 25,
            experience:
              'Conocimiento exploratorio: schemas, resolvers, queries y mutations con Apollo Server integrado en Express y consumo desde cliente con Apollo Client.',
            technologies: ['graphql'],
          },
          {
            name: 'Axios',
            subtitle: 'Básico',
            value: 50,
            experience:
              'Cliente HTTP en proyectos React y Node. Instancias con baseURL, interceptors para tokens JWT automáticos, manejo centralizado de errores y cancelación de requests.',
            technologies: ['axios'],
          },
          {
            name: 'Docker',
            subtitle: 'Básico',
            value: 35,
            experience:
              'Containerización para entornos reproducibles. Dockerfile para Node y PHP, Docker Compose para orquestar base de datos, backend y frontend con persistencia en volúmenes.',
            technologies: ['docker'],
          },
          {
            name: 'OAuth',
            subtitle: 'Básico',
            value: 30,
            experience:
              'Login social con Google y GitHub mediante flujo Authorization Code. Implementado con Passport.js en proyectos Node y Laravel Socialite en proyectos PHP.',
            technologies: ['oauth'],
          },
          {
            name: 'JWT',
            subtitle: 'Básico',
            value: 50,
            experience:
              'Autenticación stateless en todas mis APIs REST. Access tokens de corta duración, refresh tokens con rotación, middleware de auth en Express y almacenamiento en httpOnly cookies.',
            technologies: ['jwt'],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Data Analytics 📊',
    experience: [
      {
        category: 'Herramientas',
        items: [
          {
            name: 'Power BI',
            subtitle: 'Básico',
            value: 40,
            experience:
              'Creación de dashboards interactivos para métricas operativas. Conexión a Excel y CSV, DAX básico para métricas calculadas y reportes automáticos para gestión en Video Digital SRL.',
            technologies: ['powerbi'],
          },
          {
            name: 'Tableau',
            subtitle: 'Básico',
            value: 35,
            experience:
              'Visualizaciones analíticas en contexto académico. Conexión a fuentes de datos tabulares, calculated fields para métricas derivadas y dashboards con filtros interactivos.',
            technologies: ['tableau'],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Base de Datos 🗄️',
    experience: [
      {
        category: 'Bases de Datos',
        items: [
          {
            name: 'PostgreSQL',
            subtitle: 'Básico',
            value: 35,
            experience:
              'Diseño de esquemas relacionales normalizados, JOINs y CTEs para consultas complejas, índices para optimización e integración con Prisma ORM y Supabase en proyectos serverless.',
            technologies: ['postgresql'],
          },
          {
            name: 'MongoDB',
            subtitle: 'Básico',
            value: 45,
            experience:
              'Base de datos principal en proyectos MERN. Mongoose schemas con validaciones, populate para referencias, pipeline de aggregations para estadísticas y Atlas para producción en la nube.',
            technologies: ['mongodb'],
          },
          {
            name: 'MySQL',
            subtitle: 'Básico',
            value: 40,
            experience:
              'Diseño relacional con foreign keys, consultas SQL con JOINs y subqueries, migraciones con Laravel Artisan, transacciones para operaciones críticas y modelado visual con MySQL Workbench.',
            technologies: ['mysql'],
          },
        ],
      },
    ],
  },
];

export const dataServices = [
  {
    id: 1,
    title: 'Desarrollo Web',
    icon: <PanelsTopLeft />,
    features: [
      {
        name: 'Desarrollo de sitios web con HTML5, CSS3, JavaScript y React',
      },
      {
        name: 'Programación en Python, Java, y TypeScript',
      },
      {
        name: 'Diseño y desarrollo responsive',
      },
      {
        name: 'Optimización SEO',
      },
      {
        name: 'Desarrollo de aplicaciones web',
      },
      {
        name: 'Gestión de contenido',
      },
      {
        name: 'Comercio electrónico',
      },
      {
        name: 'Mantenimiento y soporte continuo',
      },
    ],
  },
  {
    id: 2,
    title: 'UI/UX Design',
    icon: <Brush />,
    features: [
      {
        name: 'Diseño intuitivo para una experiencia de usuario fluida',
      },
      {
        name: 'Prototipado interactivo para visualizar la interfaz',
      },
      {
        name: 'Investigación de usuarios para comprender necesidades y expectativas',
      },
      {
        name: 'Optimización de la usabilidad para mejorar la accesibilidad',
      },
      {
        name: 'Pruebas de usabilidad para evaluar la experiencia',
      },
      {
        name: 'Diseño responsive para adaptarse a diferentes dispositivos',
      },
    ],
  },
  {
    id: 3,
    title: 'Bases de Datos y Análisis de Datos',
    icon: <Database />,
    features: [
      {
        name: 'Diseño y gestión de bases de datos PostgreSQL y MySQL',
      },
      {
        name: 'Análisis de datos con Power BI y Tableau',
      },
      {
        name: 'Creación de informes y dashboards interactivos',
      },
      {
        name: 'Optimización de consultas y rendimiento de bases de datos',
      },
    ],
  },
  {
    id: 4,
    title: 'Soporte Técnico y Reparación',
    icon: <Cpu />,
    features: [
      {
        name: 'Reparación y mantenimiento de PC',
      },
      {
        name: 'Instalación y configuración de software',
      },
      {
        name: 'Diagnóstico y solución de problemas de hardware',
      },
      {
        name: 'Optimización del rendimiento de sistemas',
      },
    ],
  },
  {
    id: 5,
    title: 'Instalación de Redes y Fibra Óptica',
    icon: <Network />,
    features: [
      {
        name: 'Instalación y servicio técnico de fibra óptica FTTH',
      },
      {
        name: 'Configuración de OLT y Mikrotik',
      },
      {
        name: 'Montajes eléctricos',
      },
      {
        name: 'Instalación de aires acondicionados',
      },
    ],
  },
  {
    id: 6,
    title: 'Gestión de Proyectos y Atención al Cliente',
    icon: <BarChart />,
    features: [
      {
        name: 'Gestión de inventario y abastecimiento',
      },
      {
        name: 'Atención al cliente y servicio post-venta',
      },
      {
        name: 'Colaboración efectiva en equipos de trabajo',
      },
      {
        name: 'Organización y planificación de proyectos',
      },
    ],
  },
];

export const dataContact = [
  // {
  //   id: 1,
  //   title: 'Teléfono',
  //   subtitle: '+54 9 3442475466',
  //   link: 'tel:5493442475466',
  //   icon: <Phone />,
  // },
  {
    id: 2,
    title: 'Github',
    subtitle: 'github.com/CamiloEscar',
    link: 'github.com/CamiloEscar',
    icon: <Github />,
  },
  {
    id: 3,
    title: 'Email',
    subtitle: 'camiloescar1995@gmail.com',
    link: 'mailto:camiloescar1995@gmail.com',
    icon: <Inbox />,
  },
  {
    id: 4,
    title: 'Whatsapp',
    subtitle: '+54 9 3442475466',
    link: 'https://wa.me/5493442475466',
    icon: <FaWhatsapp />,
  },
  // {
  //   id: 5,
  //   title: 'LinkedIn',
  //   subtitle: 'linkedin.com/in/camiloescar',
  //   link: 'https://www.linkedin.com/in/camiloescar',
  //   icon: <FaLinkedinIn />,
  // },
];

// export const dataTestimonials = [
//   {
//     id: 1,
//     name: "",
//     description:
//       "¡!",
//     imageUrl: "/profile-1.jpeg",
//   },
// ];


// ─── Datos del modal por tecnología ──────────────────────────────────────
export const dataTechModal: TechModalData[] = [
    {
    key: 'html5',
    image: '/tech/html5.webp',
    level: 'Intermedio',
    yearsExp: '+3 años',
    summary:
      'La base de todo lo que construyo. Escribo HTML5 semántico poniendo foco en la estructura correcta, accesibilidad con ARIA y compatibilidad con motores de búsqueda.',
    highlights: [
      'Marcado semántico: article, section, nav, aside',
      'Formularios con validación nativa (required, pattern)',
      'Metaetiquetas, Open Graph y SEO básico',
      'Canvas API para herramientas visuales',
      'Integración con Blade (Laravel) y Jinja (Django)',
    ],
    relatedProjects: [
      { title: 'Imagen Compresor',  url: 'https://imagencompressor.netlify.app/',   description: 'Interfaz con File API y Canvas HTML5' },
      { title: 'FlyBondi Clone',    url: 'https://flybondi-challenge.netlify.app/', description: 'Maquetado semántico responsive' },
      { title: 'SPA VanillaCoin',   url: 'https://spavanillacoin.netlify.app/',     description: 'SPA sin frameworks, HTML5 puro' },
    ],
  },

  {
    key: 'css3',
    image: '/tech/css3.webp',
    level: 'Intermedio',
    yearsExp: '+3 años',
    summary:
      'Diseño visual de interfaces desde cero con CSS3 moderno. Uso Grid y Flexbox para layouts complejos, variables CSS para sistemas de diseño y animaciones fluidas.',
    highlights: [
      'CSS Grid y Flexbox para layouts avanzados',
      'Variables CSS (custom properties) para theming',
      'Keyframes y transiciones personalizadas',
      'Responsive design mobile-first',
      'Dark mode con prefers-color-scheme',
    ],
    relatedProjects: [
      { title: 'SPA VanillaCoin',  url: 'https://spavanillacoin.netlify.app/',     description: 'Layout completo sin librerías CSS' },
      { title: 'Imagen Compresor', url: 'https://imagencompressor.netlify.app/',   description: 'UI con animaciones CSS puras' },
      { title: 'FlyBondi Clone',   url: 'https://flybondi-challenge.netlify.app/', description: 'Diseño responsive con CSS moderno' },
    ],
  },

  {
    key: 'javascript',
    image: '/tech/javascript.webp',
    level: 'Intermedio',
    yearsExp: '+3 años',
    summary:
      'Mi lenguaje principal. Lo uso en frontend y backend a diario: lógica de negocio, integración con APIs, manipulación del DOM y programación asíncrona con async/await.',
    highlights: [
      'ES6+: destructuring, spread, optional chaining, nullish coalescing',
      'Async/await, Promises y manejo de errores',
      'Fetch API y consumo de REST APIs',
      'Manipulación avanzada del DOM y eventos',
      'SPAs completas sin frameworks (vanilla JS)',
    ],
    relatedProjects: [
      { title: 'SPA VanillaCoin',  url: 'https://spavanillacoin.netlify.app/',   description: 'SPA completa en JavaScript puro' },
      { title: 'Imagen Compresor', url: 'https://imagencompressor.netlify.app/', description: 'Compresión con File API y Canvas API' },
      { title: 'FlyBondi Clone',   url: 'https://flybondi-challenge.netlify.app/', description: 'Buscador de vuelos con JS y filtros dinámicos' },
    ],
  },

  {
    key: 'typescript',
    image: '/modaltypescript.jpg',
    level: 'Básico',
    yearsExp: '~1 año',
    summary:
      'Uso TypeScript para agregar tipado estático en proyectos React y Node, lo que reduce errores en tiempo de desarrollo y mejora el autocompletado del editor.',
    highlights: [
      'Tipado de props, estados y eventos en React',
      'Interfaces y tipos para respuestas de API',
      'Tipos genéricos básicos (Array<T>, Promise<T>)',
      'Strict mode y configuración de tsconfig',
      'Integración con ESLint y Prettier',
    ],
    relatedProjects: [
      { title: 'Divipagos',             url: 'https://divi-pagos.vercel.app/',   description: 'App de gastos React + TypeScript' },
      { title: 'Colección de Juegos',   url: 'https://gameshub-eta.vercel.app/', description: 'SPA de juegos con Vite + TS' },
      { title: 'Google Traductor Clon', description: 'Integración OpenAI completamente tipada en TS' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FRONTEND — Frameworks
  // ─────────────────────────────────────────────────────────────────────────────

  {
    key: 'react',
    image: '/modalreact.png',
    level: 'Intermedio',
    yearsExp: '+3 años',
    summary:
      'Mi framework principal de frontend. Construyo componentes reutilizables, gestiono estado con hooks y context, e integro librerías del ecosistema como Framer Motion y shadcn/ui.',
    highlights: [
      'Hooks: useState, useEffect, useRef, useMemo, useCallback, useContext',
      'Context API para estado global sin Redux',
      'Composición de componentes y custom hooks',
      'Animaciones con Framer Motion',
      'UI accesible con shadcn/ui y Radix UI',
    ],
    relatedProjects: [
      { title: 'Pizzeria Web',     url: 'https://pizzeria-donatello.vercel.app/',   description: 'Menú interactivo y carrito de compras' },
      { title: 'MERN CRUD',        description: 'Autenticación y CRUD completo con React' },
      { title: 'Sala de Chat',     description: 'UI en tiempo real con React y Socket.io' },
      { title: 'FlyBondi Clone',   url: 'https://flybondi-challenge.netlify.app/', description: 'Buscador y reserva de vuelos' },
      { title: 'Divipagos',        url: 'https://divi-pagos.vercel.app/',           description: 'App de gastos compartidos' },
    ],
  },

  {
    key: 'next-js',
    image: '/tech/nextjs.webp',
    level: 'Intermedio',
    yearsExp: '2 años',
    summary:
      'Uso Next.js cuando necesito SSR, SSG o API Routes. Este portfolio está construido en Next.js con App Router, Server Components y despliegue en Vercel.',
    highlights: [
      'App Router con layouts anidados y loading.tsx',
      'SSG e ISR para rendimiento en producción',
      'API Routes para backend liviano integrado',
      'Optimización automática de imágenes (next/image)',
      'Metadata API para SEO avanzado',
    ],
    relatedProjects: [
      { title: 'Portfolio Personal', description: 'Este sitio — Next.js 14 + App Router + Vercel' },
      { title: 'Pizzeria Web',       url: 'https://pizzeria-donatello.vercel.app/', description: 'Landing con SSG y pedidos online' },
    ],
  },

  {
    key: 'angular',
    image: '/ecommerce.gif',
    level: 'Intermedio',
    yearsExp: '~1 año',
    summary:
      'Utilicé Angular en el frontend del ecommerce fullstack. Su arquitectura opinionada con módulos, servicios e inyección de dependencias es ideal para aplicaciones empresariales grandes.',
    highlights: [
      'Componentes, módulos y lazy loading',
      'Servicios e inyección de dependencias',
      'Routing con guards y resolvers',
      'RxJS y Observables para estado reactivo',
      'Integración con APIs Laravel (HttpClient)',
    ],
    relatedProjects: [
      { title: 'Ecommerce Fullstack', description: 'Frontend Angular + backend Laravel + MySQL con panel admin' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FRONTEND — Tecnologías
  // ─────────────────────────────────────────────────────────────────────────────

  {
    key: 'vite',
    image: '/tech/vite.webp',
    level: 'Intermedio',
    yearsExp: '2 años',
    summary:
      'Mi herramienta de build preferida para proyectos React y TypeScript. Su HMR instantáneo y arranque ultrarrápido hacen que el desarrollo fluya sin fricción.',
    highlights: [
      'Configuración desde cero con React + TS template',
      'Path aliases para imports limpios (@/components)',
      'Variables de entorno con import.meta.env',
      'Build optimizado con code splitting automático',
      'Plugins: compression, svg, PWA',
    ],
    relatedProjects: [
      { title: 'Divipagos',             url: 'https://divi-pagos.vercel.app/',   description: 'React + TypeScript bootstrapeado con Vite' },
      { title: 'Colección de Juegos',   url: 'https://gameshub-eta.vercel.app/', description: 'SPA de juegos con Vite + TS' },
      { title: 'Google Traductor Clon', description: 'Vite + React + OpenAI API' },
    ],
  },

  {
    key: 'tailwindcss',
    image: '/tech/tailwind.webp',
    level: 'Intermedio',
    yearsExp: '2 años',
    summary:
      'Mi framework de estilos principal. Lo combino con shadcn/ui para componentes accesibles, CVA para variantes y clases condicionales para dark mode completo.',
    highlights: [
      'Diseño responsive mobile-first con breakpoints',
      'Dark mode con clase dark: y next-themes',
      'CVA (Class Variance Authority) para variantes',
      'Integración con shadcn/ui y Radix UI',
      'Animaciones con tailwind-animate y Framer Motion',
    ],
    relatedProjects: [
      { title: 'Portfolio Personal', description: 'Este sitio — Tailwind + shadcn/ui + dark mode' },
      { title: 'Pizzeria Web',       url: 'https://pizzeria-donatello.vercel.app/',        description: 'UI completa con Tailwind y componentes' },
      { title: 'Arquitecto Page',    url: 'https://landing-page-arquitecto.vercel.app/',   description: 'Landing elegante con Tailwind y Astro' },
    ],
  },

  {
    key: 'webpack',
    image: '/tech/webpack.webp',
    level: 'Básico',
    yearsExp: '~1 año',
    summary:
      'Conocimiento básico de Webpack para leer, entender y modificar configuraciones en proyectos existentes. Sé cómo funcionan los loaders, plugins y el flujo de bundling.',
    highlights: [
      'Loaders: babel-loader, css-loader, file-loader',
      'Plugins: HtmlWebpackPlugin, DefinePlugin',
      'Path aliases con resolve.alias',
      'Separación de config dev/prod',
    ],
    relatedProjects: [
      { title: 'Proyectos CRA legacy', description: 'Modificación de config Webpack ejected' },
    ],
  },

  {
    key: 'babel',
    image: '/tech/babel.webp',
    level: 'Básico',
    yearsExp: '~1 año',
    summary:
      'Uso Babel para transpilar JavaScript moderno a versiones compatibles con navegadores más antiguos, y para habilitar características experimentales en proyectos con Webpack.',
    highlights: [
      '@babel/preset-env con targets de browsers',
      '@babel/preset-react para JSX',
      'Plugins para class properties y decoradores',
      'Integración con Jest para testing',
    ],
    relatedProjects: [
      { title: 'Proyectos con Webpack', description: 'Pipeline de transpilación en stack legacy' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BACKEND — Lenguajes
  // ─────────────────────────────────────────────────────────────────────────────

  {
    key: 'nodejs',
    image: '/tech/nodejs.webp',
    level: 'Básico',
    yearsExp: '2 años',
    summary:
      'Desarrollo el backend de aplicaciones MERN con Node.js. Construyo APIs REST con Express, manejo autenticación con JWT y comunicación en tiempo real con Socket.io.',
    highlights: [
      'APIs RESTful con Express y middlewares',
      'Autenticación con JWT + bcrypt',
      'WebSockets en tiempo real con Socket.io',
      'Subida de archivos con Multer',
      'Variables de entorno con dotenv',
    ],
    relatedProjects: [
      { title: 'MERN CRUD',        description: 'API completa con auth JWT y operaciones CRUD' },
      { title: 'Sala de Chat',     description: 'Server Node + Express + Socket.io' },
      { title: 'Reserva Fútbol 5', description: 'Backend de reservas con Node y MongoDB' },
      { title: 'Fulbito F5',       url: 'https://fulbito-f5.vercel.app/', description: 'API para gestión de partidos y estadísticas' },
    ],
  },

  {
    key: 'python',
    image: '/tech/python.webp',
    level: 'Básico',
    yearsExp: '~1 año',
    summary:
      'Uso Python para automatizar tareas repetitivas, procesar datos con Pandas y construir APIs simples con Flask. También lo aplico en scripts internos en mi trabajo actual.',
    highlights: [
      'Scripts de automatización de procesos',
      'Análisis y limpieza de datos con Pandas',
      'APIs REST básicas con Flask',
      'Web scraping con BeautifulSoup y requests',
      'Procesamiento de CSV, JSON y Excel',
    ],
    relatedProjects: [
      { title: 'Scripts internos',     description: 'Automatización de reportes en Video Digital SRL' },
      { title: 'Chat PDF',             description: 'Procesamiento de documentos con Python y IA' },
      { title: 'Proyecto académico',   description: 'Análisis de datos con Pandas para UADER' },
    ],
  },

  {
    key: 'php',
    image: '/tech/php.webp',
    level: 'Intermedio',
    yearsExp: '~1 año',
    summary:
      'Uso PHP con Laravel para construir backends robustos. Construí el ecommerce completo con autenticación, panel admin, carrito y gestión de pedidos en PHP/Laravel.',
    highlights: [
      'Eloquent ORM para modelado de datos',
      'Autenticación con Laravel Sanctum',
      'API Resources y transformers',
      'Blade templates para vistas del servidor',
      'Migraciones, seeders y factories con Artisan',
    ],
    relatedProjects: [
      { title: 'Ecommerce Fullstack', description: 'Backend PHP/Laravel + panel admin + API para Angular' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BACKEND — Frameworks
  // ─────────────────────────────────────────────────────────────────────────────

  {
    key: 'express',
    image: '/tech/express.webp',
    level: 'Básico',
    yearsExp: '2 años',
    summary:
      'Framework minimalista de Node.js con el que construyo todas mis APIs backend en proyectos MERN. Lo combino con Mongoose, JWT y middlewares de seguridad.',
    highlights: [
      'Routing con Express Router modular',
      'Middlewares: auth, error handling, logger',
      'CORS configurable y seguridad con helmet',
      'Validación de inputs con express-validator',
      'Integración con Mongoose y Sequelize',
    ],
    relatedProjects: [
      { title: 'MERN CRUD',        description: 'API REST completa con auth JWT' },
      { title: 'Sala de Chat',     description: 'Server Express + Socket.io integrados' },
      { title: 'Reserva Fútbol 5', description: 'CRUD completo de reservas y usuarios' },
    ],
  },

  {
    key: 'django',
    image: '/tech/django.webp',
    level: 'Básico',
    yearsExp: '< 1 año',
    summary:
      'Framework Python que he explorado en proyectos académicos. Lo valoro por su ORM potente, panel admin automático y Django REST Framework para construir APIs rápidamente.',
    highlights: [
      'Modelos y ORM con relaciones y migraciones',
      'Django REST Framework para APIs',
      'Panel de administración automático',
      'Autenticación integrada con sesiones',
      'Class-based views para operaciones CRUD',
    ],
    relatedProjects: [
      { title: 'Proyecto académico', description: 'CRUD universitario con Django + PostgreSQL' },
    ],
  },

  {
    key: 'laravel',
    image: '/modallaravel.png',
    level: 'Básico',
    yearsExp: '~1 año',
    summary:
      'Framework PHP que uso para el ecommerce fullstack. Su ecosistema elegante (Eloquent, Sanctum, Artisan) me permite construir backends completos de forma rápida y organizada.',
    highlights: [
      'Eloquent ORM con relaciones hasMany, belongsTo',
      'Autenticación con Sanctum (SPA y API tokens)',
      'Jobs y queues para emails y notificaciones',
      'API Resources para respuestas JSON limpias',
      'Tinker para explorar el modelo desde consola',
    ],
    relatedProjects: [
      { title: 'Ecommerce Fullstack', description: 'Backend Laravel + MySQL + API para Angular' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BACKEND — Tecnologías
  // ─────────────────────────────────────────────────────────────────────────────

  {
    key: 'socket-io',
    image: '/tech/socketio.webp',
    level: 'Básico',
    yearsExp: '~1 año',
    summary:
      'Implementé comunicación bidireccional en tiempo real para la sala de chat: mensajes instantáneos, indicadores de escritura y presencia de usuarios conectados.',
    highlights: [
      'Rooms y namespaces para chats múltiples',
      'Eventos personalizados cliente ↔ servidor',
      'Indicador de "escribiendo..." en tiempo real',
      'Lista de usuarios conectados por sala',
      'Reconexión automática con back-off',
    ],
    relatedProjects: [
      { title: 'Sala de Chat', description: 'Chat en tiempo real con rooms y Socket.io' },
    ],
  },

  {
    key: 'graphql',
    image: '/tech/graphql.webp',
    level: 'Básico',
    yearsExp: '< 1 año',
    summary:
      'Conocimiento básico de GraphQL como alternativa a REST para evitar over-fetching. He construido schemas, resolvers y queries/mutations con Apollo Server en proyectos de aprendizaje.',
    highlights: [
      'Definición de tipos y schemas',
      'Queries y mutations con resolvers',
      'Apollo Server integrado con Express',
      'Consumo con Apollo Client desde React',
    ],
    relatedProjects: [
      { title: 'API exploratorio', description: 'Schema GraphQL con Apollo + MongoDB' },
    ],
  },

  {
    key: 'axios',
    image: '/tech/axios.webp',
    level: 'Básico',
    yearsExp: '2 años',
    summary:
      'Cliente HTTP que uso en proyectos React y Node para consumir APIs externas e internas. Lo configuro con interceptors para manejo centralizado de auth y errores.',
    highlights: [
      'Instancias con baseURL y headers globales',
      'Interceptors para tokens JWT automáticos',
      'Manejo centralizado de errores (401, 500)',
      'Cancelación de requests con AbortController',
      'Integración con React Query y SWR',
    ],
    relatedProjects: [
      { title: 'MERN CRUD',     description: 'Consumo de API interna con interceptors JWT' },
      { title: 'Ecommerce',     description: 'Requests desde Angular con HttpClient y Axios' },
    ],
  },

  {
    key: 'docker',
    image: '/tech/docker.webp',
    level: 'Básico',
    yearsExp: '~1 año',
    summary:
      'Containerización para entornos de desarrollo reproducibles. Uso Docker Compose para levantar base de datos, backend y frontend con un solo comando y sin conflictos de versiones.',
    highlights: [
      'Dockerfile multistage para Node.js y PHP',
      'Docker Compose con servicios interdependientes',
      'Volúmenes para persistencia de base de datos',
      'Variables de entorno con .env en Compose',
      'Redes internas para comunicación entre contenedores',
    ],
    relatedProjects: [
      { title: 'Ecommerce Fullstack', description: 'Stack Laravel + MySQL + Angular con Compose' },
    ],
  },

  {
    key: 'oauth',
    image: '/tech/oauth.webp',
    level: 'Básico',
    yearsExp: '< 1 año',
    summary:
      'Implementación de login social con OAuth 2.0 para que los usuarios puedan autenticarse con Google o GitHub sin crear una contraseña nueva.',
    highlights: [
      'Flujo Authorization Code con PKCE',
      'Login con Google y GitHub',
      'Passport.js en proyectos Node/Express',
      'Laravel Socialite en proyectos PHP',
      'Almacenamiento seguro de tokens',
    ],
    relatedProjects: [
      { title: 'MERN CRUD', description: 'Login social con Google via Passport.js' },
    ],
  },

  {
    key: 'jwt',
    image: '/tech/jwt.webp',
    level: 'Básico',
    yearsExp: '2 años',
    summary:
      'Autenticación stateless en todas mis APIs REST. Genero access tokens de corta duración y refresh tokens para sesiones persistentes, almacenándolos en httpOnly cookies para mayor seguridad.',
    highlights: [
      'Access token (15min) + refresh token (7d)',
      'Rotación de refresh tokens en cada uso',
      'Middleware de auth en Express',
      'httpOnly cookies para evitar XSS',
      'Blacklist de tokens en logout',
    ],
    relatedProjects: [
      { title: 'MERN CRUD',        description: 'Sistema auth completo con JWT + refresh tokens' },
      { title: 'Reserva Fútbol 5', description: 'Protección de rutas privadas con JWT middleware' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DATA ANALYTICS
  // ─────────────────────────────────────────────────────────────────────────────

  {
    key: 'powerbi',
    image: '/tech/powerbi.webp',
    level: 'Básico',
    yearsExp: '~1 año',
    summary:
      'Creación de dashboards interactivos para análisis de datos operativos. Lo usé para visualizar métricas de reclamos y tiempos de respuesta en Video Digital SRL.',
    highlights: [
      'Dashboards interactivos con filtros dinámicos',
      'Conexión a Excel, CSV y bases SQL',
      'DAX básico para métricas calculadas',
      'Visualizaciones: barras, KPI, mapas de calor',
      'Reportes automáticos para gestión',
    ],
    relatedProjects: [
      { title: 'Dashboard operativo', description: 'Métricas de reclamos en Video Digital SRL' },
      { title: 'Análisis académico',  description: 'Visualización de datos para materias de UADER' },
    ],
  },

  {
    key: 'tableau',
    image: '/tech/tableau.webp',
    level: 'Básico',
    yearsExp: '< 1 año',
    summary:
      'Exploración de datos y creación de visualizaciones analíticas con Tableau. Lo he usado en contextos académicos para análisis exploratorio y presentación de resultados.',
    highlights: [
      'Visualizaciones drag-and-drop',
      'Conexión a CSV y bases de datos',
      'Calculated fields para métricas derivadas',
      'Dashboards con filtros interactivos',
      'Publicación en Tableau Public',
    ],
    relatedProjects: [
      { title: 'Proyecto académico', description: 'Análisis de datos con Tableau para UADER' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BASE DE DATOS
  // ─────────────────────────────────────────────────────────────────────────────

  {
    key: 'postgresql',
    image: '/tech/postgresql.webp',
    level: 'Básico',
    yearsExp: '~1 año',
    summary:
      'Base de datos relacional robusta que uso cuando necesito integridad referencial y consultas complejas. Lo integro con Prisma ORM en proyectos Node y con Django ORM en Python.',
    highlights: [
      'Diseño de esquemas relacionales normalizados',
      'JOINs, subconsultas y CTEs',
      'Índices para optimización de consultas lentas',
      'Migraciones con Prisma y Django ORM',
      'Integración con Supabase para proyectos serverless',
    ],
    relatedProjects: [
      { title: 'Ecommerce Fullstack', description: 'BD relacional completa con Laravel/Eloquent' },
      { title: 'Proyecto académico',  description: 'Sistema CRUD con Django + PostgreSQL' },
    ],
  },

  {
    key: 'mongodb',
    image: '/tech/mongodb.webp',
    level: 'Básico',
    yearsExp: '2 años',
    summary:
      'Base de datos NoSQL que uso en todos mis proyectos MERN. Modelo documentos con Mongoose, defino schemas con validaciones y uso Atlas para el hosting en producción.',
    highlights: [
      'Modelado de documentos con Mongoose schemas',
      'Populate para referencias entre colecciones',
      'Pipeline de aggregations para estadísticas',
      'Índices compuestos para búsquedas optimizadas',
      'MongoDB Atlas para despliegue en la nube',
    ],
    relatedProjects: [
      { title: 'MERN CRUD',        description: 'Usuarios, posts y sesiones en MongoDB' },
      { title: 'Sala de Chat',     description: 'Mensajes y salas persistidas en MongoDB' },
      { title: 'Reserva Fútbol 5', description: 'Reservas, canchas y usuarios' },
      { title: 'Fulbito F5',       url: 'https://fulbito-f5.vercel.app/', description: 'Partidos, equipos y estadísticas' },
    ],
  },

  {
    key: 'mysql',
    image: '/tech/mysql.webp',
    level: 'Básico',
    yearsExp: '~1 año',
    summary:
      'Base de datos relacional que uso en proyectos PHP/Laravel. Diseño las tablas con Eloquent migrations, escribo queries SQL directas cuando hace falta y uso MySQL Workbench para modelado visual.',
    highlights: [
      'Tablas relacionadas con foreign keys',
      'Consultas SQL: JOINs, GROUP BY, subqueries',
      'Migraciones y seeders con Laravel Artisan',
      'MySQL Workbench para diseño de ERD',
      'Transacciones para operaciones críticas',
    ],
    relatedProjects: [
      { title: 'Ecommerce Fullstack', description: 'BD MySQL con productos, pedidos, usuarios y pagos' },
    ],
  },
];