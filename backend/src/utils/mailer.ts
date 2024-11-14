import nodemailer from 'nodemailer'

// Configuración del transportador SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Usamos directamente el servicio de Gmail
  auth: {
    user: 'onepiecemonkeydluffy20@gmail.com', // Tu correo
    pass: 'buxk fckb onrc lkvy' // Tu contraseña de aplicación
  }
})

// Función para enviar correos electrónicos
export async function enviarCorreo(
  destinatario: string,
  asunto: string,
  texto: string,
  html?: string
): Promise<void> {
  const mailOptions = {
    from: 'onepiecemonkeydluffy20@gmail.com', // El correo remitente
    to: destinatario, // El destinatario
    subject: asunto, // Asunto del correo
    text: texto, // Cuerpo del correo en texto plano
    html // Cuerpo del correo en HTML, si se proporciona
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Correo enviado: ' + info.response)
  } catch (error) {
    console.error('Error al enviar el correo:', error)
    throw new Error('No se pudo enviar el correo')
  }
}
