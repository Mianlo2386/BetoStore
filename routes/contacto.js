// routes/contacto.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
  res.render('contacto', { header: 'header' });
});

router.post('/enviar-consulta', (req, res) => {
  console.log('Llegó a /enviar-consulta'); // Mensaje de depuración

  const { nombre, email, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.CORREOGMAIL,
      pass: process.env.PASSGMAIL,
    },
  });

  const mailOptions = {
    from: process.env.CORREOGMAIL,
    to: process.env.CORREOGMAIL,
    subject: 'Consulta de BetoStore',
    text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje: ${mensaje}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo: ' + error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });

  res.redirect('/'); 
});

module.exports = router;

