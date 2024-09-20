import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  message: string;
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  message,
  email
}) => (
  <div>
    <h1>Nuevo Mensaje del Formulario de Contacto</h1>
    <p>Nombre: {firstName}</p>
    <p>Correo Electrónico: {email}</p>
    <p>Mensaje: {message}</p>
  </div>
);