const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

dotenv.config();

// Accede a las variables de entorno cargadas desde .env
const correo = process.env.CORREOGMAIL;
const contraseña = process.env.PASSGMAIL;

// Require los archivos de productos y productosDestacados desde la carpeta "server"
const productos = require('./server/productos');
const productosDestacados = require('./server/productosDestacados');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { productos, productosDestacados, header: 'header' }); // Pasa ambas variables a la vista
});

// Resto de tus rutas...

app.get('/productos', (req, res) => {
  res.render('productos', { productos, header: 'header' });
});

app.get('/buscar', (req, res) => {
  const query = req.query.q;
  // Realiza la búsqueda por ID o descripción
  const resultados = productos.filter(producto =>
    producto.id === parseInt(query) || producto.descripcion.includes(query)
  );

  res.render('resultados', { resultados, header: 'header' });
});


app.get('/contacto', (req, res) => {
  res.render('contacto', { header: 'header' });
});


app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el envío del formulario de contacto
app.post('/enviar-consulta', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.CORREOGMAIL,
      pass: process.env.PASSGMAIL
    }
  });

  // Detalles del correo a enviar
  const mailOptions = {
    from: process.env.CORREOGMAIL, // Usar la variable de entorno para el correo del remitente
    to: process.env.CORREOGMAIL, // Usar la variable de entorno para el correo del destinatario o el correo donde deseas recibir consultas
    subject: 'Consulta de BetoStore',
    text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje: ${mensaje}`
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo: ' + error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });

  res.redirect('/'); // Redirige al usuario de nuevo a la página principal o a una página de confirmación
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
