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


