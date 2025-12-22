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
  //herramientas esenciales para node
  {
  slug: 'herramientas-esenciales-nodejs',
  title: 'Herramientas Esenciales para Desarrollar con Node.js',
  image: '/blog/node_tools.png',
  date: '2025-06-12',
  tags: [
    'Node.js',
    'Backend',
    'Herramientas',
    'Testing',
    'JavaScript',
  ],
  type: 'Artículo Técnico',
  author: {
    name: 'Camilo Escar',
    avatar: '/profile.webp',
  },
  readingTime: '12 min',
  excerpt:
    'Un repaso práctico por las herramientas más utilizadas en proyectos Node.js modernos: testing, logging, automatización y manejo de dependencias.',
  content: `
<h2>Introducción</h2>
<p>
Node.js no es solo el runtime que ejecuta JavaScript en el backend.
Gran parte de su potencia viene del ecosistema de herramientas que lo rodean.
Elegir bien estas herramientas puede marcar la diferencia entre un proyecto difícil de mantener
y uno limpio, testeable y profesional.
</p>

<p>
En este artículo voy a recorrer algunas de las <strong>herramientas más usadas en proyectos Node.js</strong>,
explicando para qué sirven y cuándo conviene utilizarlas.
</p>

<hr/>

<h2>Jest: testing sin complicaciones</h2>
<p>
Jest es uno de los frameworks de testing más populares del ecosistema JavaScript.
Se destaca por ser simple de configurar y por incluir todo lo necesario para comenzar a escribir pruebas
sin agregar demasiadas dependencias.
</p>

<p>
Con Jest podemos escribir <strong>tests unitarios</strong>, mocks y pruebas asincrónicas de forma clara,
lo que lo vuelve ideal para APIs y servicios backend.
</p>

<pre><code>
test('suma correcta', () => {
  expect(2 + 3).toBe(5);
});
</code></pre>

<hr/>

<h2>Nodemon: desarrollo sin reinicios manuales</h2>
<p>
Nodemon es una herramienta pensada exclusivamente para el entorno de desarrollo.
Su función es observar los archivos del proyecto y reiniciar automáticamente la aplicación
cuando detecta cambios.
</p>

<p>
Esto ahorra tiempo y mejora el flujo de trabajo,
especialmente cuando estamos desarrollando APIs con Express o Fastify.
</p>

<pre><code>
nodemon index.js
</code></pre>

<hr/>

<h2>Yargs: crear CLIs fácilmente</h2>
<p>
Yargs permite construir aplicaciones de línea de comandos en Node.js
de manera ordenada y legible.
Es muy útil cuando necesitamos scripts internos, herramientas de automatización
o pequeños programas ejecutables.
</p>

<p>
Facilita la definición de comandos, argumentos y flags,
haciendo que nuestras CLIs sean más amigables.
</p>

<pre><code>
const yargs = require('yargs');

const argv = yargs
  .option('name', {
    alias: 'n',
    type: 'string',
    description: 'Nombre del usuario'
  })
  .argv;

console.log('Hola', argv.name);
</code></pre>

<hr/>

<h2>Winston: logging profesional</h2>
<p>
El logging es clave en cualquier aplicación backend.
Winston es una librería que permite manejar logs de forma estructurada,
con distintos niveles y múltiples destinos.
</p>

<p>
Podemos registrar logs en consola, archivos o servicios externos,
y diferenciar claramente entre información, advertencias y errores.
</p>

<pre><code>
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ],
});

logger.info('Aplicación iniciada');
</code></pre>

<hr/>

<h2>Axios: consumir APIs externas</h2>
<p>
Axios es una de las librerías más utilizadas para realizar solicitudes HTTP.
Funciona tanto en Node.js como en el navegador
y ofrece una API simple basada en promesas.
</p>

<p>
Es ideal para consumir servicios externos,
integrarse con APIs de terceros o comunicar microservicios.
</p>

<pre><code>
const axios = require('axios');

axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error.message);
  });
</code></pre>

<hr/>

<h2>Rimraf: limpiar sin preocuparse por el sistema operativo</h2>
<p>
Rimraf es una utilidad que permite eliminar carpetas y archivos
de forma recursiva, incluso en sistemas donde
<code>rm -rf</code> no está disponible.
</p>

<p>
Se usa mucho en scripts de build, limpieza de carpetas temporales
o reinicio de entornos.
</p>

<pre><code>
const rimraf = require('rimraf');

rimraf('dist', () => {
  console.log('Carpeta eliminada');
});
</code></pre>

<hr/>

<h2>Cómo encajan todas estas herramientas</h2>
<p>
En un proyecto real, estas herramientas suelen trabajar juntas:
</p>

<ul>
  <li>Jest para garantizar la calidad del código</li>
  <li>Nodemon para agilizar el desarrollo</li>
  <li>Yargs para scripts y herramientas internas</li>
  <li>Winston para observabilidad y debugging</li>
  <li>Axios para integraciones externas</li>
  <li>Rimraf para automatizar tareas de mantenimiento</li>
</ul>

<hr/>


<p>
Dominar Node.js no implica solo conocer JavaScript o Express,
sino también saber elegir y utilizar correctamente las herramientas
que acompañan el desarrollo.
</p>

<p>
Invertir tiempo en aprender estas librerías se traduce en
proyectos más profesionales, mantenibles y escalables.
</p>
`,
},
  //patrones de diseño node
  {
  slug: 'nodejs-design-patterns',
  title: 'Patrones de Diseño en Node.js: Guía Práctica con Ejemplos Reales',
  image: '/blog/api_architecture.png',
  date: '2025-04-21',
  tags: [
    'Node.js',
    'Design Patterns',
    'Backend',
    'Arquitectura',
    'JavaScript',
  ],
  type: 'Artículo Técnico',
  author: {
    name: 'Camilo Escar',
    avatar: '/profile.webp',
  },
  readingTime: '15 min',
  excerpt:
    'Un recorrido práctico por los patrones de diseño más utilizados en Node.js, con ejemplos adaptados a ES6 y explicaciones claras para aplicar en proyectos reales.',
  content: `
<h2>Introducción</h2>
<p>
Cuando trabajamos con Node.js, especialmente en proyectos backend que crecen con el tiempo,
la forma en la que organizamos el código se vuelve tan importante como la lógica de negocio.
Los patrones de diseño nos ayudan a resolver problemas comunes de una manera probada y mantenible.
</p>

<p>
En este artículo voy a repasar distintos <strong>patrones de diseño aplicados a Node.js</strong>,
tomando como base el libro <em>Node.js Design Patterns</em>, pero adaptando los ejemplos
al estilo moderno de JavaScript (ES6).
</p>

<h2>Un enfoque distinto a Java y C#</h2>
<p>
Si venís de lenguajes como Java o C#, vas a notar que los patrones no se implementan exactamente igual.
En JavaScript no todo gira en torno a clases e herencia; aquí pesan mucho más conceptos como
funciones, composición y módulos.
</p>

<p>
Aun así, la <strong>idea central de cada patrón se mantiene intacta</strong>.
El objetivo sigue siendo el mismo: desacoplar, reutilizar y hacer el código más fácil de mantener.
</p>

<h2>Patrones que vamos a ver</h2>
<ul>
  <li>Factory</li>
  <li>Proxy</li>
  <li>Decorator</li>
  <li>Adapter</li>
  <li>Strategy</li>
  <li>State</li>
  <li>Template</li>
  <li>Middleware</li>
  <li>Command</li>
  <li>Singleton</li>
  <li>Universal Module Definition (UMD)</li>
</ul>

<hr/>

<h2>Factory: controlar la creación de objetos</h2>
<p>
El patrón Factory se utiliza cuando no queremos que el código que consume un objeto
sea responsable de crearlo directamente.
En lugar de instanciar con <code>new</code> en todos lados,
delegamos esa responsabilidad a una fábrica.
</p>

<p>
Esto nos permite validar datos, cambiar la forma de construir el objeto
o incluso devolver distintas implementaciones sin afectar al resto del sistema.
</p>

<pre><code>
class Person {
  constructor(name, surname, age, sex) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.sex = sex;
  }
}

class PersonFactory {
  constructor() {
    this.data = {};
  }

  set(key, value) {
    this.data[key] = value;
  }

  build() {
    return new Person(
      this.data.name,
      this.data.surname,
      this.data.age,
      this.data.sex
    );
  }
}

const factory = new PersonFactory();
factory.set('name', 'Damián');
factory.set('surname', 'Cipolat');
factory.set('age', 30);
factory.set('sex', 'M');

const person = factory.build();
console.log(person);
</code></pre>

<hr/>

<h2>Proxy: controlar el acceso a un objeto</h2>
<p>
El patrón Proxy actúa como un intermediario.
En lugar de acceder directamente a un objeto,
lo hacemos a través de otro que decide qué hacer con cada llamada.
</p>

<p>
Es muy común usar proxies para agregar validaciones,
logs, control de permisos o incluso cachear resultados.
</p>

<pre><code>
class Service {
  getMessage() {
    return 'Hola';
  }
}

class ServiceProxy {
  constructor(service) {
    this.service = service;
  }

  getMessage() {
    const result = this.service.getMessage();
    return result + ' mundo';
  }
}

const service = new Service();
const proxy = new ServiceProxy(service);

console.log(proxy.getMessage());
</code></pre>

<hr/>

<h2>Decorator: extender comportamiento sin herencia</h2>
<p>
Decorator es ideal cuando queremos agregar nuevas funcionalidades
a un objeto sin modificar su clase original.
A diferencia de la herencia, el cambio se aplica solo al objeto decorado.
</p>

<pre><code>
class User {
  greet() {
    return 'Hola';
  }
}

class UserDecorator {
  constructor(user) {
    this.user = user;
  }

  greet() {
    return this.user.greet() + ', bienvenido!';
  }
}

const user = new User();
const decoratedUser = new UserDecorator(user);

console.log(decoratedUser.greet());
</code></pre>

<hr/>

<h2>Adapter: hacer compatibles interfaces distintas</h2>
<p>
El Adapter entra en juego cuando tenemos dos componentes
que hacen cosas similares pero con interfaces diferentes.
En lugar de modificar uno de ellos, creamos un adaptador.
</p>

<pre><code>
class OldShipping {
  calculate() {
    return '$50';
  }
}

class ShippingAdapter {
  constructor(service) {
    this.service = service;
  }

  getCost() {
    return this.service.calculate();
  }
}

const adapter = new ShippingAdapter(new OldShipping());
console.log(adapter.getCost());
</code></pre>

<hr/>

<h2>Strategy y State: comportamiento intercambiable</h2>
<p>
Strategy nos permite cambiar un algoritmo en tiempo de ejecución
sin modificar el código que lo utiliza.
State es una variación donde el comportamiento depende del estado interno.
</p>

<p>
Ambos patrones son muy útiles cuando tenemos múltiples reglas
que cambian según el contexto.
</p>

<hr/>

<h2>Middleware: encadenar responsabilidades</h2>
<p>
En Node.js este patrón es muy común, especialmente en frameworks como Express.
La idea es simple: una función procesa datos y pasa el resultado a la siguiente.
</p>

<p>
Esto permite crear flujos claros y reutilizables para validaciones,
transformaciones o cálculos.
</p>

<hr/>

<h2>Command: acciones como objetos</h2>
<p>
Command encapsula una acción completa en un objeto.
Esto hace posible ejecutar, deshacer o registrar operaciones
sin acoplarlas al código que las dispara.
</p>

<p>
Es especialmente útil en sistemas que requieren historial de acciones.
</p>

<hr/>

<h2>Singleton: una sola instancia</h2>
<p>
El patrón Singleton asegura que exista una única instancia de un objeto.
En Node.js, los módulos ya funcionan naturalmente de esta forma,
lo que lo vuelve muy práctico para configuraciones o servicios compartidos.
</p>

<hr/>

<h2>Universal Module Definition</h2>
<p>
UMD busca que un mismo módulo funcione tanto en Node.js
como en el navegador, sin importar el sistema de módulos utilizado.
</p>

<p>
Es una solución pensada para librerías que deben ejecutarse
en distintos entornos.
</p>

<hr/>


<p>
Los patrones de diseño no son recetas mágicas,
pero aplicados correctamente pueden marcar una gran diferencia
en la calidad de un proyecto Node.js.
</p>

<p>
Entender cuándo usarlos y adaptarlos al estilo de JavaScript moderno
es una habilidad clave para cualquier desarrollador backend.
</p>
`,
}
,  //extensiones-vs-code
  {
    slug: 'extensiones-vscode',
    title: 'Guía Completa sobre Extensiones de Visual Studio Code',
    image: '/blog/vscode_extensions.png',
    date: '2025-02-21',
    tags: [
      'VSCode',
      'Extensiones',
      'Desarrollo',
      'Productividad',
      'Herramientas',
    ],
    type: 'Tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/profile.webp',
    },
    readingTime: '10 min',
    excerpt:
      'Descubre cómo las extensiones de Visual Studio Code pueden mejorar tu flujo de trabajo y aumentar tu productividad como desarrollador.',
    content: `
  <h2>¿Qué es Visual Studio Code?</h2>
  <p>Visual Studio Code (VSCode) es un editor de código fuente desarrollado por Microsoft. Es popular entre los desarrolladores debido a su interfaz ligera, versatilidad y un ecosistema rico en extensiones que mejoran la experiencia de codificación.</p>

  <h2> ¿Por qué Usar Extensiones?</h2>
  <p>Las extensiones permiten personalizar y ampliar las funcionalidades de VSCode. Pueden ayudar a mejorar la productividad, agregar soporte para nuevos lenguajes, integrar herramientas y mejorar el flujo de trabajo general. Aquí hay algunas razones para usar extensiones:</p>
  <ul>
    <li><strong>Aumentar la Productividad:</strong> Las extensiones pueden automatizar tareas repetitivas y proporcionar atajos de teclado útiles.</li>
    <li><strong>Soporte para Múltiples Lenguajes:</strong> Puedes agregar soporte para nuevos lenguajes de programación y sus características específicas.</li>
    <li><strong>Integración de Herramientas:</strong> Algunas extensiones permiten integrar herramientas de desarrollo y servicios externos directamente en el editor.</li>
  </ul>

  <h2>🛠 Mejores Extensiones para VSCode</h2>
  <p>A continuación, se presentan algunas de las extensiones más populares y útiles que puedes instalar en VSCode:</p>

  <h3>1. Prettier - Code Formatter</h3>
  <p>Prettier es una herramienta de formateo de código que garantiza que tu código sea consistente y fácil de leer. Funciona con varios lenguajes y formatos de archivo.</p>
  <pre><code>Instalación: 
  1. Abre el panel de extensiones (Ctrl+Shift+X).
  2. Busca "Prettier" y selecciona "Instalar".
  </code></pre>

  <h3>2. ESLint</h3>
  <p>ESLint es una herramienta para identificar y reportar patrones problemáticos en el código JavaScript. Ayuda a mantener un código limpio y libre de errores.</p>
  <pre><code>Instalación: 
  1. Abre el panel de extensiones.
  2. Busca "ESLint" y selecciona "Instalar".
  </code></pre>

  <h3>3. GitLens</h3>
  <p>GitLens mejora la integración de Git en VSCode, proporcionando información sobre las líneas de código, historia de cambios y autoría, lo que facilita el seguimiento del desarrollo del proyecto.</p>
  <pre><code>Instalación: 
  1. Abre el panel de extensiones.
  2. Busca "GitLens" y selecciona "Instalar".
  </code></pre>

  <h3>4. Live Server</h3>
  <p>Live Server permite lanzar un servidor local con recarga automática para aplicaciones web. Es especialmente útil para el desarrollo de aplicaciones front-end.</p>
  <pre><code>Instalación: 
  1. Abre el panel de extensiones.
  2. Busca "Live Server" y selecciona "Instalar".
  </code></pre>

  <h3>5. Python</h3>
  <p>La extensión oficial de Python proporciona soporte completo para desarrollo en Python, incluyendo depuración, IntelliSense y gestión de entornos virtuales.</p>
  <pre><code>Instalación: 
  1. Abre el panel de extensiones.
  2. Busca "Python" y selecciona "Instalar".
  </code></pre>

  <h2> Cómo Instalar Extensiones</h2>
  <p>Instalar extensiones en VSCode es un proceso sencillo:</p>
  <ol>
    <li>Abre VSCode.</li>
    <li>Ve al panel de extensiones (Ctrl+Shift+X).</li>
    <li>Busca la extensión que deseas instalar.</li>
    <li>Haz clic en "Instalar".</li>
  </ol>

  <h2>Gestionando Extensiones</h2>
  <p>Para gestionar tus extensiones instaladas, puedes desactivarlas, desinstalarlas o actualizar su configuración:</p>
  <ol>
    <li>Abre el panel de extensiones.</li>
    <li>Ve a la sección "Instaladas".</li>
    <li>Selecciona la extensión y usa las opciones disponibles para desactivar o desinstalar.</li>
  </ol>

  <h2>🛡 Consejos para Elegir Extensiones</h2>
  <ul>
    <li><strong>Revisar Calificaciones y Reseñas:</strong> Antes de instalar, verifica la calificación y las reseñas de otros usuarios.</li>
    <li><strong>Verificar Actualizaciones:</strong> Asegúrate de que la extensión esté activa y reciba actualizaciones periódicas.</li>
    <li><strong>Compatibilidad:</strong> Confirma que la extensión sea compatible con tu versión de VSCode y con tus lenguajes de programación.</li>
  </ul>

  
  <p>Las extensiones de Visual Studio Code son una herramienta poderosa para mejorar tu flujo de trabajo y aumentar tu productividad. Desde formateadores de código hasta herramientas de integración de Git, hay una amplia variedad de opciones disponibles para adaptarse a tus necesidades. ¡Explora el mercado de extensiones y personaliza tu experiencia de codificación hoy mismo!</p>
`,
  },
  //arquitectura llamado de multiples apis
  {
  slug: 'arquitectura-llamado-multiples-apis-nodejs',
  title: 'Arquitectura para el Llamado de Múltiples APIs en Node.js',
  image: '/blog/nodejs_design_patterns.webp',
  date: '2025-01-23',
  tags: [
    'Node.js',
    'Arquitectura de Software',
    'APIs',
    'Backend',
    'Clean Architecture',
  ],
  type: 'Arquitectura',
  author: {
    name: 'Camilo Escar',
    avatar: '/profile.webp',
  },
  readingTime: '14 min',
  excerpt:
    'Cómo diseñar una arquitectura limpia y escalable para consumir múltiples APIs externas en Node.js, aplicando buenas prácticas y patrones de diseño.',
  content: `
<h2>Introducción</h2>
<p>
En muchos proyectos backend, especialmente en fintech, seguros o ecommerce,
el servidor no solo expone endpoints propios,
sino que actúa como un <strong>orquestador de múltiples APIs externas</strong>.
</p>

<p>
Cuando este tipo de integración crece sin una arquitectura clara,
el código se vuelve difícil de mantener, probar y escalar.
En este artículo vamos a ver <strong>arquitecturas recomendadas</strong>
para manejar múltiples llamados a APIs de forma ordenada y profesional.
</p>

<hr/>

<h2>El problema de una mala arquitectura</h2>
<p>
Un error común es llamar a las APIs externas directamente desde los controladores.
Esto genera:
</p>

<ul>
  <li>Controladores demasiado grandes</li>
  <li>Lógica de negocio mezclada con HTTP</li>
  <li>Dificultad para testear</li>
  <li>Código fuertemente acoplado a proveedores externos</li>
</ul>

<p>
El objetivo de una buena arquitectura es <strong>aislar el impacto del cambio</strong>.
Si mañana cambia una API, el sistema no debería romperse.
</p>

<hr/>

<h2>Arquitectura recomendada: capas bien definidas</h2>
<p>
Una arquitectura clara para este escenario suele dividirse en capas:
</p>

<ul>
  <li><strong>Controllers</strong>: reciben la request y devuelven la response</li>
  <li><strong>Services / Use Cases</strong>: orquestan la lógica de negocio</li>
  <li><strong>Clients (API Adapters)</strong>: encapsulan cada API externa</li>
  <li><strong>Domain</strong>: reglas del negocio y modelos</li>
</ul>

<p>
Esta separación permite que cada parte tenga una responsabilidad única.
</p>

<hr/>

<h2>Capa de Clients: una API, un adaptador</h2>
<p>
Cada API externa debería tener su propio cliente.
Nunca conviene llamar a Axios directamente desde un servicio de negocio.
</p>

<p>
Este enfoque sigue el patrón <strong>Adapter</strong>.
</p>

<pre><code>
class InsuranceApiClient {
  constructor(http) {
    this.http = http;
  }

  async getQuote(data) {
    const response = await this.http.post('/quote', data);
    return response.data;
  }
}
</code></pre>

<p>
Si mañana cambia el proveedor,
solo se modifica este archivo.
</p>

<hr/>

<h2>Services: orquestar múltiples APIs</h2>
<p>
La capa de servicios es la encargada de coordinar
los llamados a distintas APIs y aplicar reglas de negocio.
</p>

<pre><code>
class QuoteService {
  constructor(apiA, apiB) {
    this.apiA = apiA;
    this.apiB = apiB;
  }

  async calculateQuote(input) {
    const resultA = await this.apiA.getQuote(input);
    const resultB = await this.apiB.getQuote(input);

    return {
      providerA: resultA.price,
      providerB: resultB.price,
    };
  }
}
</code></pre>

<p>
Aquí no importa cómo funcionan las APIs,
solo qué información devuelven.
</p>

<hr/>

<h2>Patrón Strategy: proveedores intercambiables</h2>
<p>
Cuando varias APIs cumplen el mismo objetivo,
el patrón <strong>Strategy</strong> permite intercambiarlas fácilmente.
</p>

<pre><code>
class ProviderStrategy {
  async quote(data) {
    throw new Error('Not implemented');
  }
}
</code></pre>

<p>
Cada proveedor implementa su propia estrategia,
pero el sistema los trata de forma uniforme.
</p>

<hr/>

<h2>Manejo de fallos y tolerancia</h2>
<p>
Cuando dependemos de APIs externas,
los errores no son una excepción, sino una certeza.
</p>

<p>
Buenas prácticas:
</p>

<ul>
  <li>Timeouts bien definidos</li>
  <li>Retries controlados</li>
  <li>Fallbacks si un proveedor no responde</li>
  <li>Logs claros por proveedor</li>
</ul>

<p>
Esto convierte a la aplicación en un sistema más resiliente.
</p>

<hr/>

<h2>Arquitectura orientada a casos de uso</h2>
<p>
Una evolución natural es aplicar <strong>Clean Architecture</strong>
o <strong>Hexagonal Architecture</strong>.
</p>

<p>
En este enfoque:
</p>

<ul>
  <li>El dominio no conoce a Axios ni HTTP</li>
  <li>Las APIs externas son detalles reemplazables</li>
  <li>Los casos de uso definen el flujo principal</li>
</ul>

<p>
Esto hace que el sistema sea más fácil de testear
y más preparado para el crecimiento.
</p>

<hr/>

<h2>Escalabilidad y mantenibilidad</h2>
<p>
Una arquitectura bien pensada permite:
</p>

<ul>
  <li>Agregar nuevos proveedores sin reescribir lógica</li>
  <li>Testear servicios sin depender de APIs reales</li>
  <li>Reducir bugs al aislar responsabilidades</li>
  <li>Escalar el equipo sin generar caos</li>
</ul>

<hr/>


<p>
Cuando una aplicación backend consume múltiples APIs,
la arquitectura deja de ser un detalle y pasa a ser una necesidad.
</p>

<p>
Separar responsabilidades, aplicar patrones de diseño
y tratar a las APIs externas como dependencias reemplazables
es clave para construir sistemas robustos y profesionales.
</p>
`},  
  //guia-para-entender-el-proceso-TDD
  {
    slug: 'tdd-guia-completa',
    title: 'Guía Completa para Implementar TDD en tus Proyectos',
    image: '/blog/tdd_guide.png',
    date: '2024-10-21',
    tags: [
      'TDD',
      'Desarrollo',
      'Pruebas',
      'Calidad de Código',
      'Metodologías Ágiles',
    ],
    type: 'Tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/profile.webp',
    },
    readingTime: '10 min',
    excerpt:
      'Descubre cómo implementar el Desarrollo Guiado por Pruebas (TDD) en tus proyectos y mejora la calidad y mantenibilidad del código con un ejemplo práctico.',
    content: `
  <h2>¿Qué es TDD?</h2>
  <p>El Desarrollo Guiado por Pruebas (TDD) es una metodología que prioriza la creación de pruebas antes de escribir el código funcional. Este enfoque ayuda a garantizar que el software cumpla con los requisitos desde el inicio, mejorando la calidad y la mantenibilidad del código.</p>

  <h2>Beneficios de TDD</h2>
  <ul>
    <li><strong>Calidad del Código:</strong> Asegura que el código se adhiera a los requisitos desde el principio.</li>
    <li><strong>Menos Errores:</strong> Detecta problemas temprano, lo que reduce costos y esfuerzos de corrección.</li>
    <li><strong>Diseño Mejorado:</strong> Promueve un diseño más modular y desacoplado.</li>
    <li><strong>Documentación Viviente:</strong> Las pruebas actúan como documentación que explica el comportamiento esperado del sistema.</li>
  </ul>

  <h2>🛠 Pasos para Implementar TDD</h2>
  <h3>1. Entender los Requisitos</h3>
  <p>Asegúrate de tener claros los requisitos de la funcionalidad a implementar. Por ejemplo, supongamos que deseas implementar una calculadora simple que sume, reste, multiplique y divida.</p>

  <h3>2. Escribir la Prueba Inicial</h3>
  <p>Comienza escribiendo una prueba para la función de suma. Esta prueba debería fallar inicialmente.</p>
  <pre><code>def test_suma():
    assert suma(2, 3) == 5
  </code></pre>

  <h3>3. Ejecutar la Prueba</h3>
  <p>Ejecuta la prueba y asegúrate de que falle, confirmando que la funcionalidad aún no está implementada.</p>

  <h3>4. Escribir el Código Necesario</h3>
  <p>Ahora, implementa la función de suma con el código mínimo necesario para que la prueba pase.</p>
  <pre><code>def suma(a, b):
    return a + b
  </code></pre>

  <h3>5. Ejecutar las Pruebas Nuevamente</h3>
  <p>Ejecuta las pruebas nuevamente. Deberías ver que la prueba pasa.</p>

  <h3>6. Refactorizar el Código</h3>
  <p>Una vez que la prueba pasa, puedes refactorizar el código para mejorar su claridad o eficiencia, asegurándote de que todas las pruebas sigan pasando.</p>

  <h3>7. Repetir el Proceso</h3>
  <p>Repite el ciclo para cada nueva funcionalidad. Por ejemplo, escribe pruebas para la resta, multiplicación y división de la calculadora.</p>
  <pre><code>def test_resta():
    assert resta(5, 3) == 2

def test_multiplicacion():
    assert multiplicacion(2, 3) == 6

def test_division():
    assert division(6, 3) == 2
  </code></pre>

  <h2>Ejemplo Completo de TDD</h2>
  <p>Imaginemos que estás creando una calculadora simple con las operaciones básicas. Aquí te muestro cómo implementar TDD paso a paso.</p>
  
  <h3>1. Prueba de Suma</h3>
  <pre><code>def test_suma():
    assert suma(2, 3) == 5
  </code></pre>

  <h3>2. Implementación de Suma</h3>
  <pre><code>def suma(a, b):
    return a + b
  </code></pre>

  <h3>3. Prueba de Resta</h3>
  <pre><code>def test_resta():
    assert resta(5, 3) == 2
  </code></pre>

  <h3>4. Implementación de Resta</h3>
  <pre><code>def resta(a, b):
    return a - b
  </code></pre>

  <h3>5. Prueba de Multiplicación</h3>
  <pre><code>def test_multiplicacion():
    assert multiplicacion(2, 3) == 6
  </code></pre>

  <h3>6. Implementación de Multiplicación</h3>
  <pre><code>def multiplicacion(a, b):
    return a * b
  </code></pre>

  <h3>7. Prueba de División</h3>
  <pre><code>def test_division():
    assert division(6, 3) == 2
  </code></pre>

  <h3>8. Implementación de División</h3>
  <pre><code>def division(a, b):
    if b == 0:
        raise ValueError("No se puede dividir por cero")
    return a / b
  </code></pre>

  <h2>Consejos Adicionales para TDD Efectivo</h2>
  <ul>
    <li><strong>Utiliza Frameworks de Pruebas:</strong> Herramientas como <code>pytest</code> o <code>unittest</code> en Python facilitan la creación y ejecución de pruebas.</li>
    <li><strong>Cubre Diferentes Casos de Prueba:</strong> Asegúrate de incluir tanto casos positivos como negativos.</li>
    <li><strong>Mantén la Prueba Simple:</strong> Escribe pruebas que sean fáciles de entender.</li>
    <li><strong>Automatiza la Ejecución de Pruebas:</strong> Configura tu entorno para ejecutar pruebas automáticamente al realizar cambios.</li>
  </ul>

  
  <p>Implementar TDD puede ser un desafío al principio, pero se convertirá en una parte natural de tu flujo de trabajo. Este enfoque no solo mejora la calidad del código, sino que también aumenta tu confianza al realizar cambios. ¡Empieza hoy mismo y transforma tu proceso de desarrollo!</p>
`,
  },
  // entender-init-package-json-tsconfig
  {
    slug: 'entender-init-package-json-tsconfig',
    title: 'Entendiendo el Init: Detalles de package.json y tsconfig.json',
    image: '/blog/init_category.png',
    date: '2024-10-21',
    tags: [
      'Node.js',
      'TypeScript',
      'package.json',
      'tsconfig.json',
      'Desarrollo',
    ],
    type: 'Tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/profile.webp',
    },
    readingTime: '6 min',
    excerpt:
      'Descubre qué hace el comando init en un proyecto de Node.js y cómo los archivos package.json y tsconfig.json influyen en tu desarrollo.',
    content: `
  <h2>¿Qué Significa 'Init' en un Proyecto Node.js?</h2>
  <p>El comando <code>npm init</code> inicializa un nuevo proyecto de Node.js y crea un archivo <code>package.json</code> que contiene la configuración básica de tu proyecto.</p>
  
  <h2>Explorando package.json</h2>
  <p>El <code>package.json</code> es el corazón de cualquier proyecto Node.js. Aquí te mostramos sus secciones más importantes:</p>
  
  <h3>1. Información del Proyecto</h3>
  <pre><code>{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "description": "Descripción de mi proyecto",
  "main": "index.js",
  "scripts": {
    "start": "node dist/index.js"
  },
  ...
}</code></pre>
  <p>Esta sección incluye el nombre, la versión y una breve descripción de tu proyecto. También especifica el archivo principal y los scripts que puedes ejecutar.</p>
  
  <h3>2. Dependencias</h3>
  <pre><code>{
  ...
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "typescript": "^4.3.2"
  }
}</code></pre>
  <p>Aquí se enumeran las bibliotecas que tu proyecto necesita para funcionar, así como las dependencias de desarrollo, como TypeScript.</p>
  
  <h3>3. Scripts Personalizados</h3>
  <pre><code> "scripts": {
    "start": "node dist/index.js",
    "build": "tsc"
  }</code></pre>
  <p>Puedes definir comandos personalizados que faciliten tareas comunes, como iniciar el servidor o compilar tu código TypeScript.</p>
  
  <h2>Comprendiendo tsconfig.json</h2>
  <p>El archivo <code>tsconfig.json</code> es esencial para proyectos TypeScript. Aquí configuras cómo TypeScript debe compilar tu código.</p>
  
  <h3>1. Opciones del Compilador</h3>
  <pre><code>{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  }
}</code></pre>
  <p>En esta sección, defines la versión de ECMAScript a la que quieres compilar, el sistema de módulos y las rutas de entrada y salida.</p>
  
  <h3>2. Inclusiones y Exclusiones</h3>
  <pre><code>{
  ...
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}</code></pre>
  <p>Esto especifica qué archivos incluir o excluir durante la compilación. Normalmente, incluyes el código fuente y excluyes las carpetas de dependencias.</p>
  
  <h2>La Raíz del Proyecto</h2>
  <p>La raíz del proyecto es el directorio donde se encuentran los archivos <code>package.json</code> y <code>tsconfig.json</code>. Aquí es donde iniciarás tus comandos de npm y TypeScript. Mantener una estructura de carpetas organizada es clave para el éxito del proyecto.</p>
  
  <h2>¿Cómo Avanzar Desde Aquí?</h2>
  <p>Una vez que tengas tus archivos inicializados, puedes:</p>
  <ul>
    <li>Instalar más dependencias según necesites.</li>
    <li>Crear y organizar tus archivos en la carpeta <code>src</code>.</li>
    <li>Definir más scripts en <code>package.json</code> para automatizar tareas.</li>
  </ul>
  
  
  <p>Entender el init y los archivos que genera es crucial para cualquier desarrollador que trabaje con Node.js y TypeScript. Ahora que conoces la estructura básica, ¡estás listo para empezar a desarrollar aplicaciones increíbles!</p>
  `,
  },
  // entender-ejercicio-logica-javascript
  {
    slug: 'entender-ejercicio-logica-javascript',
    title: 'Cómo Entender y Resolver Ejercicios de Lógica en JavaScript',
    image: '/blog/javascript_logic_exercises.png',
    date: '2024-10-20',
    tags: ['JavaScript', 'Lógica', 'Tutorial', 'Desarrollo', 'Programación'],
    type: 'Tutorial',
    author: {
      name: 'Tu Nombre',
      avatar: '/profile.webp',
    },
    readingTime: '6 min',
    excerpt:
      'Aprende a abordar ejercicios de lógica en JavaScript con un enfoque paso a paso. Mejora tus habilidades de programación y resolución de problemas.',
    content: `
  <article>
    <header>
      <h1>Cómo Entender y Resolver Ejercicios de Lógica en JavaScript</h1>
      <p>Los ejercicios de lógica son esenciales para desarrollar habilidades de programación. Aquí te mostramos un enfoque paso a paso para resolverlos en JavaScript.</p>
    </header>

    <section>
      <h2>1. Lee el Problema con Atención</h2>
      <p>Antes de codificar, asegúrate de comprender bien el enunciado. Pregúntate:</p>
      <ul>
        <li>¿Qué se solicita?</li>
        <li>¿Cuáles son los datos de entrada y los resultados esperados?</li>
      </ul>
      
      <h3>Ejemplo</h3>
      <p>"Escribe una función que reciba un array de números y devuelva un nuevo array que contenga solo los números pares."</p>
    </section>

    <section>
      <h2>2. Identifica las Reglas y Condiciones</h2>
      <p>Anota las reglas clave, como:</p>
      <ul>
        <li>Un número es par si se puede dividir entre 2 sin residuo.</li>
        <li>Considera casos especiales (array vacío, todos los números impares).</li>
      </ul>
    </section>

    <section>
      <h2>3. Esquema Tu Solución</h2>
      <p>Antes de codificar, piensa en la lógica. Usa pseudocódigo para organizar tus ideas.</p>

      <h3>Pseudocódigo</h3>
      <pre>
        1. Crear una función que acepte un array.
        2. Inicializar un array vacío para pares.
        3. Iterar sobre cada número en el array:
          - Si es par, añadirlo al array de pares.
        4. Devolver el array de pares.
      </pre>
    </section>

    <section>
      <h2>4. Escribe el Código</h2>
      <p>Con el plan claro, codifica tu solución en JavaScript.</p>

      <h3>Código</h3>
      <pre><code>
  function obtenerPares(arr) {
      const pares = [];
      for (let num of arr) {
          if (num % 2 === 0) {
              pares.push(num);
          }
      }
      return pares;
  }

  // Ejemplo de uso
  const numeros = [1, 2, 3, 4, 5, 6];
  console.log(obtenerPares(numeros)); // Output: [2, 4, 6]
      </code></pre>
    </section>

    <section>
      <h2>5. Prueba tu Solución</h2>
      <p>Verifica tu función con diferentes casos de prueba:</p>
      <pre><code>
  console.log(obtenerPares([])); // Output: []
  console.log(obtenerPares([1, 3, 5])); // Output: []
  console.log(obtenerPares([2, 4, 6])); // Output: [2, 4, 6]
      </code></pre>
    </section>

    <section>
      <h2>6. Revisa y Optimiza</h2>
      <p>Revisa tu solución. Pregúntate si es legible y si puede optimizarse. Podrías usar <code>filter</code> para un enfoque más elegante.</p>

      <h3>Versión Optimizada</h3>
      <pre><code>
  const obtenerPares = (arr) => arr.filter(num => num % 2 === 0);

  // Ejemplo de uso
  console.log(obtenerPares([1, 2, 3, 4, 5, 6])); // Output: [2, 4, 6]
      </code></pre>
    </section>

    <section>
      <h2>7. Reflexiona sobre el Proceso</h2>
      <p>Cada ejercicio es una oportunidad de aprendizaje. Reflexiona sobre lo que hiciste bien y lo que podrías mejorar. ¡Cada práctica cuenta!</p>
    </section>

    <footer>
      
      <p>Los ejercicios de lógica en JavaScript pueden ser desafiantes, pero con un enfoque estructurado y práctica, puedes dominarlos. Recuerda seguir los pasos y, sobre todo, ¡disfrutar del proceso de aprendizaje!</p>
    </footer>
  </article>
  `,
  },
  // iniciar-proyecto-node-typescript
  {
    slug: 'iniciar-proyecto-node-typescript',
    title: 'Cómo Iniciar un Proyecto con Node.js y TypeScript: ¡Guía Completa!',
    image: '/blog/node_typescript_category.png',
    date: '2024-10-20',
    tags: ['Node.js', 'TypeScript', 'Desarrollo', 'Tutorial', 'JavaScript'],
    type: 'Tutorial',
    author: {
      name: 'Tu Nombre',
      avatar: '/profile.webp',
    },
    readingTime: '5 min',
    excerpt:
      'Descubre cómo iniciar tu proyecto en Node.js con TypeScript desde cero o utilizando plantillas. ¡Empieza a codificar hoy mismo!',
    content: `
  <h2>¿Por Qué Node.js y TypeScript?</h2>
  <p>Node.js permite construir aplicaciones rápidas y escalables, mientras que TypeScript añade tipado estático y características avanzadas para mejorar la mantenibilidad.</p>
  
  <h2>🛠️ Opción 1: Iniciar Desde Cero</h2>
  
  <h3>Paso 1: Crear la Carpeta del Proyecto</h3>
  <pre><code>mkdir mi-proyecto-ts
cd mi-proyecto-ts</code></pre>
  
  <h3>Paso 2: Inicializar npm</h3>
  <pre><code>npm init -y</code></pre>
  
  <h3>Paso 3: Instalar TypeScript</h3>
  <pre><code>npm install typescript --save-dev</code></pre>
  
  <h3>Paso 4: Configurar TypeScript</h3>
  <pre><code>npx tsc --init</code></pre>
  <p>Configura tu <code>tsconfig.json</code> como prefieras.</p>
  
  <h3>Paso 5: Crear la Estructura de Carpetas</h3>
  <pre><code>mkdir src
touch src/index.ts</code></pre>
  <p>Agrega un código simple en <code>index.ts</code>:</p>
  <pre><code>const greeting: string = '¡Hola, mundo!';
console.log(greeting);</code></pre>
  
  <h3>Paso 6: Compilar y Ejecutar</h3>
  <pre><code>npx tsc
node dist/index.js</code></pre>
  
  <h2>Opción 2: Usar Plantillas de Proyecto</h2>
  <p>Para comenzar rápidamente, considera usar plantillas o generadores:</p>
  
  <h3>1. NestJS</h3>
  <pre><code>npm i -g @nestjs/cli
nest new mi-proyecto-nest</code></pre>
  
  <h3>2. Express con TypeScript</h3>
  <pre><code>npx express-generator-typescript mi-proyecto-express
cd mi-proyecto-express
npm install</code></pre>
  
  <h3>3. Vite</h3>
  <pre><code>npm create vite@latest mi-proyecto-vite --template vanilla-ts
cd mi-proyecto-vite
npm install</code></pre>
  
  
  <p>Ya sea que elijas iniciar desde cero o usar plantillas, ahora tienes varias maneras de comenzar tu proyecto en Node.js y TypeScript. ¡Elige la que más te guste y comienza a codificar!</p>
  `,
  },
  // dockerizando-proyectos-backend-frontend
  {
    slug: 'dockerizando-proyectos-backend-frontend',
    title:
      'Cómo Dockerizar un Proyecto Backend y Frontend: Una Guía Paso a Paso',
    image: '/blog/docker_category.png',
    date: '2024-10-17',
    tags: ['Docker', 'Backend', 'Frontend', 'DevOps', 'Contenedores'],
    type: 'Tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/camilo-avatar.webp',
    },
    readingTime: '6 min',
    excerpt:
      'En este blog, aprenderás cómo dockerizar un proyecto backend y frontend, para que puedas ejecutarlo en cualquier entorno sin preocuparte por las diferencias en configuraciones.',
    content: `
    <h2>Cómo Dockerizar un Proyecto Backend y Frontend: Una Guía Paso a Paso</h2>
    <p>En el mundo del desarrollo moderno, la capacidad de crear aplicaciones portables es esencial para trabajar de manera eficiente y escalar sin problemas. Docker es una de las herramientas más poderosas para lograr esto, permitiéndonos empacar nuestras aplicaciones, junto con sus dependencias, en contenedores que pueden ejecutarse en cualquier entorno. En este artículo, te mostraré cómo dockerizar un proyecto tanto de backend como de frontend, para que puedas usarlo donde quieras.</p>

    <h3>¿Qué es Docker?</h3>
    <p>Docker es una plataforma que permite desarrollar, enviar y ejecutar aplicaciones dentro de contenedores. Un contenedor incluye todo lo necesario para que una aplicación funcione: código, dependencias, librerías y configuraciones, lo que garantiza que se ejecute de la misma manera en cualquier entorno.</p>

    <h3>¿Por qué Dockerizar tu Proyecto?</h3>
    <p>Al dockerizar tu aplicación, te aseguras de que:</p>
    <ul>
      <li><strong>Portabilidad:</strong> Puedes ejecutar la misma imagen en cualquier lugar, desde tu máquina local hasta un servidor en la nube.</li>
      <li><strong>Reproducibilidad:</strong> Todos los entornos son consistentes, evitando el clásico "funciona en mi máquina".</li>
      <li><strong>Escalabilidad:</strong> Facilita la integración con orquestadores como Kubernetes, permitiendo escalar tu aplicación fácilmente.</li>
    </ul>

    <h3>Dockerizando un Proyecto Backend</h3>
    <p>Vamos a empezar dockerizando un backend sencillo en Node.js con Express.</p>

    <h4>1. Estructura del Proyecto</h4>
    <p>La estructura básica de tu proyecto Node.js debería lucir así:</p>
    <pre><code>mi-backend/
    ├── Dockerfile
    ├── .dockerignore
    ├── package.json
    ├── server.js
    └── node_modules/
    </code></pre>

    <h4>2. Crear el Dockerfile</h4>
    <p>El Dockerfile define cómo se debe construir la imagen de Docker para tu aplicación:</p>
    <pre><code>FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
    </code></pre>

    <h4>3. Crear el .dockerignore</h4>
    <p>Excluye archivos innecesarios del contenedor:</p>
    <pre><code>node_modules
npm-debug.log
    </code></pre>

    <h4>4. Construir la Imagen</h4>
    <p>Navega a la carpeta del proyecto y ejecuta el comando:</p>
    <pre><code>docker build -t mi-backend .</code></pre>

    <h4>5. Ejecutar el Contenedor</h4>
    <p>Ejecuta el contenedor en el puerto 3000:</p>
    <pre><code>docker run -p 3000:3000 mi-backend</code></pre>

    <h3>Dockerizando un Proyecto Frontend</h3>
    <p>Ahora vamos a dockerizar un frontend sencillo creado con React.</p>

    <h4>1. Estructura del Proyecto</h4>
    <p>Un proyecto típico de React tendrá esta estructura:</p>
    <pre><code>mi-frontend/
    ├── Dockerfile
    ├── .dockerignore
    ├── package.json
    ├── public/
    ├── src/
    └── node_modules/
    </code></pre>

    <h4>2. Crear el Dockerfile</h4>
    <p>Este Dockerfile servirá la aplicación con Nginx:</p>
    <pre><code>FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
    </code></pre>

    <h4>3. Crear el .dockerignore</h4>
    <p>Excluye archivos innecesarios:</p>
    <pre><code>node_modules
build
npm-debug.log
    </code></pre>

    <h4>4. Construir la Imagen</h4>
    <p>Ejecuta el siguiente comando para crear la imagen del frontend:</p>
    <pre><code>docker build -t mi-frontend .</code></pre>

    <h4>5. Ejecutar el Contenedor</h4>
    <p>Sirve la aplicación en el puerto 3000:</p>
    <pre><code>docker run -p 3000:80 mi-frontend</code></pre>

    <h3>Orquestando con Docker Compose</h3>
    <p>Si trabajas con un backend y frontend, puedes usar Docker Compose:</p>

    <pre><code>version: '3'
services:
  frontend:
    build: ./mi-frontend
    ports:
      - "3000:80"
  backend:
    build: ./mi-backend
    ports:
      - "3001:3000"
    </code></pre>

    <p>Ejecuta ambos servicios con:</p>
    <pre><code>docker-compose up</code></pre>

    <h3>Subiendo las Imágenes a Docker Hub</h3>
    <p>Sube tus imágenes a Docker Hub para ejecutarlas en cualquier servidor:</p>
    <ul>
      <li><strong>Login en Docker Hub:</strong> <code>docker login</code></li>
      <li><strong>Etiquetar la Imagen:</strong> <code>docker tag mi-backend tu-usuario/mi-backend</code></li>
      <li><strong>Subir la Imagen:</strong> <code>docker push tu-usuario/mi-backend</code></li>
    </ul>

    <h3>Fin</h3>
    <p>Dockerizar tus proyectos backend y frontend te permitirá ejecutar tu código de manera eficiente en cualquier entorno. Si sigues los pasos descritos, estarás listo para crear aplicaciones portables y escalables. ¡Dockerizar es un gran primer paso hacia un flujo de trabajo más ágil y robusto!</p>
  `,
  },
  //trabajo-integrador-desarrollo-app
  {
    slug: 'trabajo-integrador-desarrollo-app',
    title:
      'Proceso de Desarrollo de la Aplicación: Desde la Entrevista Inicial hasta la Aprobación Final',
    image: '/blog/logometa.png',
    date: '2024-09-26',
    tags: ['Desarrollo', 'Aplicación', 'Base de Datos', 'Funkos', 'Ecommerce'],
    type: 'Caso de estudio',
    author: {
      name: 'Camilo Escar',
      avatar: '/camilo-avatar.webp',
    },
    readingTime: '7 min',
    excerpt:
      'En este blog, te llevamos a través de cada paso del desarrollo de una aplicación para el cliente Logos Funkos, desde la primera entrevista hasta la aprobación final del modelo de base de datos.',
    content: `
      <h2>Proceso de Desarrollo de la Aplicación: Desde la Entrevista Inicial hasta la Aprobación Final</h2>
      <p>En este proyecto integrador, trabajamos en conjunto con Logos Funkos para desarrollar una aplicación que cubriera las necesidades específicas de su emprendimiento. A continuación, detallamos las etapas clave del desarrollo.</p>

      <h3>1. Primera Entrevista con el Cliente</h3>
      <p>Comenzamos el proceso teniendo una entrevista con el cliente, donde recopilamos información sobre su emprendimiento y los requerimientos necesarios para la creación del programa. Durante esta fase, nos enfocamos en comprender las funciones clave que la aplicación debería incluir.</p>
      <img src="/blog/logometa.png" alt="Entrevista con el cliente">
      <p>A partir de esta entrevista, obtuvimos una visión clara sobre cómo diseñar la aplicación de manera personalizada.</p>

      <h3>2. Generación del Logo con IA</h3>
      <p>Como parte del branding, utilizamos IA para generar un logo acorde a la imagen que el cliente deseaba proyectar. El proceso de creación se realizó mediante un prompt ajustado a las especificaciones proporcionadas por el cliente.</p>
      <img src="/blog/logo-ia.jpg" alt="Logo generado con IA">

      <h3>3. Modelado Rápido de la Base de Datos</h3>
      <p>Una vez definidos los requerimientos principales, estructuramos rápidamente el modelo de base de datos. Este modelado inicial nos permitió organizar las tablas y relaciones necesarias para el proyecto.</p>
      <img src="/blog/modelado-bd-inicial.jpg" alt="Modelado inicial de la base de datos">

      <h3>4. Pulido de la Base de Datos tras la Segunda Entrevista</h3>
      <p>Después de revisar la estructura con el cliente, eliminamos estados innecesarios y refinamos el esquema para hacer que el modelo fuera más eficiente.</p>
      <img src="/blog/base-datos-pulida.jpg" alt="Base de datos refinada">

      <h3>5. Diseño del Wireframe en Figma</h3>
      <p>Con la estructura clara, creamos un wireframe en Figma para definir la interfaz de usuario (UI) y asegurarnos de que el flujo de la aplicación fuese intuitivo y atractivo.</p>
      <img src="/blog/wireframe-figma.jpg" alt="Wireframe en Figma">

      <h3>6. Creación del Diagrama de Clases en Lucid</h3>
      <p>Con el modelo de datos claro, trabajamos en el diagrama de clases utilizando Lucid. Este diagrama representaba la estructura de la base de datos y sus relaciones, lo que permitió visualizar mejor la lógica interna.</p>
      <img src="/blog/diagrama-clases-lucid.jpg" alt="Diagrama de clases en Lucid">

      <h3>7. Aplicación del Modelo de Requerimientos MoSCoW</h3>
      <p>En esta etapa, nos centramos en priorizar las características y requerimientos utilizando el modelo MoSCoW. Este enfoque nos permitió definir qué elementos debían estar presentes en la primera versión de la aplicación.</p>
      <img src="/blog/moscow.jpg" alt="Modelo MoSCoW aplicado a los requerimientos">

      <h3>8. Aprobación del Diagrama de Base de Datos</h3>
      <p>Luego de una nueva reunión con el cliente, obtuvimos la aprobación final del diagrama de base de datos. Esto fue un hito importante, ya que a partir de aquí pudimos comenzar a desarrollar la aplicación de manera más avanzada.</p>
      <img src="/blog/diagrama-aprobado.jpg" alt="Diagrama de base de datos aprobado">

      <h3>9. Construcción y Validación de la Base de Datos</h3>
      <p>Finalmente, comenzamos a implementar la base de datos según el modelo aprobado. Este paso involucró la creación de tablas, relaciones y optimizaciones para asegurar que la aplicación fuera eficiente y escalable.</p>
      <img src="/blog/base-datos-final.jpg" alt="Base de datos implementada">
      
      
      `,
  },
  //scraping-nodejs
  {
    slug: 'scraping-web-cualquier-pagina',
    title:
      'Cómo hacer scraping web de cualquier página con Node.js y Playwright',
    image: '/blog/scraping-web.png',
    date: '2024-10-05',
    tags: ['Node.js', 'Playwright', 'Web Scraping', 'Fullstack'],
    type: 'tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/profile.webp',
    },
    readingTime: '7 min',
    excerpt:
      'Aprende a hacer scraping web de cualquier página utilizando Node.js y Playwright, y cómo guardar los datos obtenidos en un archivo JSON.',
    content: `
<h2>Cómo hacer scraping web de cualquier página con Node.js y Playwright</h2>

<p>El scraping web es una técnica muy útil para obtener información de páginas web de manera automatizada. En este tutorial, te mostraré cómo hacer scraping de <strong>cualquier página web</strong> usando <strong>Node.js</strong> y <strong>Playwright</strong>, y guardar los datos en un archivo JSON para su posterior procesamiento.</p>

<h3>¿Por qué usar Playwright?</h3>
<p>Playwright es una herramienta potente y moderna para controlar navegadores como Chrome, Firefox, y Safari, entre otros. A diferencia de otras herramientas de scraping, Playwright permite interactuar con páginas web que dependen mucho de JavaScript, lo que la hace perfecta para sitios dinámicos.</p>

<h3>Requisitos previos</h3>
<p>Para este tutorial, necesitarás lo siguiente:</p>
<ul>
  <li><strong>Node.js</strong> y <strong>npm</strong> instalados en tu sistema.</li>
  <li>Instalar <a href="https://playwright.dev/">Playwright</a>.</li>
</ul>

<h3>1. Configurar el entorno</h3>
<p>Primero, necesitamos crear un proyecto en Node.js e instalar las dependencias necesarias:</p>
<pre><code class="language-bash">
mkdir scraping-web
cd scraping-web
npm init -y
npx playwright install
npm install @playwright/test fs
</code></pre>

<p>Esto inicializará un proyecto de Node.js y añadirá las dependencias de <strong>Playwright</strong> y el módulo <strong>fs</strong> para trabajar con archivos.</p>

<h3>2. Escribir el script de scraping</h3>
<p>El siguiente paso es escribir un script que realice el scraping de cualquier página web. Aquí tienes un ejemplo básico:</p>

<pre><code class="language-javascript">
import { chromium } from '@playwright/test';
import fs from 'fs';

(async () => {
  const url = 'https://ejemplo.com';  // Reemplaza con la URL que desees scrapear

  // Iniciar navegador y página
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Navegar a la página
  await page.goto(url);

  // Esperar a que los elementos de interés se carguen (modifica el selector)
  await page.waitForSelector('selector-del-elemento');

  // Extraer los datos
  const data = await page.$$eval('selector-del-elemento', items =>
    items.map(item => {
      const title = item.querySelector('selector-titulo')?.innerText || 'Sin título';
      const price = item.querySelector('selector-precio')?.innerText || 'Sin precio';
      return { title, price };
    })
  );

  // Guardar los datos en un archivo JSON
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf-8');
  console.log('Datos guardados en data.json');

  // Cerrar el navegador
  await browser.close();
})();
</code></pre>

<h3>3. Personalizar los selectores</h3>
<p>El script es genérico, lo que significa que puedes adaptarlo para cualquier página simplemente cambiando los selectores de los elementos que quieras scrapear. Por ejemplo, si estás scrapeando productos de una tienda online, es probable que los selectores de los títulos y precios sean algo como:</p>

<pre><code class="language-javascript">
const data = await page.$$eval('.product-card', items => 
  items.map(item => {
    const title = item.querySelector('.product-title')?.innerText || 'Sin título';
    const price = item.querySelector('.product-price')?.innerText || 'Sin precio';
    return { title, price };
  })
);
</code></pre>

<p>Modifica los selectores según la estructura HTML de la página objetivo.</p>

<h3>4. Guardar los datos en un archivo JSON</h3>
<p>El resultado de la extracción se guarda en un archivo JSON llamado <code>data.json</code>. Este archivo puede ser útil si quieres procesar los datos posteriormente o simplemente mantener un registro de la información scrapeada.</p>

<h3>5. Ejecutar el script</h3>
<p>Para ejecutar el script, simplemente corre el siguiente comando en la terminal:</p>

<pre><code class="language-bash">
node index.mjs
</code></pre>

<p>Esto ejecutará el script de scraping y guardará los datos en el archivo <code>data.json</code>.</p>

<h3>6. Cuidado con los términos de uso</h3>
<p>Es importante tener en cuenta que algunas páginas web prohíben el scraping en sus términos de uso. Asegúrate de revisar las políticas de cada sitio web antes de realizar scraping masivo.</p>

<h3></h3>
<p>Con este tutorial, has aprendido cómo hacer scraping de cualquier página web utilizando <strong>Node.js</strong> y <strong>Playwright</strong>, y cómo guardar los datos en un archivo JSON. Esto te permitirá obtener y analizar información de manera automatizada, abriendo las puertas a una gran cantidad de aplicaciones.</p>
`,
  },
  //guia-tecnologias
  {
    slug: 'tecnologias-desarrollo-web',
    title: 'Guía Completa de Tecnologías para el Desarrollo Web',
    image: '/blog/desarrollo-web.png',
    date: '2024-10-06',
    tags: ['Desarrollo Web', 'Frontend', 'Backend', 'DevOps'],
    type: 'tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/profile.webp',
    },
    readingTime: '10 min',
    excerpt:
      'Explora el vasto ecosistema del desarrollo web, desde el frontend hasta el backend y DevOps, con esta guía completa de tecnologías y herramientas.',
    content: `
<h2>Guía Completa de Tecnologías para el Desarrollo Web</h2>

<p>El desarrollo web es un campo en constante evolución, lleno de herramientas y tecnologías que permiten crear aplicaciones y sitios web modernos. En esta guía, exploraremos las principales tecnologías utilizadas en el desarrollo web, organizadas por categorías, para que puedas orientarte y elegir las herramientas que mejor se adapten a tus necesidades.</p>

<h3>1. Frontend</h3>

<h4>Lenguajes de Programación</h4>
<ul>
  <li><strong>HTML</strong>: Estructura básica de cualquier página web.</li>
  <li><strong>CSS</strong>: Controla el diseño y la presentación visual.</li>
  <li><strong>JavaScript</strong>: Agrega interactividad y lógica en el navegador.</li>
  <li><strong>TypeScript</strong>: Un superconjunto de JavaScript que añade tipado estático.</li>
</ul>

<h4>Frameworks y Bibliotecas</h4>
<ul>
  <li><strong>React</strong>: Popular para construir interfaces de usuario interactivas.</li>
  <li><strong>Vue.js</strong>: Framework progresivo para crear interfaces.</li>
  <li><strong>Angular</strong>: Solución integral para aplicaciones web complejas.</li>
  <li><strong>Svelte</strong>: Compila los componentes en código optimizado.</li>
</ul>

<h4>Herramientas de Construcción</h4>
<ul>
  <li><strong>Vite</strong>: Un entorno de desarrollo rápido y optimizado.</li>
  <li><strong>Webpack</strong>: Herramienta para empaquetar módulos de JavaScript.</li>
  <li><strong>Parcel</strong>: Empaquetador web sin configuración.</li>
  <li><strong>Rollup</strong>: Enfocado en bibliotecas y módulos.</li>
</ul>

<h4>Gestores de Estado</h4>
<ul>
  <li><strong>Redux</strong>: Gestión de estado en aplicaciones React.</li>
  <li><strong>MobX</strong>: Gestión de estado reactivo.</li>
  <li><strong>Vuex</strong>: Para la gestión de estado en aplicaciones Vue.</li>
</ul>

<h4>Frameworks de CSS</h4>
<ul>
  <li><strong>Bootstrap</strong>: Framework para diseños responsivos.</li>
  <li><strong>Tailwind CSS</strong>: CSS utilitario para estilos personalizados.</li>
</ul>

<h3>2. Backend</h3>

<h4>Lenguajes de Programación</h4>
<ul>
  <li><strong>JavaScript (Node.js)</strong>: Permite JavaScript en el servidor.</li>
  <li><strong>Python</strong>: Con frameworks como Django y Flask.</li>
  <li><strong>Ruby</strong>: Principalmente con Ruby on Rails.</li>
  <li><strong>PHP</strong>: Usado en plataformas como Laravel.</li>
  <li><strong>Java</strong>: Con Spring y Jakarta EE.</li>
  <li><strong>Go</strong>: Con frameworks como Gin y Echo.</li>
</ul>

<h4>Bases de Datos</h4>
<ul>
  <li><strong>Relacionales</strong>: MySQL, PostgreSQL.</li>
  <li><strong>NoSQL</strong>: MongoDB, Firebase.</li>
</ul>

<h4>APIs y Microservicios</h4>
<ul>
  <li><strong>RESTful APIs</strong>: Estándar para comunicación entre servicios.</li>
  <li><strong>GraphQL</strong>: Lenguaje de consulta para APIs.</li>
</ul>

<h3>3. DevOps y Herramientas de Implementación</h3>

<h4>Contenedores</h4>
<ul>
  <li><strong>Docker</strong>: Para crear contenedores ligeros y portables.</li>
  <li><strong>Kubernetes</strong>: Orquestación de contenedores a gran escala.</li>
</ul>

<h4>CI/CD</h4>
<ul>
  <li><strong>GitHub Actions</strong>: Automatización de flujos de trabajo.</li>
  <li><strong>GitLab CI</strong>: Integración continua en GitLab.</li>
  <li><strong>Jenkins</strong>: Herramienta de automatización de código abierto.</li>
</ul>

<h4>Hosting y Servidores</h4>
<ul>
  <li><strong>Netlify</strong>: Para desplegar sitios estáticos.</li>
  <li><strong>Vercel</strong>: Ideal para aplicaciones React y Next.js.</li>
  <li><strong>AWS</strong>: Servicios en la nube para cualquier tipo de aplicación.</li>
</ul>

<h4>Monitoreo y Rendimiento</h4>
<ul>
  <li><strong>Prometheus</strong>: Monitoreo de sistemas y servicios.</li>
  <li><strong>Grafana</strong>: Visualización de datos de monitoreo.</li>
</ul>

<h3>4. Otros Componentes</h3>

<h4>SEO y Analítica</h4>
<ul>
  <li><strong>Google Analytics</strong>: Seguimiento de tráfico y comportamiento de usuarios.</li>
  <li><strong>Ahrefs</strong>: Herramienta para análisis SEO.</li>
</ul>

<h4>Testing</h4>
<ul>
  <li><strong>Jest</strong>: Framework de pruebas para JavaScript.</li>
  <li><strong>Cypress</strong>: Pruebas end-to-end para aplicaciones web.</li>
</ul>

<h4>Gestión de Proyectos</h4>
<ul>
  <li><strong>Trello</strong>: Herramienta para gestionar tareas.</li>
  <li><strong>Jira</strong>: Software de gestión ágil.</li>
</ul>

<h3></h3>
<p>El ecosistema del desarrollo web es amplio y diverso, y hay muchas herramientas y tecnologías disponibles para ayudar a los desarrolladores a crear aplicaciones efectivas. Esta guía es solo un punto de partida; te animamos a explorar cada una de estas tecnologías para encontrar las que mejor se adapten a tus proyectos y estilo de trabajo.</p>
`,
  },
  //tecnologias-js
  {
    slug: 'tecnologias-js-comparativa',
    title:
      'Comparativa de Tecnologías JavaScript: Elegir la Mejor Opción para tu Proyecto',
    image: '/blog/javascript-tecnologias.webp',
    date: '2024-09-26',
    tags: ['JavaScript', 'Frameworks', 'Desarrollo', 'Frontend', 'Comparativa'],
    type: 'Guía',
    author: {
      name: 'Camilo Escar',
      avatar: '/camilo-avatar.webp',
    },
    readingTime: '8 min',
    excerpt:
      'En esta guía, exploramos las características y mejores usos de tecnologías populares de JavaScript como React, Vue, Svelte y Angular, ayudándote a tomar decisiones informadas para tus proyectos.',
    content: `
      <h2>Comparativa de Tecnologías JavaScript: Elegir la Mejor Opción para tu Proyecto</h2>
      <p>En el mundo del desarrollo web, elegir la tecnología adecuada puede ser crucial para el éxito de un proyecto. Con tantas opciones disponibles, cada una con sus características y enfoques, es importante entender cuándo y por qué usar cada una. A continuación, analizaremos algunas de las tecnologías más populares de JavaScript: React, Vue.js, Svelte y Angular.</p>
  
      <h3>1. React</h3>
      <p><strong>Características:</strong></p>
      <ul>
        <li><strong>Basado en componentes:</strong> Permite crear UIs reutilizables y manejables.</li>
        <li><strong>Virtual DOM:</strong> Optimiza el rendimiento al actualizar solo los elementos que han cambiado.</li>
        <li><strong>Ecosistema robusto:</strong> Dispone de muchas bibliotecas como Redux y Next.js que amplían su funcionalidad.</li>
        <li><strong>Comunidad activa:</strong> Gran soporte y documentación gracias a su popularidad.</li>
      </ul>
      <p><strong>Cuándo usarlo:</strong> Ideal para proyectos grandes y complejos donde se busca una arquitectura escalable y una amplia gama de herramientas.</p>
  
      <h3>2. Vue.js</h3>
      <p><strong>Características:</strong></p>
      <ul>
        <li><strong>Fácil de aprender:</strong> Su sintaxis es intuitiva, lo que facilita la adopción por parte de nuevos desarrolladores.</li>
        <li><strong>Reactividad:</strong> Actualiza automáticamente la UI cuando el estado cambia, sin necesidad de configurar el seguimiento manualmente.</li>
        <li><strong>Flexibilidad:</strong> Se puede usar en proyectos pequeños o como parte de aplicaciones más grandes.</li>
        <li><strong>Buen equilibrio:</strong> Proporciona funcionalidades robustas sin ser excesivamente complejo.</li>
      </ul>
      <p><strong>Cuándo usarlo:</strong> Perfecto para proyectos que requieren un desarrollo rápido y donde se busca una integración gradual.</p>
  
      <h3>3. Svelte</h3>
      <p><strong>Características:</strong></p>
      <ul>
        <li><strong>Compilación en tiempo de construcción:</strong> Genera código optimizado, lo que mejora el rendimiento de la aplicación.</li>
        <li><strong>Sin virtual DOM:</strong> Actualiza directamente el DOM real, lo que lo hace más eficiente.</li>
        <li><strong>Sintaxis simple:</strong> Utiliza una mezcla de HTML, CSS y JavaScript que resulta familiar para los desarrolladores.</li>
      </ul>
      <p><strong>Cuándo usarlo:</strong> Ideal para aplicaciones donde el rendimiento es crítico y se busca un desarrollo más sencillo y directo.</p>
  
      <h3>4. Angular</h3>
      <p><strong>Características:</strong></p>
      <ul>
        <li><strong>Framework completo:</strong> Ofrece una solución integral que incluye herramientas para todo el ciclo de vida del desarrollo.</li>
        <li><strong>TypeScript:</strong> Soporte nativo para TypeScript, lo que mejora la mantenibilidad y escalabilidad del código.</li>
        <li><strong>Inyección de dependencias:</strong> Facilita la gestión de servicios y componentes, haciendo el código más limpio y modular.</li>
      </ul>
      <p><strong>Cuándo usarlo:</strong> Ideal para aplicaciones empresariales y grandes proyectos que requieren una arquitectura robusta y estructurada.</p>
  
      <h3>5. Next.js</h3>
      <p><strong>Características:</strong></p>
      <ul>
        <li><strong>Renderizado del lado del servidor (SSR):</strong> Mejora el SEO y la velocidad de carga inicial de la aplicación.</li>
        <li><strong>Generación de sitios estáticos:</strong> Perfecto para blogs y sitios informativos que requieren un rendimiento óptimo.</li>
        <li><strong>Soporte para API:</strong> Facilita la creación de endpoints dentro de la misma estructura de la aplicación.</li>
      </ul>
      <p><strong>Cuándo usarlo:</strong> Ideal para aplicaciones que requieren un buen SEO y un rendimiento optimizado, como tiendas en línea y portales informativos.</p>
  
      <h3>6. Nuxt.js</h3>
      <p><strong>Características:</strong></p>
      <ul>
        <li><strong>SSR y generación de sitios estáticos:</strong> Al igual que Next.js, pero para aplicaciones Vue.</li>
        <li><strong>Estructura de carpetas intuitiva:</strong> Facilita la organización del proyecto.</li>
        <li><strong>Facilidad para la configuración:</strong> Proporciona una serie de convenciones que simplifican el desarrollo.</li>
      </ul>
      <p><strong>Cuándo usarlo:</strong> Para proyectos que buscan las ventajas del SSR y la simplicidad de Vue.</p>
  
      
      <p>La elección de la tecnología adecuada depende de diversos factores como la complejidad del proyecto, la experiencia del equipo y las necesidades específicas del cliente. React y Angular son excelentes para proyectos grandes, mientras que Vue y Svelte pueden ser ideales para desarrollos más rápidos y simples. Next.js y Nuxt.js son opciones sobresalientes cuando se necesita optimizar el rendimiento y el SEO. Considera estos aspectos al tomar tu decisión para asegurar el éxito de tu proyecto.</p>
    `,
  },
  //crear-api-publica-gratis-productos
  {
    slug: 'crear-api-publica-gratis-productos',
    title: 'Cómo crear una API pública y gratuita para tus productos',
    image: '/blog/api-publica-productos.webp',
    date: '2024-09-27',
    tags: ['API', 'Node.js', 'Express', 'MongoDB', 'Fullstack'],
    type: 'tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/profile.webp',
    },
    readingTime: '10 min',
    excerpt:
      'Aprende a crear una API pública y gratuita para tus productos utilizando Node.js, Express y MongoDB. Ideal para proyectos que quieran compartir información de manera abierta.',
    content: `
      <h2>Cómo crear una API pública y gratuita para tus productos</h2>
      <p>¿Quieres compartir tu catálogo de productos con el mundo? En este tutorial te mostraré cómo crear una <strong>API pública y gratuita</strong> utilizando <strong>Node.js</strong>, <strong>Express</strong> y <strong>MongoDB</strong>. Aprenderás cómo estructurar tu API, conectar una base de datos, y finalmente desplegarla para que cualquiera pueda acceder a ella desde cualquier lugar del mundo.</p>

      <h3>¿Por qué crear una API pública?</h3>
      <p>Las APIs públicas permiten compartir datos de manera abierta, lo que es útil si quieres que otros desarrolladores, aplicaciones o servicios puedan acceder a tu catálogo de productos para integrarlos en sus proyectos o simplemente para proporcionar información a los usuarios de forma dinámica.</p>

      <h3>Requisitos previos</h3>
      <p>Para seguir este tutorial, necesitarás lo siguiente:</p>
      <ul>
        <li><strong>Node.js</strong> y <strong>npm</strong> instalados en tu máquina.</li>
        <li>Una cuenta de <a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas</a> (es gratuito y fácil de usar).</li>
        <li>Una plataforma gratuita para desplegar la API como <strong>Heroku</strong> o <strong>Render</strong>.</li>
      </ul>

      <h3>1. Definir la estructura de tus productos</h3>
      <p>Antes de comenzar a escribir código, define qué datos quieres compartir a través de tu API. Aquí tienes un ejemplo de cómo podría lucir un producto en tu base de datos:</p>
      <pre><code class="language-json">
  {
    "nombre": "Producto X",
    "precio": 10.99,
    "descripción": "Este es un producto de ejemplo.",
    "categoría": "Alimentos"
  }
      </code></pre>

      <p>Este ejemplo contiene un nombre, precio, descripción y categoría, pero puedes añadir más campos según las necesidades de tu aplicación.</p>

      <h3>2. Configurar MongoDB Atlas</h3>
      <p>MongoDB Atlas es una solución gratuita que te permite crear y gestionar bases de datos en la nube. Sigue estos pasos para configurar tu base de datos:</p>
      <ol>
        <li>Regístrate en <a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas</a>.</li>
        <li>Crea un nuevo cluster y establece las credenciales de usuario.</li>
        <li>Crea una base de datos llamada <code>tienda</code> y una colección llamada <code>productos</code>.</li>
        <li>Copia el URI de conexión, lo necesitarás para conectar tu API.</li>
      </ol>

      <h3>3. Crear una API con Node.js y Express</h3>
      <p>Una vez configurada la base de datos, el siguiente paso es construir la API. Vamos a usar <strong>Node.js</strong> con <strong>Express</strong> y <strong>Mongoose</strong> (para conectarnos a MongoDB).</p>

      <p>Primero, crea un nuevo proyecto e instala las dependencias necesarias:</p>
      <pre><code class="language-bash">
  mkdir api-productos && cd api-productos
  npm init -y
  npm install express mongoose cors
      </code></pre>

      <p>A continuación, crea el archivo <code>index.js</code> que contendrá el código de tu API:</p>
      <pre><code class="language-javascript">
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');

  const app = express();
  const port = process.env.PORT || 3000;

  // Conexión a MongoDB
  mongoose.connect('TU_URI_DE_MONGO_ATLAS', { useNewUrlParser: true, useUnifiedTopology: true });

  // Definición del esquema y modelo de producto
  const productSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    descripción: String,
    categoría: String,
  });

  const Product = mongoose.model('Product', productSchema);

  // Configuración de CORS y parsing de JSON
  app.use(cors());
  app.use(express.json());

  // Ruta para obtener todos los productos
  app.get('/productos', async (req, res) => {
    try {
      const productos = await Product.find();
      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });

  // Iniciar el servidor
  app.listen(port, () => {
    console.log(\`API escuchando en http://localhost:\${port}\`);
  });
      </code></pre>

      <p>Este código define una API simple que expone una lista de productos almacenados en MongoDB. La ruta <code>/productos</code> devolverá todos los productos disponibles en la base de datos.</p>

      <h3>4. Desplegar la API</h3>
      <p>Ahora que la API está lista, es momento de hacerla pública. Puedes desplegarla de forma gratuita utilizando plataformas como <strong>Heroku</strong>, <strong>Render</strong> o <strong>Railway</strong>. Aquí te muestro cómo hacerlo en <strong>Render</strong>:</p>
      <ol>
        <li>Inicia sesión en <a href="https://render.com">Render</a>.</li>
        <li>Crea un nuevo proyecto, seleccionando tu repositorio de GitHub donde tienes el código de tu API.</li>
        <li>Render se encargará de crear un servidor y asignarle una URL pública a tu API.</li>
      </ol>

      <h3>5. Hacer pública la API y permitir acceso desde cualquier origen</h3>
      <p>Para que cualquier aplicación pueda consumir tu API, debes configurar <strong>CORS</strong> adecuadamente. Ya lo hicimos previamente usando el middleware <code>cors</code>, lo que permite a cualquier origen hacer solicitudes a tu servidor:</p>
      <pre><code class="language-javascript">
  const cors = require('cors');
  app.use(cors());
      </code></pre>

      <h3>6. Probar la API</h3>
      <p>Con la API desplegada, abre la URL pública que Render te asignó en el navegador. Si accedes a la ruta <code>/productos</code>, deberías ver el listado de tus productos en formato JSON.</p>
    `,
  },
  //migraciones-postgresql-sequelize
  {
    slug: 'migraciones-postgresql-sequelize',
    title: 'Manejando Migraciones en PostgreSQL con Sequelize',
    image: '/blog/migraciones-postgresql.webp',
    date: '2024-09-26',
    tags: ['PostgreSQL', 'Migraciones', 'Sequelize', 'Colaboración'],
    type: 'tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/camilo-avatar.webp',
    },
    readingTime: '8 min',
    excerpt:
      'Aprende a manejar migraciones en PostgreSQL utilizando Sequelize, asegurando que los cambios en el esquema de la base de datos sean consistentes entre los miembros del equipo.',
    content: `
      <h2>Manejando Migraciones en PostgreSQL con Sequelize</h2>
      <p>Cuando trabajas en un proyecto colaborativo con PostgreSQL, es crucial que todos los desarrolladores mantengan el esquema de la base de datos actualizado de manera uniforme. Una herramienta eficaz para esto es Sequelize, un ORM (Object-Relational Mapping) que te permite gestionar migraciones en tu base de datos. En este artículo, aprenderás a crear, ejecutar y revertir migraciones usando Sequelize en un proyecto de equipo.</p>

      <h3>1. Instalación de Sequelize CLI</h3>
      <p>Para comenzar a trabajar con migraciones, necesitas instalar Sequelize y Sequelize CLI si aún no lo has hecho. Esto te permitirá gestionar migraciones fácilmente desde la línea de comandos.</p>

      <pre><code class="language-bash">
  # Instalar Sequelize y PostgreSQL como dependencia
  npm install sequelize pg pg-hstore

  # Instalar Sequelize CLI de manera global (o puedes agregarlo como devDependency)
  npm install --save-dev sequelize-cli
      </code></pre>

      <p>Con esto, tendrás Sequelize y PostgreSQL listos para usar, y la CLI te permitirá crear y aplicar migraciones.</p>

      <h3>2. Configurar Sequelize</h3>
      <p>El siguiente paso es configurar Sequelize para que funcione con tu base de datos PostgreSQL. Utiliza la CLI para inicializar el proyecto con los archivos de configuración necesarios.</p>

      <pre><code class="language-bash">
  # Inicializar Sequelize en el proyecto
  npx sequelize-cli init
      </code></pre>

      <p>Este comando creará una estructura de carpetas con un archivo <code>config.json</code> que necesitarás editar para que apunte a tu base de datos PostgreSQL.</p>

      <h3>3. Configurar el archivo config.json</h3>
      <p>Dentro del archivo <code>config/config.json</code>, configura tus credenciales de la base de datos para que Sequelize pueda conectarse correctamente a tu instancia de PostgreSQL.</p>

      <pre><code class="language-json">
  {
    "development": {
      "username": "tu_usuario",
      "password": "tu_contraseña",
      "database": "nombre_base_de_datos",
      "host": "127.0.0.1",
      "dialect": "postgres"
    },
    "test": {
      "username": "tu_usuario",
      "password": "tu_contraseña",
      "database": "nombre_base_de_datos_test",
      "host": "127.0.0.1",
      "dialect": "postgres"
    },
    "production": {
      "username": "tu_usuario",
      "password": "tu_contraseña",
      "database": "nombre_base_de_datos_production",
      "host": "127.0.0.1",
      "dialect": "postgres"
    }
  }
      </code></pre>

      <p>Asegúrate de proporcionar la información correcta para los entornos de desarrollo, pruebas y producción.</p>

      <h3>4. Crear una migración</h3>
      <p>Las migraciones son cambios en el esquema de la base de datos que quieres aplicar de manera uniforme. Para crear una migración, usa el siguiente comando:</p>

      <pre><code class="language-bash">
  # Crear una nueva migración
  npx sequelize-cli migration:generate --name nombre-de-la-migracion
      </code></pre>

      <p>Esto generará un archivo de migración dentro de la carpeta <code>migrations/</code>, donde puedes definir los cambios que deseas hacer en el esquema de la base de datos, como agregar o eliminar columnas, crear tablas, etc.</p>

      <h3>5. Ejecutar migraciones</h3>
      <p>Una vez que hayas definido la migración, puedes ejecutarla para aplicar los cambios en la base de datos. Esto asegura que todos los desarrolladores en el proyecto apliquen los mismos cambios en el esquema.</p>

      <pre><code class="language-bash">
  # Ejecutar todas las migraciones pendientes
  npx sequelize-cli db:migrate
      </code></pre>

      <p>Este comando aplicará todas las migraciones que aún no se han ejecutado en la base de datos. De esta forma, tu base de datos local estará sincronizada con las últimas actualizaciones del proyecto.</p>

      <h3>6. Revertir migraciones</h3>
      <p>Si cometiste un error en una migración o deseas revertir un cambio, puedes hacerlo fácilmente usando el siguiente comando:</p>

      <pre><code class="language-bash">
  # Revertir la última migración
  npx sequelize-cli db:migrate:undo
      </code></pre>

      <p>Este comando deshace la última migración que fue aplicada. Si necesitas revertir múltiples migraciones, puedes ejecutar el comando varias veces o usar:</p>

      <pre><code class="language-bash">
  # Revertir todas las migraciones
  npx sequelize-cli db:migrate:undo:all
      </code></pre>

      <p>Esto revertirá todas las migraciones aplicadas en la base de datos.</p>

      <h3>7. Compartir migraciones en proyectos colaborativos</h3>
      <p>En un entorno colaborativo, las migraciones deben estar versionadas en tu sistema de control de versiones (como Git). Cuando un miembro del equipo introduce una nueva migración, el resto del equipo puede actualizar sus bases de datos locales ejecutando:</p>

      <pre><code class="language-bash">
  git pull origin main
  npx sequelize-cli db:migrate
      </code></pre>

      <p>De esta manera, todos los miembros del equipo tendrán el esquema de base de datos actualizado, evitando conflictos entre diferentes versiones de la base de datos.</p>

      
      `,
  },
  //backups-restauracion-postgresql
  {
    slug: 'backups-restauracion-postgresql',
    title: 'Backups y restauración en PostgreSQL para proyectos colaborativos',
    image: '/blog/backups-postgresql.webp',
    date: '2024-09-26',
    tags: ['PostgreSQL', 'Backups', 'Restauración', 'Seguridad'],
    type: 'tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/camilo-avatar.webp',
    },
    readingTime: '7 min',
    excerpt:
      'Asegura la integridad de tu base de datos en PostgreSQL aprendiendo cómo realizar backups regulares y restauraciones en caso de fallos.',
    content: `
      <h2>Backups y restauración en PostgreSQL para proyectos colaborativos</h2>
      <p>En cualquier proyecto colaborativo, mantener copias de seguridad regulares de la base de datos es esencial para evitar pérdidas de datos ante fallos inesperados. PostgreSQL ofrece varias maneras de realizar backups y restaurar los datos en caso necesario. En este artículo, aprenderás cómo realizar backups automáticos y manuales, así como los pasos para restaurar tu base de datos en caso de emergencias.</p>

      <h3>1. Realizar un backup manual con pg_dump</h3>
      <p>PostgreSQL incluye la herramienta <code>pg_dump</code> para hacer backups de la base de datos. Este comando genera un archivo de volcado que puede usarse para restaurar la base de datos más adelante.</p>

      <pre><code class="language-bash">
  # Crear un backup de una base de datos específica
  pg_dump -U nombre_usuario -F c -b -v -f /ruta/del/backup/base_de_datos.backup nombre_base_de_datos

  # Parámetros:
  # -U: nombre de usuario
  # -F: formato de salida (c es para formato custom)
  # -b: incluir datos binarios
  # -v: modo verbose (muestra detalles)
  # -f: especifica el archivo de salida
      </code></pre>

      <p>Este comando crea un archivo con un volcado de la base de datos, el cual se puede almacenar de manera segura. Es recomendable guardar los backups en una ubicación segura y realizar backups periódicos, especialmente en entornos de producción.</p>

      <h3>2. Restaurar la base de datos desde un backup</h3>
      <p>En caso de necesitar restaurar la base de datos a partir de un backup, utilizamos el comando <code>pg_restore</code>. Asegúrate de que el archivo de backup esté accesible y sigue los siguientes pasos para realizar la restauración:</p>

      <pre><code class="language-bash">
  # Restaurar una base de datos desde un backup
  pg_restore -U nombre_usuario -d nombre_base_de_datos -v /ruta/del/backup/base_de_datos.backup

  # Parámetros:
  # -U: nombre de usuario
  # -d: nombre de la base de datos donde se restaurará
  # -v: modo verbose para más detalles
      </code></pre>

      <p>Este comando restaurará los datos desde el archivo de volcado y reinsertará toda la información en la base de datos. Ten en cuenta que la base de datos debe existir antes de realizar la restauración, pero puede estar vacía.</p>

      <h3>3. Configuración de backups automáticos con cron jobs</h3>
      <p>Para evitar realizar backups manuales constantemente, puedes automatizar el proceso utilizando cron jobs en sistemas Linux o macOS. Esto permite que se ejecuten backups periódicamente, por ejemplo, una vez al día o a la semana.</p>

      <pre><code class="language-bash">
  # Editar el cron jobs
  crontab -e

  # Agregar una línea para hacer un backup todos los días a la medianoche
  0 0 * * * pg_dump -U nombre_usuario -F c -b -v -f /ruta/del/backup/base_de_datos_$(date +\\%F).backup nombre_base_de_datos
      </code></pre>

      <p>En este ejemplo, estamos configurando un cron job que realiza un backup diario a la medianoche. El nombre del archivo de backup incluye la fecha actual para identificar fácilmente los diferentes backups.</p>

      <h3>4. Estrategias de retención de backups</h3>
      <p>A medida que los backups se generan automáticamente, es importante tener una estrategia para retenerlos y eliminar aquellos que ya no son necesarios. Puedes automatizar la eliminación de backups antiguos mediante otro cron job.</p>

      <pre><code class="language-bash">
  # Eliminar backups antiguos de más de 7 días
  0 1 * * * find /ruta/del/backup/ -type f -name "*.backup" -mtime +7 -exec rm {} \\;
      </code></pre>

      <p>Este comando eliminará cualquier archivo de backup que tenga más de 7 días, asegurando que no se acumulen archivos innecesarios y se mantenga espacio disponible en el servidor.</p>

      <h3>5. Realizar backups en la nube</h3>
      <p>Otra opción para almacenar los backups de manera segura es utilizar servicios en la nube como Amazon S3, Google Cloud Storage o Azure Blob Storage. Después de realizar el backup, puedes subir el archivo a estos servicios de almacenamiento para garantizar su seguridad y accesibilidad.</p>

      <pre><code class="language-bash">
  # Subir un backup a Amazon S3 usando AWS CLI
  aws s3 cp /ruta/del/backup/base_de_datos.backup s3://nombre-del-bucket/base_de_datos.backup
      </code></pre>

      <p>Al utilizar almacenamiento en la nube, puedes acceder a los backups desde cualquier lugar y tener una copia adicional de seguridad en caso de que el servidor local falle.</p>

      
      `,
  },
  //gestion-roles-permisos-postgresql
  {
    slug: 'gestion-roles-permisos-postgresql',
    title:
      'Gestión de roles y permisos en PostgreSQL para proyectos colaborativos',
    image: '/blog/gestion-roles-permisos.webp',
    date: '2024-09-26',
    tags: ['PostgreSQL', 'Roles', 'Permisos', 'Seguridad'],
    type: 'tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/camilo-avatar.webp',
    },
    readingTime: '6 min',
    excerpt:
      'Aprende cómo gestionar roles y permisos en PostgreSQL para asegurar la seguridad y control de acceso en proyectos donde múltiples usuarios colaboran.',
    content: `
      <h2>Gestión de roles y permisos en PostgreSQL para proyectos colaborativos</h2>
      <p>En un entorno de desarrollo colaborativo, es fundamental gestionar los roles y permisos de los diferentes usuarios que interactúan con la base de datos. PostgreSQL proporciona un sistema robusto para manejar roles y asegurar que cada miembro del equipo tenga solo el acceso necesario para realizar su trabajo. En este artículo, aprenderás cómo implementar roles y permisos de forma efectiva en PostgreSQL.</p>

      <h3>1. Creación de roles en PostgreSQL</h3>
      <p>PostgreSQL maneja el acceso a la base de datos mediante roles, que pueden ser asignados a usuarios. Para crear un nuevo rol en PostgreSQL, utilizamos el comando <code>CREATE ROLE</code>. Puedes definir si un rol puede iniciar sesión, crear bases de datos o modificar esquemas, entre otras configuraciones.</p>

      <pre><code class="language-sql">
  -- Crear un rol básico
  CREATE ROLE desarrollador LOGIN PASSWORD 'password123';
  
  -- Crear un rol con permisos administrativos
  CREATE ROLE admin WITH LOGIN SUPERUSER PASSWORD 'adminpassword';
      </code></pre>

      <p>El primer rol <code>desarrollador</code> solo puede iniciar sesión y trabajar en la base de datos, mientras que el rol <code>admin</code> tiene permisos de superusuario.</p>

      <h3>2. Asignación de permisos a roles</h3>
      <p>Una vez creados los roles, podemos otorgar permisos específicos para controlar lo que cada rol puede hacer. En PostgreSQL, los permisos se gestionan a nivel de base de datos, tabla o columna. Aquí algunos ejemplos:</p>

      <pre><code class="language-sql">
  -- Otorgar permiso de SELECT a una tabla específica
  GRANT SELECT ON tabla_usuarios TO desarrollador;

  -- Permitir inserciones y actualizaciones en una tabla
  GRANT INSERT, UPDATE ON tabla_ordenes TO desarrollador;

  -- Revocar un permiso otorgado anteriormente
  REVOKE UPDATE ON tabla_usuarios FROM desarrollador;
      </code></pre>

      <p>Esto permite a cada miembro del equipo acceder solo a las tablas que necesitan, manteniendo la base de datos segura.</p>

      <h3>3. Uso de grupos de roles</h3>
      <p>En lugar de asignar permisos individuales a cada usuario, puedes crear grupos de roles para administrar los permisos de forma más eficiente. Un grupo de roles puede representar un conjunto de permisos que se asignan a varios usuarios.</p>

      <pre><code class="language-sql">
  -- Crear un rol de grupo para desarrolladores
  CREATE ROLE grupo_desarrolladores;

  -- Asignar permisos al grupo
  GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA public TO grupo_desarrolladores;

  -- Añadir usuarios al grupo
  GRANT grupo_desarrolladores TO desarrollador1, desarrollador2;
      </code></pre>

      <p>Así, todos los usuarios en el grupo heredan los permisos asignados al rol del grupo, lo que simplifica la gestión de acceso.</p>

      <h3>4. Gestión de permisos para ambientes de producción</h3>
      <p>Es fundamental restringir el acceso a la base de datos de producción. Solo roles específicos, como los administradores o ingenieros de infraestructura, deberían tener permisos para modificar datos en producción. Otros roles, como los desarrolladores, deberían tener solo acceso de lectura.</p>

      <pre><code class="language-sql">
  -- Otorgar acceso de solo lectura en producción a un rol de desarrollador
  GRANT SELECT ON ALL TABLES IN SCHEMA public TO desarrollador;

  -- Revocar cualquier permiso de modificación
  REVOKE INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM desarrollador;
      </code></pre>

      <p>Esto garantiza que los cambios solo se realicen de manera controlada, evitando errores accidentales en producción.</p>

      <h3>5. Auditoría y monitoreo de actividad</h3>
      <p>Para asegurarte de que los permisos asignados se utilicen adecuadamente, puedes habilitar la auditoría de eventos en PostgreSQL. Esto te permitirá rastrear qué acciones realizan los usuarios en la base de datos y detectar posibles problemas de seguridad.</p>

      <p>Una opción es usar extensiones como <code>pgAudit</code>, que proporciona registros detallados de las operaciones que se ejecutan en la base de datos.</p>

      <pre><code class="language-sql">
  -- Instalar la extensión pgAudit
  CREATE EXTENSION pgaudit;

  -- Configurar auditoría para todas las operaciones
  ALTER SYSTEM SET pgaudit.log = 'all';
      </code></pre>

      <p>De esta forma, puedes revisar los logs de auditoría y detectar cualquier acceso no autorizado o acciones sospechosas.</p>

      
      `,
  },
  //buenas-practicas-proyecto-postgresql
  {
    slug: 'buenas-practicas-proyecto-postgresql',
    title:
      'Buenas prácticas para mantener el desarrollo de base de datos en un proyecto colaborativo con PostgreSQL',
    excerpt:
      'Descubre cómo implementar estrategias y herramientas clave para asegurar un desarrollo eficiente en un proyecto que utiliza PostgreSQL en equipo.',
    image: '/blog/buenas-practicas-postgresql.webp',
    date: '2024-09-26',
    tags: ['PostgreSQL', 'Colaboración', 'Migraciones', 'CI/CD'],
    type: 'tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/camilo-avatar.webp',
    },
    readingTime: '8 min',
    content: `
      <h2>Buenas prácticas para mantener el desarrollo de base de datos en un proyecto colaborativo con PostgreSQL</h2>
      <p>Una base de datos es una parte crucial en el desarrollo de cualquier aplicación. Cuando varios desarrolladores trabajan en un mismo proyecto que utiliza PostgreSQL, es necesario seguir una serie de buenas prácticas para evitar problemas de sincronización, datos inconsistentes o errores en producción. Aquí te mostramos algunos pasos clave para mantener el control de tu base de datos en equipo.</p>

      <h3>1. Definir una estrategia de migración de base de datos</h3>
      <p>Uno de los primeros pasos es establecer cómo se manejarán los cambios en el esquema de la base de datos. Para ello, se recomienda utilizar una herramienta de migración de base de datos que permita aplicar los cambios gradualmente, de forma controlada.</p>

      <p>Herramientas como <code>Knex.js</code> o <code>Sequelize</code> te permiten crear y aplicar migraciones fácilmente. Cada vez que necesites agregar o modificar una tabla, simplemente creas un nuevo archivo de migración y lo compartes con tu equipo.</p>

      <pre><code class="language-bash">
  # Crear una nueva migración
  npx knex migrate:make añadir-columna-usuarios

  # Ejecutar todas las migraciones
  npx knex migrate:latest
      </code></pre>

      <p>De esta forma, todo el equipo puede mantener el mismo estado de la base de datos local sin perder consistencia.</p>

      <h3>2. Realizar backups regulares de la base de datos</h3>
      <p>Para evitar pérdida de datos, es fundamental establecer una política de respaldo regular. PostgreSQL permite realizar backups de la base de datos usando herramientas como <code>pg_dump</code>. Dependiendo de tu infraestructura, los backups pueden realizarse de manera automatizada en servidores de almacenamiento en la nube o de manera manual.</p>

      <pre><code class="language-bash">
  # Realizar un backup completo de la base de datos
  pg_dump -U usuario -F c -b -v -f "/ruta/donde/guardar/backup.backup" nombre_de_base_de_datos
      </code></pre>

      <p>Automatizar estos backups es una excelente opción, especialmente en entornos de producción.</p>

      <h3>3. Uso de bases de datos separadas para desarrollo, pruebas y producción</h3>
      <p>Es importante que tu equipo use bases de datos separadas para los diferentes entornos (desarrollo, pruebas y producción). Cada miembro del equipo debería trabajar con una base de datos local para el desarrollo diario, mientras que las pruebas automatizadas deben ejecutarse en un entorno aislado. La base de datos de producción debe ser estrictamente controlada, y solo los cambios verificados deben aplicarse en ella.</p>

      <p>Una estructura común podría ser la siguiente:</p>
      <ul>
        <li><strong>Desarrollo:</strong> Cada miembro del equipo tiene su propia base de datos local.</li>
        <li><strong>Pruebas:</strong> Base de datos separada utilizada únicamente para ejecutar pruebas automatizadas.</li>
        <li><strong>Producción:</strong> La base de datos que contiene los datos en vivo, con acceso restringido y cambios controlados.</li>
      </ul>

      <h3>4. Automatización de despliegue de cambios con CI/CD</h3>
      <p>La automatización del despliegue de cambios es esencial para garantizar que cada nueva característica se despliegue de manera segura. Usar pipelines de CI/CD te permite automatizar el proceso de aplicar migraciones en un entorno de pruebas o producción, ejecutar pruebas y verificar que todo funcione correctamente antes de lanzar una nueva versión.</p>

      <p>Un pipeline básico en una herramienta como GitHub Actions, CircleCI, o GitLab CI podría incluir los siguientes pasos:</p>
      <ol>
        <li>Ejecutar migraciones de base de datos.</li>
        <li>Correr pruebas unitarias y de integración.</li>
        <li>Verificar la integridad de los datos después de aplicar los cambios.</li>
        <li>Aplicar cambios en producción solo si todas las pruebas pasan.</li>
      </ol>

      <pre><code class="language-yaml">
  jobs:
    deploy:
      steps:
        - name: Correr migraciones en PostgreSQL
          run: |
            npx knex migrate:latest
        - name: Ejecutar pruebas
          run: npm test
        - name: Verificar integridad de datos
          run: |
            # comandos para verificar integridad
      </code></pre>

      <p>Esto ayuda a evitar errores humanos y garantizar que los cambios se aplican de manera controlada y predecible.</p>

      <h3>5. Monitoreo y alertas para la base de datos</h3>
      <p>Una vez que tu aplicación está en producción, es crucial monitorear el rendimiento de la base de datos y configurar alertas para detectar problemas antes de que afecten a los usuarios finales. Herramientas como <a href="https://www.datadoghq.com/postgresql-monitoring/" target="_blank" rel="noopener noreferrer">Datadog</a> o <a href="https://www.zabbix.com/" target="_blank" rel="noopener noreferrer">Zabbix</a> te permiten monitorear métricas clave como el uso de CPU, memoria, conexiones activas y tiempos de respuesta.</p>

      
      `,
  },
  //colaborar-proyecto-postgresql
  {
    slug: 'colaborar-proyecto-postgresql',
    title: 'Cómo trabajar de manera colaborativa en un proyecto con PostgreSQL',
    excerpt:
      'Aprende a colaborar en un proyecto utilizando PostgreSQL, Git, y estrategias de manejo de base de datos en equipo.',
    image: '/blog/postgresql-collaboration.webp',
    date: '2024-09-26',
    tags: ['PostgreSQL', 'Colaboración', 'Git', 'Backend'],
    type: 'tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/camilo-avatar.webp',
    },
    readingTime: '10 min',
    content: `
      <h2>Cómo trabajar de manera colaborativa en un proyecto con PostgreSQL</h2>
      <p>Cuando trabajas en equipo en un proyecto que utiliza PostgreSQL, necesitas una estrategia clara para compartir el esquema de la base de datos, mantener la consistencia entre los entornos y colaborar de manera eficiente. En este artículo, exploramos las mejores prácticas para colaborar en un proyecto con PostgreSQL.</p>
      
      <h3>1. Usar Git para el control de versiones del código</h3>
      <p>La clave para la colaboración en cualquier proyecto de software es el control de versiones. Utilizando Git, todo tu equipo puede trabajar en el mismo código sin conflictos. Cada miembro puede trabajar en su propia rama, hacer commits de sus cambios, y luego fusionarlos en la rama principal cuando estén listos.</p>

      <pre><code class="language-bash">
  # Clonar el repositorio del proyecto
  git clone https://github.com/tu-repositorio/proyecto.git

  # Crear una nueva rama para tu trabajo
  git checkout -b feature/mi-nueva-caracteristica

  # Hacer cambios y subirlos
  git add .
  git commit -m "Añadir nueva característica"
  git push origin feature/mi-nueva-caracteristica
      </code></pre>

      <p>Cuando estés listo para compartir tu trabajo con el equipo, puedes abrir un Pull Request (PR) en la plataforma de Git que estés usando (GitHub, GitLab, Bitbucket, etc.) para que el resto del equipo revise tus cambios antes de fusionarlos.</p>

      <h3>2. Compartir el esquema de la base de datos con archivos de migración</h3>
      <p>Una de las mejores formas de mantener sincronizados los cambios en la base de datos es usar archivos de migración. Herramientas como <code>Knex.js</code> o <code>sequelize</code> permiten crear scripts para modificar el esquema de la base de datos de manera incremental.</p>

      <p>Cada vez que un miembro del equipo realice cambios en la estructura de la base de datos (como crear nuevas tablas o modificar columnas), debe generar un archivo de migración. Luego, el equipo puede ejecutar esas migraciones para aplicar los mismos cambios en su propia base de datos.</p>

      <pre><code class="language-bash">
  # Crear una nueva migración usando Knex.js
  npx knex migrate:make crear-tabla-usuarios

  # Correr las migraciones en tu base de datos
  npx knex migrate:latest
      </code></pre>

      <p>Al versionar estos archivos de migración en Git, todos los miembros del equipo pueden mantenerse actualizados con los cambios en la base de datos sin tener que recrear el esquema manualmente.</p>

      <h3>3. Configurar un entorno de desarrollo compartido</h3>
      <p>Si tu equipo está trabajando en una misma base de datos PostgreSQL alojada en un servidor remoto o en un contenedor Docker compartido, asegúrate de que todos los miembros tengan acceso adecuado. Para proyectos más grandes, puedes considerar el uso de servicios gestionados como Heroku o AWS RDS para alojar tu base de datos de desarrollo.</p>

      <p>Alternativamente, si cada miembro del equipo está trabajando localmente, puedes usar una configuración Docker como la que vimos en pasos anteriores. Los entornos de desarrollo locales también pueden mantenerse sincronizados con los cambios de migraciones.</p>

      <h3>4. Usar un archivo <code>.env</code> para las credenciales de base de datos</h3>
      <p>En un proyecto colaborativo, cada miembro del equipo puede tener configuraciones diferentes en su entorno de desarrollo local. Para evitar exponer credenciales sensibles como el usuario y la contraseña de la base de datos en el código, es una buena práctica usar variables de entorno en un archivo <code>.env</code>.</p>

      <p>En tu archivo <code>.env</code>, puedes almacenar las credenciales de PostgreSQL de manera segura:</p>

      <pre><code class="language-bash">
  # .env
  DB_USER=miusuario
  DB_PASSWORD=mipassword
  DB_HOST=localhost
  DB_PORT=5432
  DB_DATABASE=midatabase
      </code></pre>

      <p>Luego, puedes usar un paquete como <code>dotenv</code> en Node.js para cargar estas variables en tu aplicación:</p>

      <pre><code class="language-javascript">
  require('dotenv').config();

  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });
      </code></pre>

      <p>Recuerda que el archivo <code>.env</code> no debe subirse al repositorio de Git. Añade una línea en tu archivo <code>.gitignore</code> para asegurarte de que el archivo quede excluido:</p>

      <pre><code class="language-bash">
  # Ignorar archivos .env
  .env
      </code></pre>

      <h3>5. Comunicación y sincronización constante</h3>
      <p>Finalmente, es crucial tener una buena comunicación dentro del equipo. Usar herramientas de comunicación como Slack, Microsoft Teams, o Discord puede facilitar la sincronización entre los miembros. También es recomendable hacer reuniones periódicas para revisar el progreso y resolver bloqueos en conjunto.</p>

      <p>Si todos siguen estas buenas prácticas, podrán mantener un flujo de trabajo eficiente y evitar conflictos tanto en el código como en la base de datos.</p>

      
      `,
  },
  //integrar-postgresql-con-react
  {
    slug: 'integrar-postgresql-con-react',
    title: 'Cómo integrar PostgreSQL con una aplicación React',
    image: '/blog/react-postgresql.webp',
    date: '2024-09-26',
    tags: ['React', 'PostgreSQL', 'API', 'Node.js', 'Fullstack'],
    type: 'tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/camilo-avatar.webp',
    },
    readingTime: '8 min',
    excerpt:
      'Aprende a conectar tu aplicación React con una base de datos PostgreSQL utilizando una API REST.',
    content: `
      <h2>Cómo integrar PostgreSQL con una aplicación React</h2>
      <p>En este tutorial, vamos a conectar una base de datos PostgreSQL con una aplicación React a través de una API REST. Este enfoque te permite separar el frontend (React) del backend (Node.js con PostgreSQL), lo que facilita la escalabilidad y el mantenimiento de tu aplicación.</p>

      <h3>Requisitos</h3>
      <ul>
        <li>Una API backend (Node.js con Express y PostgreSQL)</li>
        <li>Un servidor PostgreSQL (puedes usar el contenedor Docker que configuramos en el paso anterior)</li>
        <li>React instalado en tu proyecto</li>
      </ul>

      <h3>1. Crear una API con Node.js y Express</h3>
      <p>Primero, necesitamos una API que actúe como intermediario entre nuestra base de datos PostgreSQL y la aplicación React. Si aún no lo has hecho, crea un nuevo proyecto de Node.js e instala <code>express</code> y <code>pg</code> para trabajar con PostgreSQL.</p>

      <pre><code class="language-bash">
  mkdir my-api && cd my-api
  npm init -y
  npm install express pg cors
      </code></pre>

      <p>Luego, crea un archivo <code>index.js</code> y añade el siguiente código para definir el servidor básico y una ruta que obtendrá datos desde PostgreSQL:</p>

      <pre><code class="language-javascript">
  const express = require('express');
  const cors = require('cors');
  const { Pool } = require('pg');

  const app = express();
  const pool = new Pool({
    user: 'myuser',
    host: 'localhost',
    database: 'mydatabase',
    password: 'mypassword',
    port: 5432
  });

  app.use(cors());
  app.use(express.json());

  app.get('/api/data', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM my_table');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener datos' });
    }
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(\`Servidor corriendo en el puerto \${PORT}\`));
      </code></pre>

      <p>Este servidor escuchará peticiones GET en <code>/api/data</code> y devolverá datos de la tabla <code>my_table</code> desde PostgreSQL.</p>

      <h3>2. Conectar React con la API</h3>
      <p>Una vez que nuestra API esté corriendo, podemos conectarla con nuestra aplicación React. Asegúrate de que tu aplicación React esté configurada con <code>create-react-app</code> o cualquier otra estructura de React que estés utilizando.</p>

      <p>Dentro de uno de los componentes de React, utiliza <code>fetch</code> o <code>axios</code> para hacer una solicitud a la API y obtener los datos desde PostgreSQL:</p>

      <pre><code class="language-javascript">
  import React, { useEffect, useState } from 'react';

  function DataComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5000/api/data')
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.error('Error al obtener datos:', error));
    }, []);

    return (
      <div>
        <h2>Datos desde PostgreSQL</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  export default DataComponent;
      </code></pre>

      <p>Este componente hace una petición a la API para obtener los datos y los renderiza en una lista.</p>

      <h3>3. Probar la integración</h3>
      <p>Para probar la integración, asegúrate de que tanto el servidor Node.js como tu aplicación React estén corriendo. Ejecuta los siguientes comandos en terminales separadas:</p>

      <pre><code class="language-bash">
  # Para el servidor Node.js
  npm start

  # Para la aplicación React
  npm start
      </code></pre>

      <p>Abre tu navegador en <code>http://localhost:3000</code> para ver la aplicación React, y verifica que los datos se están mostrando correctamente desde PostgreSQL.</p>

      
      `,
  },
  //control-versiones-bd-postgresql
  {
    slug: 'control-versiones-bd-postgresql',
    title: 'Control de versiones colaborativo en PostgreSQL con migraciones',
    excerpt:
      'Aprende a usar Knex.js o Sequelize para manejar migraciones y mantener tu base de datos sincronizada de manera colaborativa en proyectos con PostgreSQL.',
    content: `
        <h2>Control de versiones colaborativo en PostgreSQL con migraciones</h2>
        <p>Trabajar en equipo con una base de datos puede ser complicado, especialmente cuando necesitas mantener sincronizada su estructura entre varios desarrolladores. Usar migraciones es la clave para gestionar los cambios en la base de datos de manera eficiente y asegurarte de que todos los miembros del equipo estén en la misma página.</p>
  
        <h3>Pasos para configurar migraciones colaborativas</h3>
        <p>Vamos a cubrir dos herramientas populares: <strong>Knex.js</strong> y <strong>Sequelize</strong>, que te ayudarán a crear, aplicar y versionar migraciones en PostgreSQL, todo dentro de un flujo de trabajo colaborativo.</p>
  
        <h3>1. Instalación de Knex.js y Sequelize</h3>
        <p>Primero, necesitas instalar Knex.js o Sequelize junto con el driver de PostgreSQL (<code>pg</code>). Aquí te mostramos cómo hacerlo:</p>
  
        <pre><code class="language-bash">
    npm install knex pg
    npm install sequelize sequelize-cli pg
        </code></pre>
  
        <h3>2. Configuración de Knex.js para migraciones</h3>
        <p>Una vez instalado Knex, inicializa el archivo de configuración:</p>
  
        <pre><code class="language-bash">
    knex init
        </code></pre>
  
        <p>Esto generará un archivo <code>knexfile.js</code> donde podrás configurar los entornos <code>development</code> y <code>production</code> con tus credenciales de PostgreSQL.</p>
  
        <pre><code class="language-javascript">
    module.exports = {
      development: {
        client: 'pg',
        connection: {
          host: 'localhost',
          user: 'myuser',
          password: 'mypassword',
          database: 'mydatabase',
          port: 5432
        },
        migrations: {
          directory: './migrations'
        }
      },
      production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
          directory: './migrations'
        }
      }
    };
        </code></pre>
  
        <h3>3. Creación de una migración con Knex</h3>
        <p>Ahora que Knex está configurado, puedes crear una migración para modificar la estructura de la base de datos:</p>
  
        <pre><code class="language-bash">
    knex migrate:make create_users_table
        </code></pre>
  
        <p>Esto generará un archivo de migración en el directorio <code>migrations</code>. Aquí tienes un ejemplo que crea una tabla de usuarios:</p>
  
        <pre><code class="language-javascript">
    exports.up = function(knex) {
      return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('email').unique();
        table.timestamps(true, true);
      });
    };
  
    exports.down = function(knex) {
      return knex.schema.dropTable('users');
    };
        </code></pre>
  
        <h3>4. Ejecución de migraciones</h3>
        <p>Para aplicar las migraciones en la base de datos, usa el siguiente comando:</p>
  
        <pre><code class="language-bash">
    knex migrate:latest
        </code></pre>
  
        <p>Esto ejecutará todas las migraciones pendientes y mantendrá la estructura de la base de datos actualizada.</p>
  
        <h3>5. Uso de Sequelize para migraciones</h3>
        <p>Si prefieres Sequelize, sigue estos pasos después de instalarlo:</p>
  
        <pre><code class="language-bash">
    npx sequelize-cli init
        </code></pre>
  
        <p>Esto generará directorios para <code>models</code>, <code>migrations</code> y <code>seeders</code>. Luego, puedes configurar tu base de datos en <code>config/config.json</code>.</p>
  
        <pre><code class="language-javascript">
    {
      "development": {
        "username": "myuser",
        "password": "mypassword",
        "database": "mydatabase",
        "host": "127.0.0.1",
        "dialect": "postgres"
      }
    }
        </code></pre>
  
        <h3>6. Crear una migración con Sequelize</h3>
        <p>Genera una migración para crear la tabla de usuarios con el siguiente comando:</p>
  
        <pre><code class="language-bash">
    npx sequelize-cli migration:generate --name create-users-table
        </code></pre>
  
        <p>El archivo de migración generado puede verse así:</p>
  
        <pre><code class="language-javascript">
    module.exports = {
      up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          name: Sequelize.STRING,
          email: {
            type: Sequelize.STRING,
            unique: true
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
        });
      },
  
      down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
      }
    };
        </code></pre>
  
        <h3>7. Ejecutar migraciones en Sequelize</h3>
        <p>Finalmente, para aplicar las migraciones en tu base de datos, usa:</p>
  
        <pre><code class="language-bash">
    npx sequelize-cli db:migrate
        </code></pre>
  
        
        `,
    image: '/postgresql-migraciones.webp',
    date: '2024-09-26',
    tags: ['PostgreSQL', 'Knex.js', 'Sequelize', 'Migraciones', 'Colaboración'],
    type: 'tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/profile.webp',
    },
    readingTime: '7 min',
  },
  //configurar-docker-postgresql
  {
    slug: 'configurar-docker-postgresql',
    title: 'Cómo configurar PostgreSQL en Docker para desarrollo colaborativo',
    excerpt:
      'Aprende a configurar PostgreSQL en un contenedor Docker para facilitar el desarrollo y la colaboración en tu equipo de trabajo.',
    content: `
        <h2>Cómo configurar PostgreSQL en Docker para desarrollo colaborativo</h2>
        <p>Configurar PostgreSQL dentro de un contenedor Docker es una excelente manera de asegurar que todos los miembros de tu equipo de desarrollo trabajen con el mismo entorno, evitando problemas de compatibilidad. En este tutorial, te mostraremos cómo levantar una instancia de PostgreSQL usando Docker en solo unos pasos.</p>
  
        <h3>¿Por qué usar Docker?</h3>
        <p>Docker permite empaquetar y distribuir entornos completos, lo que asegura que cada miembro del equipo esté utilizando la misma versión de PostgreSQL y la misma configuración. Esto reduce problemas de "funciona en mi máquina" y facilita la integración continua.</p>
  
        <h3>Requisitos</h3>
        <ul>
          <li>Docker instalado en tu sistema (<a href="https://docs.docker.com/get-docker/" target="_blank" rel="noopener noreferrer">Guía oficial de instalación</a>)</li>
          <li>Una terminal o línea de comandos</li>
        </ul>
  
        <h3>1. Crear un archivo <code>docker-compose.yml</code></h3>
        <p>Para levantar una instancia de PostgreSQL de forma rápida y sencilla, utilizaremos Docker Compose. Primero, crea un archivo llamado <code>docker-compose.yml</code> en el directorio raíz de tu proyecto.</p>
  
        <pre><code class="language-yaml">
    version: '3.8'
    services:
      db:
        image: postgres:latest
        container_name: postgres-db
        environment:
          POSTGRES_USER: myuser
          POSTGRES_PASSWORD: mypassword
          POSTGRES_DB: mydatabase
        ports:
          - "5432:5432"
        volumes:
          - ./postgres-data:/var/lib/postgresql/data
        networks:
          - mynetwork
  
    networks:
      mynetwork:
        driver: bridge
        </code></pre>
  
        <p>Este archivo define un contenedor llamado <strong>postgres-db</strong> que usa la imagen oficial de PostgreSQL. También especifica variables de entorno como el nombre de usuario, contraseña y base de datos, que podrás modificar según tus necesidades.</p>
  
        <h3>2. Levantar el contenedor de PostgreSQL</h3>
        <p>Ahora que tienes tu <code>docker-compose.yml</code>, simplemente abre una terminal y ejecuta el siguiente comando para levantar el servicio de PostgreSQL:</p>
  
        <pre><code class="language-bash">
    docker-compose up -d
        </code></pre>
  
        <p>Este comando iniciará el contenedor en segundo plano (<code>-d</code> para "detached mode") y mapeará el puerto 5432 de tu máquina local al puerto 5432 del contenedor, lo que te permitirá conectarte a PostgreSQL desde tu entorno de desarrollo local.</p>
  
        <h3>3. Verificar que el contenedor esté corriendo</h3>
        <p>Para asegurarte de que todo funciona correctamente, puedes verificar el estado de los contenedores en ejecución con:</p>
  
        <pre><code class="language-bash">
    docker ps
        </code></pre>
  
        <p>Deberías ver algo como esto:</p>
  
        <pre><code class="language-bash">
    CONTAINER ID   IMAGE              COMMAND                  CREATED        STATUS         PORTS                    NAMES
    abc123def456   postgres:latest    "docker-entrypoint.s…"   2 minutes ago  Up 2 minutes   0.0.0.0:5432->5432/tcp   postgres-db
        </code></pre>
  
        <p>Si ves el contenedor <strong>postgres-db</strong> corriendo, ¡felicidades! Ahora tienes PostgreSQL en marcha con Docker.</p>
  
        <h3>4. Conectarse a PostgreSQL</h3>
        <p>Puedes conectarte a la base de datos utilizando cualquier cliente de PostgreSQL como <a href="https://www.pgadmin.org/" target="_blank" rel="noopener noreferrer">pgAdmin</a> o la línea de comandos de <code>psql</code>. Aquí tienes un ejemplo de cómo conectarte con la CLI de PostgreSQL:</p>
  
        <pre><code class="language-bash">
    psql -h localhost -p 5432 -U myuser -d mydatabase
        </code></pre>
  
        <p>Introduce la contraseña <code>mypassword</code> cuando te lo solicite, y estarás dentro del entorno de PostgreSQL en tu contenedor Docker.</p>
  
        <h3>5. Persistir datos con volúmenes</h3>
        <p>Observa que hemos incluido una configuración de <code>volumes</code> en el archivo <code>docker-compose.yml</code>. Esto asegura que los datos de tu base de datos se guarden fuera del contenedor, en el directorio <code>./postgres-data</code> de tu máquina. De esta forma, aunque detengas o elimines el contenedor, los datos se mantendrán.</p>
  
        
        `,
    image: '/docker-postgresql.webp',
    date: '2024-09-26',
    tags: ['PostgreSQL', 'Docker', 'DevOps', 'Colaboración'],
    type: 'tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/profile.webp',
    },
    readingTime: '6 min',
  },
  //crear-api-restful-nodejs
  {
    slug: 'crear-api-restful-nodejs',
    title: 'Cómo crear una API RESTful con Node.js',
    excerpt:
      'Aprende a crear una API RESTful utilizando Node.js y Express en este tutorial paso a paso.',
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
    image: '/APIRESTfulNode.webp',
    date: '2023-05-15',
    tags: ['Node.js', 'API', 'Express', 'Backend'],
    type: 'tutorial',
    author: {
      name: 'Camilo Escar',
      avatar: '/profile.webp',
    },
    readingTime: '5 min',
  },
  //introduccion-a-react-hooks
  {
    slug: 'introduccion-a-react-hooks',
    title: 'Introducción a React Hooks',
    excerpt:
      'Descubre cómo los React Hooks simplifican el desarrollo de componentes funcionales en React.',
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
    image: '/react-hooks.webp',
    date: '2023-06-01',
    tags: ['React', 'JavaScript', 'Hooks', 'Frontend'],
    type: 'tutorial',
    author: {
      name: 'Carlos Rodríguez',
      avatar: '/profile.webp',
    },
    readingTime: '7 min',
  },
];
