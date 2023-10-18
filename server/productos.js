const productos = [
   {
     id: 1,
     imagen: '/images/producto1.jpeg',
     descripcion: 'Descripción del producto 1: Aquí va la descripción del producto.',
     precio: 1000 // Precio de este producto
   },
   {
     id: 2,
     imagen: '/images/producto2.jpeg',
     descripcion: 'Descripción del producto 2: Aquí va la descripción del producto.',
     precio: 1000 // Precio de este producto
   },
   {
     id: 3,
     imagen: '/images/producto3.jpeg',
     descripcion: 'Descripción del producto 3: Aquí va la descripción del producto.',
     precio: 1000 // Precio de este producto
   },
   {
     id: 4,
     imagen: '/images/producto4.jpeg',
     descripcion: 'Descripción del producto 4: Aquí va la descripción del producto.',
     precio: 1000 // Precio de este producto
   },
   {
     id: 5,
     imagen: '/images/producto5.jpeg',
     descripcion: 'Descripción del producto 5: Aquí va la descripción del producto.',
     precio: 1000 // Precio de este producto
   },
   {
     id: 6,
     imagen: '/images/producto6.jpeg',
     descripcion: 'Descripción del producto 6: Aquí va la descripción del producto.',
     precio: 1000 // Precio de este producto
   },
   {
     id: 7,
     imagen: '/images/producto7.jpeg',
     descripcion: 'Descripción del producto 7: Aquí va la descripción del producto.',
     precio: 1000 // Precio de este producto
   },
   {
     id: 8,
     imagen: '/images/producto8.jpeg',
     descripcion: 'Descripción del producto 8: Aquí va la descripción del producto.',
     precio: 1000 // Precio de este producto
   },
   {
     id: 9,
     imagen: '/images/producto9.jpeg',
     descripcion: 'Descripción del producto 9: Aquí va la descripción del producto.',
     precio: 1000 // Precio de este producto
   },
   {
     id: 10,
     imagen: '/images/producto0.jpeg',
     descripcion: 'Descripción del producto 10: Aquí va la descripción del producto.',
     precio: 1000 // Precio de este producto
   }
   // Puedes agregar más objetos con las rutas de las imágenes y precios aquí
 ];
 // Aumentar el precio de todos los productos en un 5%
const porcentajeAumento = 5;
productos.forEach(producto => {
  producto.precio = producto.precio * (1 + porcentajeAumento / 100);
});
 
 module.exports = productos;
 
  
  