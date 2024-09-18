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
} from "lucide-react";

export const dataAboutMe = [
  {
    id: 1,
    name: "Experiencia",
    icon: <Briefcase />,
    description: "+2 años de experiencia",
  },
  {
    id: 2,
    name: "Clientes",
    icon: <UsersRound />,
    description: "2 clientes satisfechos",
  },
  {
    id: 3,
    name: "Proyectos",
    icon: <Wrench />,
    description: "+20 completados",
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
    description: "Una aplicación web moderna para una pizzería, permitiendo a los usuarios explorar el menú y realizar pedidos en línea.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"]
  },
  {
    id: 2,
    title: "Reclamos App",
    image: "/VDappsheets.png",
    urlGithub: "#!",
    urlDemo: "https://www.appsheet.com/start/0ad56ea3-db22-4a5f-8a3a-5ceecf293481",
    description: "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["AppSheets"]
  },
  {
    id: 3,
    title: "Sala de chat",
    image: "/image-2.jpg",
    urlGithub: "https://github.com/CamiloEscar/chat-tiempo-real-Node.git",
    urlDemo: "#!",
    description: "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    id: 4,
    title: "MERN CRUD",
    image: "/image-3.jpg",
    urlGithub: "https://github.com/CamiloEscar/MERN-CRUD-AUTH.git",
    urlDemo: "#!",
    description: "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    id: 5,
    title: "CHAT PDF",
    image: "/image-4.jpg",
    urlGithub: "https://github.com/CamiloEscar/imagen-compresor.git",
    urlDemo: "#!",
    description: "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["JavaScript", "HTML", "CSS"]
  },
  {
    id: 6,
    title: "Google Traductor",
    image: "/image-5.jpg",
    urlGithub: "https://github.com/CamiloEscar/google-translate-clone.git",
    urlDemo: "#!",
    description: "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["TypeScript", "JavaScript", "CSS", "HTML"]
  },
  {
    id: 7,
    title: "Reserva Futbol 5",
    image: "/image-6.jpg",
    urlGithub: "https://github.com/CamiloEscar/bookingapp-f5.git",
    urlDemo: "#!",
    description: "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    id: 8,
    title: "Arquitecto Page",
    image: "/image-6.jpg",
    urlGithub: "https://github.com/CamiloEscar/Landing-page-arquitecto.git",
    urlDemo: "#!",
    description: "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"]
  },
  {
    id: 9,
    title: "Ambo Web",
    image: "/image-6.jpg",
    urlGithub: "https://github.com/CamiloEscar/Ambo-Nextjs.git",
    urlDemo: "https://ambo-app.vercel.app/",
    description: "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"]
  },
  {
    id: 10,
    title: "FlyBondi",
    image: "/image-6.jpg",
    urlGithub: "https://github.com/CamiloEscar/FlyBondi-PA23.git",
    urlDemo: "#!",
    description: "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["JavaScript", "CSS", "HTML"]
  },
  {
    id: 11,
    title: "Listado de CryptoCoin",
    image: "/image-6.jpg",
    urlGithub: "https://github.com/CamiloEscar/SPA-VanillaCoin.git",
    urlDemo: "#!",
    description: "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["JavaScript", "CSS", "HTML"]
  },
  {
    id: 12,
    title: "Listado de CryptoCoin",
    image: "/image-6.jpg",
    urlGithub: "https://github.com/CamiloEscar/SPA-VanillaCoin.git",
    urlDemo: "#!",
    description: "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["JavaScript", "CSS", "HTML"]
  },
  {
    id: 13,
    title: "Trello Clone",
    image: "/image-6.jpg",
    urlGithub: "https://github.com/CamiloEscar/SPA-VanillaCoin.git",
    urlDemo: "#!",
    description: "Una aplicación para gestionar y dar seguimiento a reclamos de clientes, mejorando la eficiencia del servicio al cliente.",
    technologies: ["React", "Node.js", "Express", "MongoDB"]
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
        experience: "Más de 2 años de experiencia creando estructuras web semánticas y accesibles.",
        technologies: ["html5", "semantic-ui", "accessibility"]
      },
      {
        name: "CSS",
        subtitle: "Intermedio",
        value: 75,
        experience: "Amplio conocimiento en diseño responsivo y animaciones CSS.",
        technologies: ["css3", "sass", "less", "styled-components"]
      },
      {
        name: "JavaScript",
        subtitle: "Experimentado",
        value: 60,
        experience: "Dominio de ES6+ y experiencia en desarrollo de aplicaciones SPA.",
        technologies: ["javascript", "es6", "typescript", "webpack"]
      },
      {
        name: "Tailwind CSS",
        subtitle: "Experimentado",
        value: 30,
        experience: "Uso extensivo de Tailwind CSS en proyectos recientes para un desarrollo rápido y eficiente.",
        technologies: ["tailwindcss", "postcss"]
      },
      {
        name: "React",
        subtitle: "Experimentado",
        value: 60,
        experience: "Desarrollo de aplicaciones complejas utilizando React y su ecosistema.",
        technologies: ["react", "redux", "next-js", "gatsby"]
      },
      {
        name: "Bootstrap",
        subtitle: "Basic",
        value: 50,
        experience: "Familiaridad con Bootstrap para la creación rápida de interfaces responsivas.",
        technologies: ["bootstrap", "jquery"]
      },
    ],
  },
  {
    id: 2,
    title: "Backend Development 💻",
    experience: [
      {
        name: "Node JS",
        subtitle: "Experimentado",
        value: 80,
        experience: "Desarrollo de APIs RESTful y aplicaciones en tiempo real con Node.js y Express.",
        technologies: ["nodejs", "express", "socket-io", "npm"]
      },
      {
        name: "Mongo DB",
        subtitle: "Intermedio",
        value: 75,
        experience: "Diseño e implementación de bases de datos NoSQL para aplicaciones web escalables.",
        technologies: ["mongodb", "mongoose", "atlas"]
      },
      {
        name: "Python",
        subtitle: "Basic",
        value: 60,
        experience: "Uso de Python para scripts de automatización y análisis de datos.",
        technologies: ["python", "pandas", "numpy"]
      },
      {
        name: "MySQL",
        subtitle: "Experimentado",
        value: 60,
        experience: "Diseño de esquemas de bases de datos relacionales y optimización de consultas.",
        technologies: ["mysql", "mariadb", "sequelize"]
      },
      {
        name: "PHP",
        subtitle: "Experimentado",
        value: 60,
        experience: "Desarrollo de aplicaciones web dinámicas y CMS personalizados con PHP.",
        technologies: ["php", "laravel", "wordpress"]
      },
      {
        name: "Django",
        subtitle: "Basic",
        value: 60,
        experience: "Creación de aplicaciones web robustas utilizando el framework Django de Python.",
        technologies: ["django", "python", "postgresql"]
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
        name: "Desarrollo de sitios web personalizados",
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
    title: "Creación de contenido",
    icon: <BellPlus />,
    features: [
      {
        name: "Redacción de contenido original y de calidad",
      },
      {
        name: "Creación de vídeos atractivos y dinámicos",
      },
      {
        name: "Diseño gráfico para una imagen impactante",
      },
      {
        name: "Edición profesional de textos y materiales visuales",
      },
      {
        name: "Estrategias de marketing de contenidos efectivas",
      },
      {
        name: "Producción de podcasts informativos y entretenidos",
      },
      {
        name: "Generación de infografías claras y visualmente atractivas",
      },
      {
        name: "Fotografía profesional para capturar momentos excepcionales",
      },
    ],
  },
  {
    id: 3,
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
