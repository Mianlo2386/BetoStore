
const uri = process.env.MONGODB_URI;
const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const productos = require('./productos.json');
const path = require('path'); // Importar el módulo 'path' 
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // El directorio 'uploads/' será creado automáticamente

dotenv.config();

// Accede a las variables de entorno cargadas desde .env


app.use('/js', express.static(path.join(__dirname, 'server/js')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));





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

app.post('/admin/agregar-producto', upload.single('imagen'), (req, res) => {
  console.log('Datos del formulario:', req.body);
  console.log('Archivo de imagen:', req.file);

  // Verifica que el cuerpo de la solicitud existe y es un objeto
  if (req.body && typeof req.body === 'object') {
    const newProduct = req.body;

    // Verifica que el objeto tenga la propiedad 'id'
    if ('id' in newProduct) {
      // Asigna un nuevo ID al producto
      newProduct.id = productos.length + 1;

      // Si se ha subido una imagen, adjunta la ruta de la imagen al nuevo producto
      if (req.file) {
        newProduct.imagen = `/uploads/${req.file.filename}`;
      }

      // Agrega el nuevo producto a la lista de productos
      productos.push(newProduct);

      // Devuelve el nuevo producto como respuesta
      return res.json(newProduct);
    }
  }

  // Si hay algún problema con los datos de la solicitud, devuelve un error
  res.status(400).json({ error: 'Datos de producto no válidos...' });
});



// app.js
app.get('/admin/agregar-producto', (req, res) => {
  res.render('agregarProducto', { header: 'header' });
});




app.get('/buscar', (req, res) => {
  const query = req.query.q;
  // Realiza la búsqueda por ID o descripción
  const resultados = productos.filter(producto =>
    producto.id === parseInt(query) || producto.descripcion.includes(query)
  );

  res.render('resultados', { resultados, header: 'header' });
});

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
