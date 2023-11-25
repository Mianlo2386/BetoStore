/* index.js */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');  // Agrega esta línea
const path = require('path');  // Agrega esta línea
const actualizarProductoRoutes = require('./actualizarProducto');


const productos = require('../productos.json');

const productosDestacados = require('../server/productosDestacados'); // Asegúrate de incluirlo



router.get('/', (req, res) => {
  res.render('index', { productos, productosDestacados, header: 'header' });
});

router.get('/producto/:id', (req, res) => {
  const productoId = req.params.id;
  const producto = productos.find((p) => p.id == productoId);

  if (!producto) {
    res.status(404).send('Producto no encontrado');
  } else {
    res.render('producto', { producto, header: 'header' });
  }
});
router.post('/admin/agregar-producto', upload.single('imagen'), (req, res) => {
  
  console.log('Datos de la solicitud:', req);
  console.log('Datos del formulario:', req.body);
  console.log('Archivo de imagen:', req.file);

  // Verifica que se haya subido un archivo y que el cuerpo de la solicitud sea un objeto
  if (req.file && req.body && typeof req.body === 'object') {
    const newProduct = req.body;

    // Verifica que el objeto tenga la propiedad 'id'
    if ('id' in newProduct) {
      // Asigna un nuevo ID al producto
      newProduct.id = productos.length + 1;

      // Construye un nombre descriptivo para la imagen (por ejemplo, producto1.jpg)
      const nombreArchivo = `producto${newProduct.id}${path.extname(req.file.originalname)}`;
      // Mueve el archivo a la carpeta correcta con el nuevo nombre
      fs.renameSync(req.file.path, path.join(req.file.destination, nombreArchivo));

      // Adjunta la ruta de la imagen al nuevo producto
      newProduct.imagen = `/images/${nombreArchivo}`;

      // Agrega el nuevo producto a la lista de productos
      productos.push(newProduct);

      // Devuelve el nuevo producto como respuesta
      return res.json(newProduct);
    }
  }

  // Si hay algún problema con los datos de la solicitud, devuelve un error
  res.status(400).json({ error: 'Datos de producto no válidos...' });
});
router.use('/admin', actualizarProductoRoutes); 



router.get('/admin/agregar-producto', (req, res) => {
  res.render('agregarProducto', { header: 'header' });
});

router.get('/buscar', (req, res) => {
  const query = req.query.q;
  const resultados = productos.filter(producto =>
    producto.id === parseInt(query) || producto.descripcion.includes(query)
  );

  res.render('resultados', { resultados, header: 'header' });
});

module.exports = router;
