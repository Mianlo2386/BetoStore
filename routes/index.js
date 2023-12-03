const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');  
const path = require('path');  
const productosRoutes = require('./productos');
const aumentoGeneralRoutes = require('./aumentoGeneral');
const actualizarProductoRoutes = require('./actualizarProducto');

router.use('/productos', productosRoutes);
router.use('/admin/aumento-general', aumentoGeneralRoutes);
router.use('/admin', actualizarProductoRoutes);

const productos = require('../productos.json');
const productosDestacados = require('../server/productosDestacados'); 

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
  // Tu lógica para agregar un producto...
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
