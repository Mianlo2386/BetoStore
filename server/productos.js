

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
