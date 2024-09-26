export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    tags: string[];
    type: string;
    author: {
      name: string;
      avatar: string;
    };
    readingTime: string;
  }
  
  export const dataBlog: BlogPost[] = [
    {
      slug: "crear-api-restful-nodejs",
      title: "Cómo crear una API RESTful con Node.js",
      excerpt: "Aprende a crear una API RESTful utilizando Node.js y Express en este tutorial paso a paso.",
      content: `
        <h2>Cómo crear una API RESTful con Node.js</h2>
        <p>En este tutorial, aprenderás a crear una API RESTful usando Node.js y Express. Seguiremos un enfoque paso a paso para que puedas comprender cada parte del proceso.</p>
        
        <h3>Pasos para crear una API RESTful</h3>
        <ol>
          <li>Configurar el proyecto Node.js</li>
          <li>Instalar Express y dependencias necesarias</li>
          <li>Crear el servidor básico</li>
          <li>Definir las rutas de la API</li>
          <li>Implementar los controladores</li>
          <li>Configurar una base de datos (opcional)</li>
          <li>Probar la API</li>
        </ol>
        
        <h3>Código de ejemplo: Servidor básico con Express</h3>
        <pre><code class="language-javascript">
  const express = require('express');
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  app.use(express.json());
  
  app.get('/', (req, res) => {
    res.json({ message: '¡Bienvenido a nuestra API!' });
  });
  
  app.listen(PORT, () => console.log(\`Servidor corriendo en el puerto \${PORT}\`));
        </code></pre>
        
        <p>Este es solo el comienzo de tu API RESTful. En una aplicación real, necesitarías agregar más rutas, implementar la lógica de negocio, conectar con una base de datos, manejar errores, y mucho más. Pero este ejemplo te da una base sólida para empezar.</p>
        
        <h3>Próximos pasos</h3>
        <p>Una vez que tengas tu servidor básico funcionando, puedes comenzar a añadir más funcionalidades:</p>
        <ul>
          <li>Implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar)</li>
          <li>Agrega autenticación y autorización</li>
          <li>Implementa validación de datos de entrada</li>
          <li>Configura el manejo de errores</li>
          <li>Documenta tu API</li>
        </ul>
        
        <p>Recuerda, la práctica hace al maestro. ¡Sigue experimentando y construyendo más APIs para mejorar tus habilidades!</p>
        
        <p>Para más información, puedes consultar la <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">documentación oficial de Express</a>.</p>
      `,
      image: "/chatpdf.webp",
      date: "2023-05-15",
      tags: ["Node.js", "API", "Express", "Backend"],
      type: "tutorial", 
      author: {
        name: "Camilo Escar",
        avatar: "/profile.webp"
      },
      readingTime: "5 min"
    },
    {
      slug: "introduccion-a-react-hooks",
      title: "Introducción a React Hooks",
      excerpt: "Descubre cómo los React Hooks simplifican el desarrollo de componentes funcionales en React.",
      content: `
        <h2>Introducción a React Hooks</h2>
        <p>Los React Hooks son una característica introducida en React 16.8 que permite usar el estado y otras características de React sin escribir una clase. En este artículo, exploraremos los hooks más comunes y cómo pueden mejorar tu código.</p>
        
        <h3>Hooks básicos</h3>
        <ul>
          <li><strong>useState</strong>: Para manejar el estado local del componente</li>
          <li><strong>useEffect</strong>: Para realizar efectos secundarios en componentes funcionales</li>
          <li><strong>useContext</strong>: Para consumir un contexto de React</li>
        </ul>
        
        <h3>Ejemplo de useState</h3>
        <pre><code class="language-jsx">
  import React, { useState } from 'react';
  
  function Counter() {
    const [count, setCount] = useState(0);
    
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
        </code></pre>
        
        <p>Este es solo un ejemplo básico de cómo usar useState. Los hooks ofrecen mucha más funcionalidad y pueden simplificar significativamente tu código de React.</p>
        
        <h3>Ventajas de usar Hooks</h3>
        <ul>
          <li>Código más limpio y fácil de leer</li>
          <li>Reutilización de lógica sin necesidad de HOCs o render props</li>
          <li>Composición de efectos secundarios</li>
          <li>Uso de características de React sin clases</li>
        </ul>
        
        <p>A medida que te familiarices con los hooks, descubrirás cómo pueden mejorar tu flujo de trabajo en React y hacer que tu código sea más mantenible.</p>
        
        <p>Para más información, consulta la <a href="https://reactjs.org/docs/hooks-intro.html" target="_blank" rel="noopener noreferrer">documentación oficial de React Hooks</a>.</p>
      `,
      image: "/clima.webp",
      date: "2023-06-01",
      tags: ["React", "JavaScript", "Hooks", "Frontend"],
      type: "tutorial",
      author: {
        name: "Carlos Rodríguez",
        avatar: "/profile.webp"
      },
      readingTime: "7 min"
    }
  ];