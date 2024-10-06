import { Resend } from 'resend';
import { EmailTemplate } from '@/components/ui/email-template';

const resend = new Resend(process.env.RESEND_APIKEY);

export async function POST(req: Request) {
  try {
    const dataForm = await req.json();
    try {
      const data = await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: ['camiloescar1995@gmail.com'],
        subject: 'Nuevo Mensaje del Formulario de Contacto',
        react: EmailTemplate({
          firstName: dataForm.username,
          message: dataForm.message,
          email: dataForm.email,
        }),
      });
      return Response.json({ success: true, data });
    } catch (error) {
      return Response.json({ success: false, error: 'Error al enviar el correo electrónico' }, { status: 500 });
    }
  } catch (error) {
    return Response.json({ success: false, error: 'Datos de solicitud inválidos' }, { status: 400 });
  }
}

//en produccion

// Variables de entorno:

// Asegúrate de que tu clave API de Resend (RESEND_APIKEY) esté configurada como una variable de entorno en tu plataforma de hosting (por ejemplo, Vercel, Netlify, etc.) y no esté expuesta en el código.
// Si estás usando plataformas como Vercel, puedes configurar las variables de entorno en su interfaz web.


// Correo electrónico remitente:

// En producción, deberías usar un dominio verificado para el correo electrónico remitente. Actualmente, estás usando onboarding@resend.dev, que es para pruebas.
// Cambia la línea en tu ruta API:

// typescriptCopyfrom: "Tu Nombre <tu@dominio.com>",
// Asegúrate de verificar este dominio en Resend.
// CORS y seguridad:

// Configura CORS (Cross-Origin Resource Sharing) para permitir solo los orígenes necesarios.
// Considera añadir rate limiting a tu API para prevenir abusos.


// Manejo de errores:

// Implementa un sistema de logging más robusto para capturar y monitorear errores en producción.
// Considera usar un servicio de monitoreo de errores como Sentry.


// Optimización de rendimiento:

// Asegúrate de que tu aplicación esté configurada para usar la compilación de producción de React.
// Considera implementar caching donde sea apropiado.


// SEO y metadatos:

// Asegúrate de que todos los metadatos necesarios estén configurados correctamente para SEO.


// Analytics:

// Considera añadir una herramienta de analytics como Google Analytics o Plausible.


// Testing:

// Realiza pruebas exhaustivas en un entorno de staging antes de lanzar a producción.
// import { Resend } from "resend";
// import { EmailTemplate } from "@/components/ui/email-template";

// const resend = new Resend(process.env.RESEND_APIKEY);

// export async function POST(req: Request) {
//   // Verificar el origen de la solicitud
//   const allowedOrigins = ['https://tudominio.com', 'https://www.tudominio.com'];
//   const origin = req.headers.get('origin');
//   if (!allowedOrigins.includes(origin)) {
//     return new Response('No autorizado', { status: 403 });
//   }

//   try {
//     const dataForm = await req.json();
//     try {
//       const data = await resend.emails.send({
//         from: "Tu Nombre <contacto@tudominio.com>",
//         to: ["camiloescar1995@gmail.com"],
//         subject: "Nuevo Mensaje del Formulario de Contacto",
//         react: EmailTemplate({
//           firstName: dataForm.username,
//           message: dataForm.message,
//           email: dataForm.email,
//         }),
//       });
//       return new Response(JSON.stringify({ success: true, data }), {
//         headers: { 'Content-Type': 'application/json' },
//       });
//     } catch (error) {
//       console.error('Error al enviar el correo:', error);
//       return new Response(JSON.stringify({ success: false, error: "Error al enviar el correo electrónico" }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }
//   } catch (error) {
//     console.error('Error en la solicitud:', error);
//     return new Response(JSON.stringify({ success: false, error: "Datos de solicitud inválidos" }), {
//       status: 400,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }