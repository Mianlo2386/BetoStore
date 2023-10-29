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
    imagen: '/images/producto10.jpeg',
    descripcion: 'Descripción del producto 10: Aquí va la descripción del producto.',
    precio: 1000 // Precio de este producto
  }
];

// Inicializamos una copia de 'productos' en 'productsCollection'
let productsCollection = [...productos];

// Obtener todos los productos
const getAllProducts = async () => {
  return productsCollection;
};

// Obtener un producto por su ID
const getProductById = async (id) => {
  return productsCollection.find(product => product.id === id);
};

// Crear un nuevo producto
const createProduct = async (newProduct) => {
  productsCollection.push(newProduct);
  return newProduct;
};

// Actualizar un producto por su ID
const updateProduct = async (id, updatedProduct) => {
  const index = productsCollection.findIndex(product => product.id === id);
  if (index !== -1) {
    productsCollection[index] = { ...productsCollection[index], ...updatedProduct };
    return productsCollection[index];
  }
  return null;
};

// Eliminar un producto por su ID
const deleteProduct = async (id) => {
  productsCollection = productsCollection.filter(product => product.id !== id);
};

module.exports = {
  productos,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};