const express = require('express');
const clienteController = require('./controllers/cliente-controller.js');

const app = express();
const port = 5007; // Puerto asignado para el Grupo 7

app.use(express.json());

// Rutas para los servicios API REST

app.get('/clientes', clienteController.getAllClientes);
app.get('/clientes/:id', clienteController.getClienteById);
app.post('/clientes', clienteController.insertCliente);
app.put('/clientes/:id', clienteController.updateCliente);
app.delete('/clientes/:id', clienteController.deleteCliente);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});