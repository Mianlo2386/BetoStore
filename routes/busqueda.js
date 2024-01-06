// routes/busqueda.js
const express = require('express');
const router = express.Router();
const productos = require('../productos.json');

router.get('/', (req, res) => {
  const query = req.query.q;
  const resultados = productos.filter((producto) =>
    producto.id === parseInt(query) || producto.descripcion.includes(query)
  );

  res.render('resultados', { resultados, header: 'header' });
});

module.exports = router;
