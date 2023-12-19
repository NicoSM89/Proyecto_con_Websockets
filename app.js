const ProductManager = require('./ProductManager');

// instancia de ProductManager con la ruta del archivo
const productManager = new ProductManager('productos.json');

// Ejemplo de uso:
const newProductId = productManager.addProduct({
  title: 'Sony a6600',
  description: 'Cámara mirrorless',
  price: 985.67,
  thumbnail: 'ruta/imagen.jpg',
  code: 'A0001',
  stock: 50,
});

console.log(`Nuevo producto agregado con ID: ${newProductId}`);

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

// Obtener un producto por ID
const productIdToFind = 1;
const foundProduct = productManager.getProductById(productIdToFind);
console.log(`Producto con ID ${productIdToFind}:`, foundProduct);

// Actualizar un producto por ID
const productIdToUpdate = 1;
const updatedProductData = {
  price: 849.99,
  stock: 40,
};
const updateSuccess = productManager.updateProduct(productIdToUpdate, updatedProductData);
console.log('Producto actualizado:', updateSuccess ? 'Éxito' : 'No se encontró el producto');

// Eliminar un producto por ID
const productIdToDelete = 1;
productManager.deleteProduct(productIdToDelete);
console.log('Producto eliminado con ID:', productIdToDelete);
