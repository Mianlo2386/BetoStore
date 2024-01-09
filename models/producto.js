// models/Producto.js
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  id: Number,
  imagen: String,
  descripcion: String,
  precio: Number,
  categoria: String,
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
