const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads/') });
const routes = require('./routes');
const actualizarProductoRoutes = require('./routes/actualizarProducto');
const agregarProductoRoutes = require('./routes/agregarProducto');
const eliminarProductoRouter = require('./routes/eliminarProducto');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin/eliminar-producto', eliminarProductoRouter);

app.use('/admin/agregar-producto', agregarProductoRoutes);



app.use('/js', express.static(path.join(__dirname, 'server/js')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use('/', routes);

app.get('/', (req, res) => {
  res.render('index', { productos, productosDestacados, header: 'header' });
});

const productosRoutes = require('./routes/productos');
app.use('/productos', productosRoutes);

const productosDestacados = require('./server/productosDestacados');

app.get('/productos', (req, res) => {
  res.render('productos', { productos, header: 'header' });
});

// Configura la ruta de manejo de la carga de archivos
app.post('/subir-imagen', upload.single('miImagen'), (req, res) => {
  // Aquí puedes manejar la lógica después de cargar la imagen
  res.send('Imagen subida con éxito');
});

app.get('/buscar', (req, res) => {
  const query = req.query.q;
  // Realiza la búsqueda por ID o descripción
  const resultados = productos.filter((producto) =>
    producto.id === parseInt(query) || producto.descripcion.includes(query)
  );

  res.render('resultados', { resultados, header: 'header' });
});

app.use('/admin/actualizar-producto', actualizarProductoRoutes);

// Rutas para el aumento general de precios
const aumentoGeneralRoutes = require('./routes/aumentoGeneral');

// Ruta GET para renderizar la página de aumento general
app.get('/admin/aumento-general', (req, res) => {
  res.render('aumentoGeneral', { header: 'header' });
});

// Utiliza el middleware de aumento general para manejar la lógica específica
app.use('/admin/aumento-general', aumentoGeneralRoutes);

app.get('/contacto', (req, res) => {
  res.render('contacto', { header: 'header' });
});



// Ruta para manejar el envío del formulario de contacto
app.post('/enviar-consulta', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.CORREOGMAIL,
      pass: process.env.PASSGMAIL,
    },
  });

  // Detalles del correo a enviar
  const mailOptions = {
    from: process.env.CORREOGMAIL, // Usar la variable de entorno para el correo del remitente
    to: process.env.CORREOGMAIL, // Usar la variable de entorno para el correo del destinatario o el correo donde deseas recibir consultas
    subject: 'Consulta de BetoStore',
    text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje: ${mensaje}`,
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

app.get('/producto/:id', (req, res) => {
  const productoId = req.params.id; // Obtiene el ID del producto desde la URL
  // Encuentra el producto correspondiente basado en el ID
  const producto = productosDestacados.find((p) => p.id == productoId);

  if (!producto) {
    // Si no se encuentra el producto, puedes mostrar una página de "No encontrado" o redirigir a otra página
    res.status(404).send('Producto no encontrado');
  } else {
    // Renderiza una plantilla de EJS para mostrar los detalles del producto
    res.render('producto', { producto, header: 'header' });
  }
});

const { connectToDatabase } = require('./server/database.js');

async function main() {
  try {
    const db = await connectToDatabase();
    // Realiza consultas y operaciones en la base de datos
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
  }
}

main();

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
