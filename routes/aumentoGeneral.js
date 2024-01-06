const express = require('express');
const router = express.Router();
const productos = require('../productos.json');

// Ruta GET para renderizar la página de aumento general
router.get('/', (req, res) => {
  res.render('aumentoGeneral', { header: 'header' });
});

// Procesa el formulario de aumento general
router.post('/', (req, res) => {
  const porcentajeGeneral = parseInt(req.body.porcentajeGeneral);

  productos.forEach((producto) => {
    producto.precio = producto.precio * (1 + porcentajeGeneral / 100);
  });

  /* console.log('Productos después del aumento general:', productos); */

  /* res.render('confirmacionAumento', { porcentajeGeneral, header: 'header' });
}); */

res.render('confirmacionAumento', { porcentajeGeneral, header: 'header' });
});

module.exports = router;
