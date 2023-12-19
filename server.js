const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const ProductManager = require('./ProductManager');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const productManager = new ProductManager('productos.json');

// Configuración de Handlebars
app.engine('.handlebars', exphbs({ extname: '.handlebars' }));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts();
  res.render('realTimeProducts', { products });
});

// Configuración de WebSockets
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  // Escucha para la creación de un nuevo producto desde WebSocket
  socket.on('newProduct', (product) => {
    const productId = productManager.addProduct(product);
    io.emit('updateProducts', productManager.getProducts());
  });

  // Escucha para la eliminación de un producto desde WebSocket
  socket.on('deleteProduct', (productId) => {
    productManager.deleteProduct(productId);
    io.emit('updateProducts', productManager.getProducts());
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// Iniciar el servidor en el puerto 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
