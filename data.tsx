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

interface Introduccion {
  greetings: string[];
  roles: string[];
  description: {
    before: string;
    reactText: string;
    middle: string;
    nodeText: string;
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

export const dataIntroduction: Introduccion [] = [
  {greetings: ['Hola 👋, soy',
    'Hi 👋, I am',
     'Bonjour 👋, je suis',
     'Ciao 👋, sono',
    ],
  roles: ['Desarrollador Web', 'Estudiante de Sistemas'],
  description: {
    before: 'Más de 2 años de experiencia en desarrollo web, me he enfocado en tecnologías como',
    reactText: 'React',
    middle: 'y',
    nodeText: 'Node.js',
    after: '. Mi objetivo es crear experiencias web de calidad, manteniendo un aprendizaje continuo para innovar y mejorar cada día.',
  },
  link: {
    linkedin: 'in/camiloescar/',
    github: 'CamiloEscar',
    whatsapp: '3442-475466',
    blog: 'Blog',
    Portfolio: 'Portfolio',
    Miniportfolio: 'Portfolio Impreso',
    home: 'Portfolio',
    contacto:'camiloescar1995@gmail.com'
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
      description: 'Estás viendo la versión en Español. Cambia el idioma o descarga usando los botones debajo.',
      switchLanguage: 'Switch to English',
      close: 'Cerrar',
      download: 'Descargar CV',
    },
  },
  scroll: 'Desplazar',}
];

export const dataAboutMe = [
  {
    id: 1,
    name: 'Experiencia',
    icon: <Briefcase />,
    description: '+2 años de experiencia',
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
  age: 29,
  location: 'Concepción del Uruguay, Entre Ríos, Argentina',
  description:
    'Actualmente, estoy cursando la carrera de Sistemas de Información y tengo experiencia en la creación de proyectos de forma independiente, abarcando desde el diseño inicial hasta la implementación final. Me capacito constantemente en nuevas tecnologías y metodologías que me permiten escribir código más limpio y escalable. Mis habilidades interpersonales me facilitan la colaboración efectiva en equipos, promoviendo un ambiente de trabajo positivo y productivo. Busco una oportunidad en un entorno amigable y desafiante donde pueda seguir aprendiendo y aplicar mis habilidades para contribuir al crecimiento del equipo y de la empresa.',
};

export const dataPortfolio: PortfolioItem[] = [
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
        technologies: ['html5', 'semantic-ui', 'accessibility'],
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
            value: 60,
            experience:
              'Más de 2 años de experiencia creando estructuras web semánticas y accesibles.',
            technologies: ['html5', 'css3'],
          },
          // {
          //   name: 'CSS',
          //   subtitle: 'Intermedio',
          //   value: 60,
          //   experience:
          //     'Amplio conocimiento en diseño responsivo y animaciones CSS.',
          //   technologies: ['css3'],
          // },
          {
            name: 'JavaScript',
            subtitle: 'Intermedio',
            value: 60,
            experience:
              'Dominio de ES6+ y experiencia en desarrollo de aplicaciones SPA y PWA.',
            technologies: ['javascript'],
          },
          {
            name: 'TypeScript',
            subtitle: 'Basico',
            value: 40,
            experience:
              'Conocimiento básico de TypeScript y experiencia en desarrollo de aplicaciones.',
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
            value: 60,
            experience:
              'Desarrollo de aplicaciones complejas utilizando React y su ecosistema.',
            technologies: [
              'react',
              // "redux",
              'next-js',
            ],
          },
          {
            name: 'Svelte',
            subtitle: 'Basico',
            value: 20,
            experience: 'Diseño de web simulando a Google Translate.',
            technologies: ['svelte', 'Astro'],
          },
        ],
      },
      {
        category: 'Tecnologías',
        items: [
          // {
          //   name: 'Semantic UI',
          //   subtitle: 'Intermedio',
          //   technologies: ['semantic-ui'],
          // },
          // {
          //   name: 'Accessibility',
          //   subtitle: 'Intermedio',
          //   technologies: ['accessibility'],
          // },
          // {
          //   name: 'Styled-components',
          //   subtitle: 'Intermedio',
          //   technologies: ['styled-components'],
          // },
          {
            name: 'Tailwind CSS',
            subtitle: 'Intermedio',
            technologies: ['tailwindcss'],
          },
          {
            name: 'Webpack',
            subtitle: 'Basico',
            technologies: ['webpack'],
          },
          {
            name: 'Babel',
            subtitle: 'Basico',
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
            value: 30,
            experience:
              'Desarrollo de APIs RESTful, GraphQL y aplicaciones en tiempo real con Node.js, Express y Socket.io.',
            technologies: ['NodeJs'],
          },
          {
            name: 'Python',
            subtitle: 'Básico',
            value: 40,
            experience:
              'Uso de Python para desarrollo web con Django y Flask, scripts de automatización y análisis de datos.',
            technologies: ['python'],
          },
        ],
      },
      {
        category: 'Frameworks',
        items: [
          {
            name: 'Express',
            subtitle: 'Básico',
            technologies: ['express'],
          },
          {
            name: 'Django',
            subtitle: 'Básico',
            technologies: ['django'],
          },
          // {
          //   name: 'Flask',
          //   subtitle: 'Básico',
          //   technologies: ['flask'],
          // },
        ],
      },
      {
        category: 'Tecnologías',
        items: [
          // {
          //   name: 'Socket.io',
          //   subtitle: 'Básico',
          //   technologies: ['socket-io'],
          // },
          {
            name: 'GraphQL',
            subtitle: 'Básico',
            technologies: ['graphql'],
          },
          {
            name: 'Axios',
            subtitle: 'Basico',
            technologies: ['axios'],
          },
          {
            name: 'Docker',
            subtitle: 'Básico',
            technologies: ['docker'],
          },
          // {
          //   name: "OAuth",
          //   subtitle: "Básico",
          //   technologies: ["oauth"],
          // },
          {
            name: 'JWT',
            subtitle: 'Básico',
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
              'Creación de dashboards interactivos y visualizaciones de datos para la toma de decisiones.',
            technologies: ['powerbi'],
          },
          {
            name: 'Tableau',
            subtitle: 'Básico',
            value: 40,
            experience:
              'Desarrollo de visualizaciones complejas y análisis de datos en tiempo real.',
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
            value: 20,
            experience:
              'Diseño de esquemas de bases de datos, optimización de consultas y gestión de transacciones.',
            technologies: ['postgresql'],
          },
          {
            name: 'MongoDB',
            subtitle: 'Básico',
            value: 20,
            experience:
              'Diseño y modelado de datos en bases de datos NoSQL, optimización de rendimiento.',
            technologies: ['mongodb'],
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

