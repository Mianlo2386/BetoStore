const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');  
const path = require('path');  
const productosRoutes = require('./productos');
const busquedaRoutes = require('./busqueda')
const contactoRoutes = require('./contacto');

router.use('/productos', productosRoutes);
router.use('/buscar', busquedaRoutes);
router.use('/contacto', contactoRoutes);

const productos = require('../productos.json');
const productosDestacados = require('./productosDestacados'); 

router.get('/', (req, res) => {
  res.render('index', { productos, productosDestacados, header: 'header' });
});


module.exports = router;


/* router.get('/producto/:id', (req, res) => {
  const productoId = req.params.id;
  const producto = productos.find((p) => p.id == productoId);

  if (!producto) {
    res.status(404).send('Producto no encontrado');
  } else {
    res.render('producto', { producto, header: 'header' });
  }
});

router.get('/buscar', (req, res) => {
  const query = req.query.q;
  const resultados = productos.filter(producto =>
    producto.id === parseInt(query) || producto.descripcion.includes(query)
  );

  res.render('resultados', { resultados, header: 'header' });
}); */
/* router.use('/admin/aumento-general', aumentoGeneralRoutes);
router.use('/admin/actualizar-producto', actualizarProductoRoutes);
router.use('/admin/agregar-producto', agregarProductoRoutes);
router.use('/admin/eliminar-producto', eliminarProductoRoutes); */