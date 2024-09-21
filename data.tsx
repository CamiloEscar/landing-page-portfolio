import {
  BellPlus,
  BookText,
  Briefcase,
  Brush,
  Code2,
  CodeSquare,
  Home,
  Inbox,
  Mail,
  PanelsTopLeft,
  Phone,
  UserRound,
  UsersRound,
  Wrench,
  GraduationCap,
  BarChart,
  Network,
  Cpu,
  Database,
} from "lucide-react";

export const dataAboutMe = [
  {
    id: 1,
    name: "Experiencia",
    icon: <Briefcase />,
    description: "+6 años de experiencia",
  },
  {
    id: 2,
    name: "Clientes",
    icon: <UsersRound />,
    description: "Múltiples clientes satisfechos",
  },
  {
    id: 3,
    name: "Proyectos",
    icon: <Wrench />,
    description: "+20 completados",
  },
  {
    id: 4,
    name: "Educación",
    icon: <GraduationCap />,
    description: "Lic. en Sistemas de Información (en curso)",
  },
];

export const educationTimeline = [
  {
    id: 1,
    title: "Lic. en Sistemas de Información",
    institution: "UADER FCyT",
    period: "2021 - Actualidad",
    description: "Estudios universitarios en curso",
  },
  {
    id: 2,
    title: "Maestro Mayor de Obras",
    institution: "EET N°13 H. B. Sauret",
    period: "2017 - 2019",
    description: "Estudio completado",
  },
  {
    id: 3,
    title: "Ing. Civil",
    institution: "UTN FRCU",
    period: "2014 - 2016",
    description: "Estudios universitarios interrumpido",
  },
  {
    id: 4,
    title: "Técnico electricista con orientación a electrónica industrial",
    institution: "EET N°2 'Francisco Ramirez'",
    period: "Graduado en 2013",
    description: "Educación secundaria técnica",
  },
];

export const workExperience = [
  {
    id: 1,
    position: "Técnico Instalador de Fibra Óptica",
    company: "Video Digital SRL",
    period: "2018 - Actualidad",
    description:
      "Instalación y servicio técnico de fibra óptica FTTH, a cargo de la red in situ. Conocimientos en OLT y Mikrotik. Experiencia en atención al cliente y manejo de software de gestión.",
  },
  {
    id: 2,
    position: "Reposición y Ventas",
    company: "Coca Cola Andina",
    period: "2017 - 2018",
    description:
      "Experiencia en reposición y ventas. Habilidad en gestión de inventario y atención al cliente. Logros en ventas y servicio.",
  },
  {
    id: 3,
    position: "Instalador de Aires Acondicionados y Montajes Eléctricos",
    company: "MABSER",
    period: "2016 - 2018",
    description:
      "Experiencia en instalación de aires acondicionados, redes y montajes eléctricos.",
  },
];

export const itemsNavbar = [
  {
    id: 1,
    title: "Home",
    icon: <Home size={20} />,
    link: "#home",
  },
  {
    id: 2,
    title: "User",
    icon: <UserRound size={20} />,
    link: "#about-me",
  },
  {
    id: 3,
    title: "Book",
    icon: <BookText size={20} />,
    link: "#services",
  },
  {
    id: 4,
    title: "Target",
    icon: <CodeSquare size={20} />,
    link: "#portfolio",
  },
  {
    id: 5,
    title: "Home",
    icon: <Mail size={20} />,
    link: "#contact",
  },
];

export const dataSlider = [
  {
    id: 1,
    url: "/slider-1.jpg",
  },
  {
    id: 2,
    url: "/slider-2.jpg",
  },
  {
    id: 3,
    url: "/slider-3.jpg",
  },
  {
    id: 4,
    url: "/slider-4.jpg",
  },
];

export const aboutMe = {
  age: 29,
  location: "Concepción del Uruguay, Entre Ríos, Argentina",
  description:
    "Técnico y estudiante de Sistemas con un enfoque proactivo, organizado y responsable. Mis habilidades para relacionarme me permiten colaborar de manera efectiva en equipos. Busco una oportunidad de prácticas laborales en un entorno desafiante, donde pueda seguir expandiendo mis conocimientos y aplicando mis habilidades en Tecnología de la Información.",
};

export interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  urlGithub: string;
  urlDemo: string;
  description: string;
  technologies: string[];
}

export const dataPortfolio: PortfolioItem[] = [
  {
    id: 1,
    title: "Pizzeria Web",
    image: "/pizzeriadonatello.png",
    urlGithub: "https://github.com/CamiloEscar/pizzeria-landing.git",
    urlDemo: "https://pizzeria-donatello.vercel.app/",
    description:
      "Una aplicación web moderna para una pizzería, permitiendo a los usuarios explorar el menú y realizar pedidos en línea.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    id: 2,
    title: "Reclamos App",
    image: "/VDappsheets.png",
    urlGithub: "#!",
    urlDemo:
      "https://www.appsheet.com/start/0ad56ea3-db22-4a5f-8a3a-5ceecf293481",
    description:
      "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["AppSheets"],
  },
  {
    id: 3,
    title: "Sala de chat",
    image: "/",
    urlGithub: "https://github.com/CamiloEscar/chat-tiempo-real-Node.git",
    urlDemo: "#!",
    description:
      "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    id: 4,
    title: "MERN CRUD",
    image: "/",
    urlGithub: "https://github.com/CamiloEscar/MERN-CRUD-AUTH.git",
    urlDemo: "#!",
    description:
      "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    id: 5,
    title: "CHAT PDF",
    image: "/",
    urlGithub: "https://github.com/CamiloEscar/imagen-compresor.git",
    urlDemo: "#!",
    description:
      "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["JavaScript", "HTML", "CSS"],
  },
  {
    id: 6,
    title: "Google Traductor",
    image: "/",
    urlGithub: "https://github.com/CamiloEscar/google-translate-clone.git",
    urlDemo: "#!",
    description:
      "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["TypeScript", "JavaScript", "CSS", "HTML"],
  },
  {
    id: 7,
    title: "Reserva Futbol 5",
    image: "/",
    urlGithub: "https://github.com/CamiloEscar/bookingapp-f5.git",
    urlDemo: "#!",
    description:
      "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    id: 8,
    title: "Arquitecto Page",
    image: "/",
    urlGithub: "https://github.com/CamiloEscar/Landing-page-arquitecto.git",
    urlDemo: "#!",
    description:
      "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    id: 9,
    title: "Ambo Web",
    image: "/",
    urlGithub: "https://github.com/CamiloEscar/Ambo-Nextjs.git",
    urlDemo: "https://ambo-app.vercel.app/",
    description:
      "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    id: 10,
    title: "FlyBondi",
    image: "/",
    urlGithub: "https://github.com/CamiloEscar/FlyBondi-PA23.git",
    urlDemo: "#!",
    description:
      "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["JavaScript", "CSS", "HTML"],
  },
  {
    id: 11,
    title: "Listado de CryptoCoin",
    image: "/",
    urlGithub: "https://github.com/CamiloEscar/SPA-VanillaCoin.git",
    urlDemo: "#!",
    description:
      "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["JavaScript", "CSS", "HTML"],
  },
  {
    id: 12,
    title: "Listado de CryptoCoin",
    image: "/",
    urlGithub: "https://github.com/CamiloEscar/SPA-VanillaCoin.git",
    urlDemo: "#!",
    description:
      "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["JavaScript", "CSS", "HTML"],
  },
  {
    id: 13,
    title: "Trello Clone",
    image: "/",
    urlGithub: "https://github.com/CamiloEscar/SPA-VanillaCoin.git",
    urlDemo: "#!",
    description:
      "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
  },
];

export interface ExperienceItem {
  name: string;
  subtitle: string;
  value: number;
  experience: string;
  technologies: string[];
}

export interface ExperienceCategory {
  id: number;
  title: string;
  experience: ExperienceItem[];
}

export const dataExperience: ExperienceCategory[] = [
  {
    id: 1,
    title: "Frontend Development 💄",
    experience: [
      {
        name: "HTML",
        subtitle: "Experimentado",
        value: 80,
        experience:
          "Más de 2 años de experiencia creando estructuras web semánticas y accesibles.",
        technologies: ["html5", "semantic-ui", "accessibility"],
      },
      {
        name: "CSS",
        subtitle: "Intermedio",
        value: 75,
        experience:
          "Amplio conocimiento en diseño responsivo y animaciones CSS.",
        technologies: [
          "css3",
          // "sass",
          // "less",
          "styled-components",
          "tailwindcss",
        ],
      },
      {
        name: "JavaScript",
        subtitle: "Experimentado",
        value: 60,
        experience:
          "Dominio de ES6+ y experiencia en desarrollo de aplicaciones SPA y PWA.",
        technologies: [
          "javascript",
          "typescript",
          "webpack",
          "babel",
        ],
      },
      {
        name: "React",
        subtitle: "Experimentado",
        value: 60,
        experience:
          "Desarrollo de aplicaciones complejas utilizando React y su ecosistema.",
        technologies: [
          "react",
          "redux",
          "next-js",
          // "gatsby"
        ],
      },
      {
        name: "Bootstrap",
        subtitle: "Basic",
        value: 50,
        experience:
          "Familiaridad con Bootstrap para la creación rápida de interfaces responsivas.",
        technologies: ["bootstrap", "jquery"],
      },
      {
        name: "Pascal",
        subtitle: "Basic",
        value: 50,
        experience:
          "Familiaridad con Bootstrap para la creación rápida de interfaces responsivas.",
        technologies: ["bootstrap", "jquery"],
      },

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
      {
        name: "Mobile",
        subtitle: "Proximamente",
        value: 10,
        experience:
          "Desarrollo de aplicaciones móviles nativas y híbridas con React Native",
        technologies: ["react-native", "flutter", "kotlin"],
      },
    ],
  },
  {
    id: 2,
    title: "Backend Development 💻",
    experience: [
      {
        name: "Node JS",
        subtitle: "Intermedio",
        value: 50,
        experience:
          "Desarrollo de APIs RESTful, GraphQL y aplicaciones en tiempo real con Node.js, Express y Socket.io.",
        technologies: [
          "nodejs",
          "express",
          "socket-io",
          "npm",
          "graphql",
          // "apollo-server",
        ],
      },
      {
        name: "Bases de Datos",
        subtitle: "Intermedio",
        value: 75,
        experience:
          "Diseño e implementación de bases de datos SQL y NoSQL, optimización de consultas y modelado de datos.",
        technologies: [
          "mongodb",
          // "mongoose",
          "postgresql",
          "mysql",
          // "sequelize",
          // "mariadb",
          // "redis",
          // "elasticsearch",
        ],
      },
      {
        name: "Python",
        subtitle: "Basic",
        value: 60,
        experience:
          "Uso de Python para desarrollo de web con Django y Flask, scripts de automatización y análisis de datos.",
        technologies: [
          "python",
          "django",
          "flask",
          "pandas",
          "numpy",
        ],
      },
      {
        name: "PHP",
        subtitle: "Basico",
        value: 20,
        experience:
          "Desarrollo de aplicaciones web dinámicas y CMS personalizados con PHP.",
        technologies: ["php", "laravel", "wordpress"],
      },
      {
        name: "Java",
        subtitle: "Basico",
        value: 20,
        experience:
          "Desarrollo de aplicaciones empresariales y microservicios con Spring Boot y JPA.",
        technologies: ["java",
          "socket", 
          "spring", 
          "hibernate",
          "maven", 
          "junit"],
      },
      {
        name: "DevOps",
        subtitle: "Basico",
        value: 20,
        experience:
          "Implementación de CI/CD, containerización de aplicaciones y despliegue en la nube.",
        technologies: [
          "docker",
          "kubernetes",
          "jenkins",
          "aws",
          "azure",
          "gitlab-ci",
        ],
      },
      {
        name: "Seguridad Web",
        subtitle: "Básico",
        value: 20,
        experience:
          "Implementación de prácticas de seguridad web, autenticación y autorización en aplicaciones.",
        technologies: [
          "oauth",
          "jwt",
        ],
      },
    ],
  },
];

export const dataServices = [
  {
    id: 1,
    title: "Desarrollo Web",
    icon: <PanelsTopLeft />,
    features: [
      {
        name: "Desarrollo de sitios web con HTML5, CSS3, JavaScript y React",
      },
      {
        name: "Programación en Python, Java, y TypeScript",
      },
      {
        name: "Diseño y desarrollo responsive",
      },
      {
        name: "Optimización SEO",
      },
      {
        name: "Desarrollo de aplicaciones web",
      },
      {
        name: "Gestión de contenido",
      },
      {
        name: "Comercio electrónico",
      },
      {
        name: "Mantenimiento y soporte continuo",
      },
    ],
  },
  {
    id: 2,
    title: "UI/UX Design",
    icon: <Brush />,
    features: [
      {
        name: "Diseño intuitivo para una experiencia de usuario fluida",
      },
      {
        name: "Prototipado interactivo para visualizar la interfaz",
      },
      {
        name: "Investigación de usuarios para comprender necesidades y expectativas",
      },
      {
        name: "Optimización de la usabilidad para mejorar la accesibilidad",
      },
      {
        name: "Pruebas de usabilidad para evaluar la experiencia",
      },
      {
        name: "Diseño responsive para adaptarse a diferentes dispositivos",
      },
    ],
  },
  {
    id: 3,
    title: "Bases de Datos y Análisis de Datos",
    icon: <Database />,
    features: [
      {
        name: "Diseño y gestión de bases de datos PostgreSQL y MySQL",
      },
      {
        name: "Análisis de datos con Power BI y Tableau",
      },
      {
        name: "Creación de informes y dashboards interactivos",
      },
      {
        name: "Optimización de consultas y rendimiento de bases de datos",
      },
    ],
  },
  {
    id: 4,
    title: "Soporte Técnico y Reparación",
    icon: <Cpu />,
    features: [
      {
        name: "Reparación y mantenimiento de PC",
      },
      {
        name: "Instalación y configuración de software",
      },
      {
        name: "Diagnóstico y solución de problemas de hardware",
      },
      {
        name: "Optimización del rendimiento de sistemas",
      },
    ],
  },
  {
    id: 5,
    title: "Instalación de Redes y Fibra Óptica",
    icon: <Network />,
    features: [
      {
        name: "Instalación y servicio técnico de fibra óptica FTTH",
      },
      {
        name: "Configuración de OLT y Mikrotik",
      },
      {
        name: "Montajes eléctricos",
      },
      {
        name: "Instalación de aires acondicionados",
      },
    ],
  },
  {
    id: 6,
    title: "Gestión de Proyectos y Atención al Cliente",
    icon: <BarChart />,
    features: [
      {
        name: "Gestión de inventario y abastecimiento",
      },
      {
        name: "Atención al cliente y servicio post-venta",
      },
      {
        name: "Colaboración efectiva en equipos de trabajo",
      },
      {
        name: "Organización y planificación de proyectos",
      },
    ],
  },
];

export const dataContact = [
  {
    id: 1,
    title: "Teléfono",
    subtitle: "+54 9 3442475466",
    link: "tel:5493442475466",
    icon: <Phone />,
  },
  {
    id: 2,
    title: "Github",
    subtitle: "github.com/CamiloEscar",
    link: "github.com/CamiloEscar",
    icon: <Code2 />,
  },
  {
    id: 3,
    title: "Email",
    subtitle: "camiloescar1995@gmail.com",
    link: "mailto:camiloescar1995@gmail.com",
    icon: <Inbox />,
  },
];

export const dataTestimonials = [
  {
    id: 1,
    name: "George Snow",
    description:
      "¡Increíble plataforma! Los testimonios aquí son genuinos y me han ayudado a tomar decisiones informadas. ¡Altamente recomendado!",
    imageUrl: "/profile-1.jpeg",
  },
  {
    id: 2,
    name: "Juan Pérez",
    description:
      "Me encanta la variedad de testimonios disponibles en esta página. Es inspirador ver cómo otras personas han superado desafíos similares a los míos. ¡Gracias por esta invaluable fuente de motivación!",
    imageUrl: "/profile-2.jpeg",
  },
  {
    id: 3,
    name: "María García",
    description:
      "Excelente recurso para obtener opiniones auténticas sobre diferentes productos y servicios. Me ha ayudado mucho en mis compras en línea. ¡Bravo por este sitio!",
    imageUrl: "/profile-3.jpeg",
  },
  {
    id: 4,
    name: "Laura Snow",
    description:
      "¡Qué descubrimiento tan fantástico! Los testimonios aquí son honestos y detallados. Me siento más seguro al tomar decisiones después de leer las experiencias compartidas por otros usuarios.",
    imageUrl: "/profile-3.jpeg",
  },
  {
    id: 5,
    name: "Carlos Sánchez",
    description:
      "Una joya en la web. Los testimonios son fáciles de encontrar y están bien organizados. ¡Definitivamente mi destino número uno cuando necesito referencias confiables!",
    imageUrl: "/profile-2.jpeg",
  },
  {
    id: 6,
    name: "Antonio Martínez",
    description:
      "¡Fantástico recurso para aquellos que buscan validación antes de tomar decisiones importantes! Los testimonios aquí son veraces y realmente útiles. ¡Gracias por simplificar mi proceso de toma de decisiones!",
    imageUrl: "/profile-3.jpeg",
  },
];
