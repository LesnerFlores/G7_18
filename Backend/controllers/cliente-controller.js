const clienteModel = require('../models/cliente-model.js');

const clienteController = {
    // Obtener todos los clientes
    getAllClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.getAllClientes();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los clientes' });
        }
    },

    // Obtener un cliente por ID
    getClienteById: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await clienteModel.getClienteById(id);
            if (cliente) {
                res.status(200).json(cliente);
            } else {
                res.status(404).json({ error: 'Cliente no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el cliente' });
        }
    },

    // Insertar un nuevo cliente
    insertCliente: async (req, res) => {
        const { ID_CLIENTE, nombre, apellidos, fecha_nacimiento, genero, direccion, telefono } = req.body;
        try {
            const nuevoCliente = await clienteModel.insertCliente( ID_CLIENTE, nombre, apellidos, fecha_nacimiento, genero, direccion, telefono);
            res.status(201).json(nuevoCliente);
        } catch (error) {
            res.status(500).json({ error: 'Error al insertar el cliente' });
        }
    },

    // Actualizar un cliente existente
    updateCliente: async (req, res) => {
        const { id } = req.params;
        const { nombre, apellidos, fecha_nacimiento, genero, direccion, telefono } = req.body;
        try {
            const clienteActualizado = await clienteModel.updateCliente(id, nombre, apellidos, fecha_nacimiento, genero, direccion, telefono);
            if (clienteActualizado) {
                res.status(200).json(clienteActualizado);
            } else {
                res.status(404).json({ error: 'Cliente no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el cliente' });
        }
    },

    // Eliminar un cliente por ID
    deleteCliente: async (req, res) => {
        const { id } = req.params;
        try {
            const clienteEliminado = await clienteModel.deleteCliente(id);
            if (clienteEliminado) {
                res.status(200).json(clienteEliminado);
            } else {
                res.status(404).json({ error: 'Cliente no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el cliente' });
        }
    }
};

module.exports = clienteController;

