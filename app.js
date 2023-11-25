 /* app.js */
const uri = process.env.MONGODB_URI;
const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const productos = require('./productos.json');
const path = require('path'); // Importar el módulo 'path' 
const multer = require('multer');
const upload = multer({ dest: 'public/images' }); // El directorio 'uploads/' será creado automáticamente

const routes = require('./routes'); // Importar el archivo index.js de la carpeta routes

const actualizarProductoRoutes = require('./routes/actualizarProducto');

dotenv.config();

// Accede a las variables de entorno cargadas desde .env


app.use('/js', express.static(path.join(__dirname, 'server/js')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes); // Usar las rutas definidas en el archivo index.js de la carpeta routes

app.set('views', path.join(__dirname, 'views'));


const productosDestacados = require('./server/productosDestacados');

app.set('view engine', 'ejs');


//Probando /productos
/* app.get('/productos', (req, res) => {
  res.json(productos);
});  */


app.get('/productos', (req, res) => {
  res.render('productos', { productos, header: 'header' });
});  


app.get('/', (req, res) => {
  res.render('index', { productos, productosDestacados, header: 'header' }); // Pasa ambas variables a la vista
});




// app.js
app.get('/admin/agregar-producto', (req, res) => {
  res.render('agregarProducto', { header: 'header' });
});



// Configura la ruta de manejo de la carga de archivos
app.post('/subir-imagen', upload.single('miImagen'), (req, res) => {
  // Aquí puedes manejar la lógica después de cargar la imagen
  res.send('Imagen subida con éxito');
});

app.get('/buscar', (req, res) => {
  const query = req.query.q;
  // Realiza la búsqueda por ID o descripción
  const resultados = productos.filter(producto =>
    producto.id === parseInt(query) || producto.descripcion.includes(query)
  );

  res.render('resultados', { resultados, header: 'header' });
});

app.use('/admin/actualizar-producto', actualizarProductoRoutes);
//PRUEBA DE BUSQUEDA

/* app.get('/buscar', (req, res) => {
  const query = req.query.q;
  // Realiza la búsqueda por ID o descripción
  const resultados = productos.filter(producto =>
    producto.id === parseInt(query) || producto.descripcion.includes(query)
  );

  res.json(resultados);
});
 */

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
