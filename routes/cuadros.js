// routes/cuadros.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const collection = db.collection('cuadros');
    const resultado = await collection.find({}).toArray();
    res.json(resultado);
  } catch (error) {
    console.error('Error al realizar la consulta en la base de datos', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
