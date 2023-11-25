const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const productos = require('../productos.json');

router.get('/', (req, res) => {
  res.render('productos', { productos, header: 'header' });
});

router.get('/:id', (req, res) => {
  const productoId = req.params.id;
  const producto = productos.find((p) => p.id == productoId);

  if (!producto) {
    res.status(404).send('Producto no encontrado');
  } else {
    res.render('producto', { producto, header: 'header' });
  }
});

router.post('/admin/agregar-producto', upload.single('imagen'), (req, res) => {
  console.log('Datos del formulario:', req.body);
  console.log('Archivo de imagen:', req.file);

  if (req.body && typeof req.body === 'object') {
    const newProduct = req.body;

    if ('id' in newProduct) {
      newProduct.id = productos.length + 1;

      if (req.file) {
        newProduct.imagen = `/uploads/${req.file.filename}`;
      }

      productos.push(newProduct);

      return res.json(newProduct);
    }
  }

  res.status(400).json({ error: 'Datos de producto no válidos...' });
});

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
