// import {
//     BookText,
//     Briefcase,
//     Brush,
//     CodeSquare,
//     Home,
//     Inbox,
//     Mail,
//     PanelsTopLeft,
//     UserRound,
//     Wrench,
//     GraduationCap,
//     BarChart,
//     Network,
//     Cpu,
//     Database,
//     Pen,
//     Globe,
//   } from 'lucide-react';
//   import {
//     // FaLinkedinIn,
//     FaWhatsapp,
//   } from 'react-icons/fa';
//   import { Github } from 'lucide-react';

//   interface Introduccion {
//     greetings: string[];
//     roles: string[];
//     description: {
//       before: string;
//       reactText: string;
//       middle: string;
//       nodeText: string;
//       after: string;
//     };
//     buttons: {
//       contact: string;
//       portfolio: string;
//       blog: string;
//     };
//     socialLinks: {
//       github: string;
//       linkedin: string;
//     };
//     cv: {
//       button: string;
//       dialog: {
//         title: string;
//         description: string;
//         switchLanguage: string;
//         close: string;
//         download: string;
//       };
//     };
//     scroll: string;
//   }
  
//   export interface ExperienceCategory {
//     id: number;
//     title: string;
//     experience: ExperienceGroup[];
//   }
  
//   export interface ExperienceGroup {
//     category: string;
//     items: ExperienceItem[];
//   }
  
//   export interface ExperienceItem {
//     name: string;
//     subtitle: string;
//     value?: number;
//     experience?: string;
//     technologies: string[];
//   }
  
//   export interface PortfolioItem {
//     id: number;
//     title: string;
//     image: string;
//     urlGithub: string;
//     urlDemo: string;
//     description: string;
//     technologies: string[];
//   }
  
//   export interface ExperienceItemMinimal {
//     name: string;
//     subtitle: string;
//     value: number;
//     experience: string;
//     technologies: string[];
//   }
  
//   export interface ExperienceCategoryMinimal {
//     id: number;
//     title: string;
//     experience: ExperienceItemMinimal[];
//   }
  

//   export const dataIntroduction: Introduccion [] = [
//     {
//       greetings: ['Hello 👋, I am', 'Hi 👋, I am', 'Olá 👋, I am'],
//       roles: ['Web Developer', 'Systems Student'],
//       description: {
//         before: 'With over 2 years of experience in web development, I have focused on technologies such as',
//         reactText: 'React',
//         middle: 'and',
//         nodeText: 'Node.js',
//         after: '. My goal is to create quality web experiences while maintaining continuous learning to innovate and improve every day.',
//       },
//       buttons: {
//         contact: 'Contact',
//         portfolio: 'Mini Portfolio',
//         blog: 'Personal Blog',
//       },
//       socialLinks: {
//         github: 'GitHub',
//         linkedin: 'LinkedIn',
//       },
//       cv: {
//         button: 'Curriculum',
//         dialog: {
//           title: 'Curriculum Vitae',
//           description: 'You are viewing the Spanish version. Change the language or download using the buttons below.',
//           switchLanguage: 'Switch to Spanish',
//           close: 'Close',
//           download: 'Download CV',
//         },
//       },
//       scroll: 'Scroll',
//     }
//   ];
  

// export const dataAboutMe = [
//     {
//       id: 1,
//       name: 'Experience',
//       icon: <Briefcase />,
//       description: '2+ years of experience',
//     },
//     {
//       id: 2,
//       name: 'Web Dev',
//       icon: <Globe />,
//       description: '20+ Technologies',
//     },
//     {
//       id: 3,
//       name: 'Projects',
//       icon: <Wrench />,
//       description: '10+ Completed Projects',
//     },
//     {
//       id: 4,
//       name: 'Education',
//       icon: <GraduationCap />,
//       description: 'BSc. in Information Systems (in progress)',
//     },
//   ];
  
//   export const dataLanguage = [
//     {
//       id: 1,
//       title: 'English',
//       institution: 'Staff English World',
//       value: 50,
//       period: '2010 - 2014',
//       level: 'Reading comprehension',
//     },
//   ];
  
//   export const educationTimeLine = [
//     {
//       id: 1,
//       title: 'Bachelor’s Degree in Information Systems',
//       institution: 'UADER FCyT',
//       period: '2021 - Present',
//       description: 'Currently pursuing university studies, focusing on developing technical and analytical skills in the field of technology and information.',
//     },
//     {
//       id: 2,
//       title: 'Master Builder',
//       institution: 'EET N°13 H. B. Sauret',
//       period: '2017 - 2019',
//       description: 'Degree obtained, where I gained knowledge in project management and planning, as well as technical construction skills.',
//     },
//     {
//       id: 3,
//       title: 'Civil Engineering',
//       institution: 'UTN FRCU',
//       period: '2014 - 2016',
//       description: 'University studies interrupted. During this time, I developed a solid foundation in engineering principles and structural design.',
//     },
//     {
//       id: 4,
//       title: 'Electrician Technician with a Focus on Industrial Electronics',
//       institution: 'EET N°2 "Francisco Ramírez"',
//       period: '2013',
//       description: 'Technical secondary education.',
//     },
//   ];

//   export const workExperience = [
//     {
//       id: 1,
//       position: 'Fiber Optic Installation Technician',
//       company: 'Video Digital SRL',
//       period: '2018 - Present',
//       description: `Responsible for the maintenance of fiber optic networks and technical support.
//         I implemented a complaint management system that reduced response times by 50%.
//         Focused on customer service and management software handling.`,
//     },
//     {
//       id: 2,
//       position: 'Restocking and Sales',
//       company: 'Coca Cola Andina',
//       period: '2017 - 2018',
//       description: `Developed skills in restocking and sales, contributing to team growth.
//         Established strong relationships with customers, effectively meeting their needs.
//         Received recognition from management for my contributions to the sales team.`,
//     },
//     {
//       id: 3,
//       position: 'Air Conditioning Installer and Electrical Assembly',
//       company: 'MABSER',
//       period: '2016 - 2018',
//       description: `Responsible for the installation of air conditioning systems and electrical assemblies.
//         Maintained a focus on quality and safety, completing projects on time and to specification.
//         Learned to work under pressure and solve technical problems efficiently, enhancing my practical skills and teamwork ability.`,
//     },
//   ];
  
//   export const itemsNavbar = [
//     {
//       id: 1,
//       title: 'Home',
//       icon: <Home size={20} />,
//       link: '#home',
//     },
//     {
//       id: 2,
//       title: 'Projects',
//       icon: <CodeSquare size={20} />,
//       link: '#portfolio',
//     },
//     {
//       id: 3,
//       title: 'Services',
//       icon: <BookText size={20} />,
//       link: '#services',
//     },
//     {
//       id: 4,
//       title: 'About Me',
//       icon: <UserRound size={20} />,
//       link: '#about-me',
//     },
//     {
//       id: 5,
//       title: 'Blog',
//       icon: <Pen size={20} />,
//       link: '#blog',
//     },
//     {
//       id: 6,
//       title: 'Contact',
//       icon: <Mail size={20} />,
//       link: '#contact',
//     },
//   ];
  
//   export const dataSlider = [
//     {
//       id: 1,
//       url: '/slider-1.webp',
//     },
//     // {
//     //   id: 2,
//     //   url: "/slider-2.webp",
//     // },
//     {
//       id: 3,
//       url: '/slider-3.webp',
//     },
//     {
//       id: 4,
//       url: '/slider-4.webp',
//     },
//   ];

//   export const descriptionMe = {
//     age: 29,
//     location: 'Concepción del Uruguay, Entre Ríos, Argentina',
//     description:
//       'I am currently studying Information Systems and have experience in independently creating projects, ranging from initial design to final implementation. I continuously train in new technologies and methodologies that allow me to write cleaner and more scalable code. My interpersonal skills facilitate effective collaboration in teams, promoting a positive and productive work environment. I am looking for an opportunity in a friendly and challenging environment where I can continue learning and apply my skills to contribute to the growth of the team and the company.',
//   };
  
//   export const dataPortfolio: PortfolioItem[] = [
//     {
//       id: 1,
//       title: 'Pizzeria Web',
//       image: '/pizzeriadonatello.webp',
//       urlGithub: 'https://github.com/CamiloEscar/pizzeria-landing.git',
//       urlDemo: 'https://pizzeria-donatello.vercel.app/',
//       description:
//         'A modern web application for a pizzeria that allows users to explore the menu, customize their orders, and make purchases online, enhancing customer experience and business efficiency.',
//       technologies: ['React', 'Next.js', 'TailwindCSS', 'Vercel', 'Sheets'],
//     },
//     {
//       id: 2,
//       title: 'Reclamos App',
//       image: '/VDappsheets.webp',
//       urlGithub: '',
//       urlDemo:
//         'https://www.appsheet.com/start/0ad56ea3-db22-4a5f-8a3a-5ceecf293481',
//       description:
//         'An intuitive application designed to optimize customer complaint management, facilitating tracking, resolution, and analysis of issues to improve customer satisfaction and operational efficiency.',
//       technologies: ['AppSheets'],
//     },
//     {
//       id: 3,
//       title: 'Chat Room',
//       image: '/chattiemporealnode.webp',
//       urlGithub: 'https://github.com/CamiloEscar/chat-tiempo-real-Node.git',
//       urlDemo: '',
//       description:
//         'A real-time chat platform that allows users to communicate instantly, share files, and create themed rooms, ideal for work teams or online communities.',
//       technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
//     },
//     {
//       id: 4,
//       title: 'MERN CRUD',
//       image: '/MERNCRUDAUTH.webp',
//       urlGithub: 'https://github.com/CamiloEscar/MERN-CRUD-AUTH.git',
//       urlDemo: '',
//       description:
//         'A complete web application that demonstrates CRUD operations (Create, Read, Update, Delete) with user authentication, using the MERN stack for a smooth development and user experience.',
//       technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
//     },
//     {
//       id: 5,
//       title: 'CHAT PDF',
//       image: '/chatpdf.webp',
//       urlGithub: 'https://github.com/CamiloEscar/chat-con-pdf.git',
//       urlDemo: '',
//       description:
//         'An innovative application that allows users to interact with PDF documents through an intelligent chat, facilitating information extraction and understanding of lengthy documents.',
//       technologies: ['Svelte', 'Astro', 'TypeScript', 'JavaScript'],
//     },
//     {
//       id: 6,
//       title: 'Google Translator Clone',
//       image: '/googletraductor.webp',
//       urlGithub: 'https://github.com/CamiloEscar/google-translate-clone.git',
//       urlDemo: '',
//       description:
//         'A functional replica of the popular Google Translator service, offering fast and accurate translations between multiple languages, with a clean and user-friendly interface.',
//       technologies: ['Vite', 'OpenAI', 'TypeScript'],
//     },
//     {
//       id: 7,
//       title: '5-a-side Football Booking',
//       image: '/bookingappf5.webp',
//       urlGithub: 'https://github.com/CamiloEscar/bookingapp-f5.git',
//       urlDemo: '',
//       description:
//         'A booking system for 5-a-side football pitches, allowing users to see real-time availability, make bookings, and manage their matches, optimizing the use of sports facilities.',
//       technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
//     },
//     {
//       id: 8,
//       title: 'Architect Page',
//       image: '/arquitectolanding.webp',
//       urlGithub: 'https://github.com/CamiloEscar/Landing-page-arquitecto.git',
//       urlDemo: 'https://landing-page-arquitecto.vercel.app/',
//       description:
//         'An elegant landing page for an architecture studio, showcasing featured projects, offered services, and the studio’s philosophy, with a modern and responsive design reflecting the architect’s aesthetic.',
//       technologies: ['Vercel', 'TailwindCSS', 'Astro', 'Vite', 'Bun', 'Sheets'],
//     },
//     {
//       id: 9,
//       title: 'FlyBondi',
//       image: '/flybondi.webp',
//       urlGithub: 'https://github.com/CamiloEscar/FlyBondi-PA23.git',
//       urlDemo: 'https://flybondi-challenge.netlify.app/',
//       description:
//         'A flight booking platform inspired by FlyBondi, offering flight search, price comparison, and a simplified booking process, with an intuitive and responsive interface.',
//       technologies: ['JavaScript', 'CSS3', 'HTML5', 'React', 'Vite'],
//     },
//     {
//       id: 10,
//       title: 'CryptoCoin List',
//       image: '/spavanillacoin.webp',
//       urlGithub: 'https://github.com/CamiloEscar/SPA-VanillaCoin.git',
//       urlDemo: 'https://spavanillacoin.netlify.app/',
//       description:
//         'A single-page application (SPA) that displays an updated list of cryptocurrencies, their prices, and trends, implemented with pure JavaScript to demonstrate frontend development skills without frameworks.',
//       technologies: ['JavaScript', 'CSS3', 'HTML5'],
//     },
//     {
//       id: 11,
//       title: 'Image Compressor',
//       image: '/imagencompressor.webp',
//       urlGithub: 'https://github.com/CamiloEscar/imagen-compresor.git',
//       urlDemo: 'https://imagencompressor.netlify.app/',
//       description:
//         'An efficient web tool for compressing images, reducing file size without significantly compromising visual quality, ideal for optimizing images for websites and applications.',
//       technologies: ['JavaScript', 'CSS3', 'HTML5'],
//     },
//     {
//       id: 12,
//       title: 'Trello Clone',
//       image: '/trelloClon.webp',
//       urlGithub: '',
//       urlDemo: 'https://prueba-trello.vercel.app/',
//       description:
//         'A functional replica of Trello, offering project and task management with customizable boards, lists, and cards, allowing teams to organize and collaborate on their projects visually and effectively.',
//       technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
//     },
//     {
//       id: 13,
//       title: 'Fulbito-F5',
//       image: '/fulbitof5.webp',
//       urlGithub: '',
//       urlDemo: 'https://fulbito-f5.vercel.app/',
//       description:
//         'A platform dedicated to 5-a-side football, facilitating the organization of matches, team management, and statistics tracking, creating an online community for amateur football enthusiasts.',
//       technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
//     },
//     // {
//     //   id: 14,
//     //   title: "Ambo Web",
//     //   image: "/ambo.webp",
//     //   urlGithub: "https://github.com/CamiloEscar/Ambo-Nextjs.git",
//     //   urlDemo: "https://ambo-app.vercel.app/",
//     //   description:
//     //     "An online store specializing in scrubs and medical clothing, offering a personalized shopping experience with size, color, and style options, along with a recommendation system based on user preferences.",
//     //   technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"],
//     // },
//     {
//       id: 15,
//       title: 'Weather JSON',
//       image: '/clima.webp',
//       urlGithub: '',
//       urlDemo: 'https://pruebaclima-api.netlify.app/',
//       description:
//         'A weather application that provides accurate and up-to-date forecasts, using weather APIs to display current conditions, short-term forecasts, and weather alerts in a clear and user-friendly interface.',
//       technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
//     },
//   ];

//   export const dataExperienceMinimal: ExperienceCategoryMinimal[] = [
//     {
//       id: 1,
//       title: 'Frontend Development 💄',
//       experience: [
//         {
//           name: 'HTML',
//           subtitle: 'Intermediate',
//           value: 60,
//           experience:
//             'Over 2 years of experience creating semantic and accessible web structures.',
//           technologies: ['html5', 'semantic-ui', 'accessibility'],
//         },
//         {
//           name: 'CSS',
//           subtitle: 'Intermediate',
//           value: 60,
//           experience:
//             'Extensive knowledge in responsive design and CSS animations.',
//           technologies: [
//             'css3',
//             // "sass",
//             // "less",
//             'styled-components',
//             'tailwindcss',
//           ],
//         },
//         {
//           name: 'JavaScript',
//           subtitle: 'Intermediate',
//           value: 60,
//           experience:
//             'Proficient in ES6+ with experience in developing SPA and PWA applications.',
//           technologies: ['javascript', 'typescript', 'webpack', 'babel'],
//         },
//         {
//           name: 'React',
//           subtitle: 'Intermediate',
//           value: 60,
//           experience:
//             'Developing applications using React and its ecosystem.',
//           technologies: [
//             'react',
//             // "redux",
//             'next-js',
//             // "gatsby"
//           ],
//         },
//         {
//           name: 'Svelte',
//           subtitle: 'Basic',
//           value: 20,
//           experience: 'Web design simulating Google Translate.',
//           technologies: ['svelte', 'Astro'],
//         },
//         // {
//         //   name: "Vue.js",
//         //   subtitle: "Basic",
//         //   value: 10,
//         //   experience:
//         //     "Experience in developing single-page applications using Vue.js and Vuex for state management.",
//         //   technologies: ["vue", "vuex", "nuxt-js", "vue-router"],
//         // },
//         // {
//         //   name: "Angular",
//         //   subtitle: "Basic",
//         //   value: 10,
//         //   experience:
//         //     "Familiarity with the Angular framework for developing robust and scalable web applications.",
//         //   technologies: ["angular", "rxjs", "ngrx", "angular-material"],
//         // },
//         // {
//         //   name: "Mobile",
//         //   subtitle: "Coming Soon",
//         //   value: 10,
//         //   experience:
//         //     "Development of native and hybrid mobile applications with React Native.",
//         //   technologies: ["react-native", "flutter", "kotlin"],
//         // },
//       ],
//     },
//     {
//       id: 2,
//       title: 'Backend Development 💻',
//       experience: [
//         {
//           name: 'Node JS',
//           subtitle: 'Basic',
//           value: 30,
//           experience:
//             'Development of RESTful APIs, GraphQL, and real-time applications with Node.js, Express, and Socket.io.',
//           technologies: [
//             'nodejs',
//             'express',
//             'socket-io',
//             'npm',
//             'graphql',
//             // "apollo-server",
//           ],
//         },
//         {
//           name: 'Python',
//           subtitle: 'Basic',
//           value: 40,
//           experience:
//             'Using Python for web development with Django and Flask, automation scripts, and data analysis.',
//           technologies: ['python', 'django', 'flask', 'pandas', 'numpy'],
//         },
//         // {
//         //   name: "PHP",
//         //   subtitle: "Basic",
//         //   value: 20,
//         //   experience:
//         //     "Development of dynamic web applications and custom CMS with PHP.",
//         //   technologies: ["php", "laravel", "wordpress"],
//         // },
//         // {
//         //   name: "Java",
//         //   subtitle: "Basic",
//         //   value: 10,
//         //   experience:
//         //     "Development of enterprise applications and microservices with Spring Boot and JPA.",
//         //   technologies: [
//         //     "socket",
//         //     "spring",
//         //     "hibernate",
//         //     "maven",
//         //     "junit",
//         //   ],
//         // },
//         // {
//         //   name: 'DevOps',
//         //   subtitle: 'Basic',
//         //   value: 20,
//         //   experience:
//         //     'Implementation, containerization of applications, and cloud deployment.',
//         //   technologies: [
//         //     'docker',
//         //     // "kubernetes",
//         //     // "jenkins",
//         //     // "aws",
//         //     // "azure",
//         //     // "gitlab-ci",
//         //   ],
//         // },
//         // {
//         //   name: "Web Security",
//         //   subtitle: "Basic",
//         //   value: 20,
//         //   experience:
//         //     "Implementation of web security practices, authentication, and authorization in applications.",
//         //   technologies: ["oauth", "jwt"],
//         // },
//       ],
//     },
//     {
//       id: 3,
//       title: 'Data Analytics 📊',
//       experience: [
//         {
//           name: 'Power BI',
//           subtitle: 'Basic',
//           value: 40,
//           experience:
//             'Creating dashboards and data visualizations for decision-making.',
//           technologies: ['powerbi'],
//         },
//         {
//           name: 'Tableau',
//           subtitle: 'Basic',
//           value: 40,
//           experience: 'Development of visualizations and data analysis.',
//           technologies: ['tableau'],
//         },
//       ],
//     },
//     {
//       id: 4,
//       title: 'Databases 🗄️',
//       experience: [
//         {
//           name: 'PostgreSQL',
//           subtitle: 'Basic',
//           value: 20,
//           experience:
//             'Designing database schemas, optimizing queries, and managing transactions.',
//           technologies: ['postgresql'],
//         },
//         // {
//         //   name: "MySQL",
//         //   subtitle: "Intermediate",
//         //   value: 60,
//         //   experience:
//         //     "Implementation of relational databases, creating complex queries, and maintaining data.",
//         //   technologies: ["mysql"],
//         // },
//         {
//           name: 'MongoDB',
//           subtitle: 'Basic',
//           value: 20,
//           experience: 'Designing and modeling data in NoSQL databases.',
//           technologies: ['mongodb'],
//         },
//       ],
//     },
//   ];
  
//   export const dataExperience: ExperienceCategory[] = [
//     {
//       id: 1,
//       title: 'Frontend Development 💄',
//       experience: [
//         {
//           category: 'Languages',
//           items: [
//             {
//               name: 'HTML',
//               subtitle: 'Intermediate',
//               value: 60,
//               experience:
//                 'Over 2 years of experience creating semantic and accessible web structures.',
//               technologies: ['html5'],
//             },
//             {
//               name: 'CSS',
//               subtitle: 'Intermediate',
//               value: 60,
//               experience:
//                 'Extensive knowledge in responsive design and CSS animations.',
//               technologies: ['css3'],
//             },
//             {
//               name: 'JavaScript',
//               subtitle: 'Intermediate',
//               value: 60,
//               experience:
//                 'Proficient in ES6+ with experience in developing SPA and PWA applications.',
//               technologies: ['javascript', 'typescript'],
//             },
//             {
//               name: 'TypeScript',
//               subtitle: 'Basic',
//               value: 40,
//               experience:
//                 'Basic knowledge of TypeScript and experience in application development.',
//               technologies: ['javascript', 'typescript'],
//             },
//           ],
//         },
//         {
//           category: 'Frameworks',
//           items: [
//             {
//               name: 'React',
//               subtitle: 'Intermediate',
//               value: 60,
//               experience:
//                 'Development of complex applications using React and its ecosystem.',
//               technologies: [
//                 'react',
//                 // "redux",
//                 'next-js',
//               ],
//             },
//             {
//               name: 'Svelte',
//               subtitle: 'Basic',
//               value: 20,
//               experience: 'Web design simulating Google Translate.',
//               technologies: ['svelte', 'Astro'],
//             },
//           ],
//         },
//         {
//           category: 'Technologies',
//           items: [
//             // {
//             //   name: 'Semantic UI',
//             //   subtitle: 'Intermediate',
//             //   technologies: ['semantic-ui'],
//             // },
//             // {
//             //   name: 'Accessibility',
//             //   subtitle: 'Intermediate',
//             //   technologies: ['accessibility'],
//             // },
//             // {
//             //   name: 'Styled-components',
//             //   subtitle: 'Intermediate',
//             //   technologies: ['styled-components'],
//             // },
//             {
//               name: 'Tailwind CSS',
//               subtitle: 'Intermediate',
//               technologies: ['tailwindcss'],
//             },
//             {
//               name: 'Webpack',
//               subtitle: 'Basic',
//               technologies: ['webpack'],
//             },
//             {
//               name: 'Babel',
//               subtitle: 'Basic',
//               technologies: ['babel'],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 2,
//       title: 'Backend Development 💻',
//       experience: [
//         {
//           category: 'Languages',
//           items: [
//             {
//               name: 'Node JS',
//               subtitle: 'Basic',
//               value: 30,
//               experience:
//                 'Development of RESTful APIs, GraphQL, and real-time applications with Node.js, Express, and Socket.io.',
//               technologies: ['nodejs'],
//             },
//             {
//               name: 'Python',
//               subtitle: 'Basic',
//               value: 40,
//               experience:
//                 'Using Python for web development with Django and Flask, automation scripts, and data analysis.',
//               technologies: ['python'],
//             },
//           ],
//         },
//         {
//           category: 'Frameworks',
//           items: [
//             {
//               name: 'Express',
//               subtitle: 'Basic',
//               technologies: ['express'],
//             },
//             {
//               name: 'Django',
//               subtitle: 'Basic',
//               technologies: ['django'],
//             },
//             {
//               name: 'Flask',
//               subtitle: 'Basic',
//               technologies: ['flask'],
//             },
//           ],
//         },
//         {
//           category: 'Technologies',
//           items: [
//             {
//               name: 'Socket.io',
//               subtitle: 'Basic',
//               technologies: ['socket-io'],
//             },
//             {
//               name: 'GraphQL',
//               subtitle: 'Basic',
//               technologies: ['graphql'],
//             },
//             {
//               name: 'Axios',
//               subtitle: 'Basic',
//               technologies: ['axios'],
//             },
//             // {
//             //   name: 'Docker',
//             //   subtitle: 'Basic',
//             //   technologies: ['docker'],
//             // },
//             // {
//             //   name: "OAuth",
//             //   subtitle: "Basic",
//             //   technologies: ["oauth"],
//             // },
//             {
//               name: 'JWT',
//               subtitle: 'Basic',
//               technologies: ['jwt'],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 3,
//       title: 'Data Analytics 📊',
//       experience: [
//         {
//           category: 'Tools',
//           items: [
//             {
//               name: 'Power BI',
//               subtitle: 'Basic',
//               value: 40,
//               experience:
//                 'Creating interactive dashboards and data visualizations for decision-making.',
//               technologies: ['powerbi'],
//             },
//             {
//               name: 'Tableau',
//               subtitle: 'Basic',
//               value: 40,
//               experience:
//                 'Development of complex visualizations and real-time data analysis.',
//               technologies: ['tableau'],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 4,
//       title: 'Databases 🗄️',
//       experience: [
//         {
//           category: 'Databases',
//           items: [
//             {
//               name: 'PostgreSQL',
//               subtitle: 'Basic',
//               value: 20,
//               experience:
//                 'Designing database schemas, optimizing queries, and managing transactions.',
//               technologies: ['postgresql'],
//             },
//             {
//               name: 'MongoDB',
//               subtitle: 'Basic',
//               value: 20,
//               experience:
//                 'Designing and modeling data in NoSQL databases, optimizing performance.',
//               technologies: ['mongodb'],
//             },
//           ],
//         },
//       ],
//     },
//   ];
  
//   export const dataServices = [
//     {
//       id: 1,
//       title: 'Web Development',
//       icon: <PanelsTopLeft />,
//       features: [
//         {
//           name: 'Development of websites using HTML5, CSS3, JavaScript, and React',
//         },
//         {
//           name: 'Programming in Python, Java, and TypeScript',
//         },
//         {
//           name: 'Responsive design and development',
//         },
//         {
//           name: 'SEO optimization',
//         },
//         {
//           name: 'Development of web applications',
//         },
//         {
//           name: 'Content management',
//         },
//         {
//           name: 'E-commerce solutions',
//         },
//         {
//           name: 'Ongoing maintenance and support',
//         },
//       ],
//     },
//     {
//       id: 2,
//       title: 'UI/UX Design',
//       icon: <Brush />,
//       features: [
//         {
//           name: 'Intuitive design for a smooth user experience',
//         },
//         {
//           name: 'Interactive prototyping to visualize the interface',
//         },
//         {
//           name: 'User research to understand needs and expectations',
//         },
//         {
//           name: 'Usability optimization to improve accessibility',
//         },
//         {
//           name: 'Usability testing to evaluate the experience',
//         },
//         {
//           name: 'Responsive design to adapt to different devices',
//         },
//       ],
//     },
//     {
//       id: 3,
//       title: 'Database and Data Analysis',
//       icon: <Database />,
//       features: [
//         {
//           name: 'Design and management of PostgreSQL and MySQL databases',
//         },
//         {
//           name: 'Data analysis using Power BI and Tableau',
//         },
//         {
//           name: 'Creation of interactive reports and dashboards',
//         },
//         {
//           name: 'Optimization of queries and database performance',
//         },
//       ],
//     },
//     {
//       id: 4,
//       title: 'Technical Support and Repair',
//       icon: <Cpu />,
//       features: [
//         {
//           name: 'Repair and maintenance of PCs',
//         },
//         {
//           name: 'Installation and configuration of software',
//         },
//         {
//           name: 'Diagnosis and troubleshooting of hardware issues',
//         },
//         {
//           name: 'System performance optimization',
//         },
//       ],
//     },
//     {
//       id: 5,
//       title: 'Network and Fiber Optic Installation',
//       icon: <Network />,
//       features: [
//         {
//           name: 'Installation and technical service of FTTH fiber optics',
//         },
//         {
//           name: 'Configuration of OLT and Mikrotik',
//         },
//         {
//           name: 'Electrical installations',
//         },
//         {
//           name: 'Installation of air conditioning systems',
//         },
//       ],
//     },
//     {
//       id: 6,
//       title: 'Project Management and Customer Service',
//       icon: <BarChart />,
//       features: [
//         {
//           name: 'Inventory and supply management',
//         },
//         {
//           name: 'Customer service and after-sales support',
//         },
//         {
//           name: 'Effective collaboration in work teams',
//         },
//         {
//           name: 'Organization and planning of projects',
//         },
//       ],
//     },
//   ];

//   export const dataContact = [
//     // {
//     //   id: 1,
//     //   title: 'Teléfono',
//     //   subtitle: '+54 9 3442475466',
//     //   link: 'tel:5493442475466',
//     //   icon: <Phone />,
//     // },
//     {
//       id: 2,
//       title: 'Github',
//       subtitle: 'github.com/CamiloEscar',
//       link: 'github.com/CamiloEscar',
//       icon: <Github />,
//     },
//     {
//       id: 3,
//       title: 'Email',
//       subtitle: 'camiloescar1995@gmail.com',
//       link: 'mailto:camiloescar1995@gmail.com',
//       icon: <Inbox />,
//     },
//     {
//       id: 4,
//       title: 'Whatsapp',
//       subtitle: '+54 9 3442475466',
//       link: 'https://wa.me/5493442475466',
//       icon: <FaWhatsapp />,
//     },
//     // {
//     //   id: 5,
//     //   title: 'LinkedIn',
//     //   subtitle: 'linkedin.com/in/camiloescar',
//     //   link: 'https://www.linkedin.com/in/camiloescar',
//     //   icon: <FaLinkedinIn />,
//     // },
//   ];  