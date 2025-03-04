const pool = require("../config/db-connection.js");

const clienteModel = {
    // Obtener todos los clientes
    getAllClientes: async () => {
        const query =
            'SELECT "ID_CLIENTE", nombre, apellidos, fecha_nacimiento, genero, direccion, telefono FROM public."CLIENTE"';
        const result = await pool.query(query);
        return result.rows;
    },

    // Obtener un cliente por ID
    getClienteById: async (id) => {
        const query =
            'SELECT "ID_CLIENTE", nombre, apellidos, fecha_nacimiento, genero, direccion, telefono ' +
            'FROM public."CLIENTE" WHERE "ID_CLIENTE" = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    // Insertar un nuevo cliente
    insertCliente: async (
        ID_CLIENTE,
        nombre,
        apellidos,
        fecha_nacimiento,
        genero,
        direccion,
        telefono
    ) => {
        const query = `
        INSERT INTO public."CLIENTE" ("ID_CLIENTE", nombre, apellidos, fecha_nacimiento, genero, direccion, telefono)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;

        try {
            // Ejecutar la consulta con los valores proporcionados
            const result = await pool.query(query, [
                ID_CLIENTE,
                nombre,
                apellidos,
                fecha_nacimiento,
                genero,
                direccion,
                telefono,
            ]);

            // Devolver el cliente insertado
            return result.rows[0];
        } catch (error) {
            console.error(error);
            throw new Error("Error al insertar el cliente en la base de datos");
        }
    },

    // Actualizar un cliente existente
    updateCliente: async (
        id,
        nombre,
        apellidos,
        fecha_nacimiento,
        genero,
        direccion,
        telefono
    ) => {
        const query = `
        UPDATE public."CLIENTE"
        SET nombre = $1, apellidos = $2, fecha_nacimiento = $3, genero = $4, direccion = $5, telefono = $6
        WHERE "ID_CLIENTE" = $7
        RETURNING *;
    `;
        try {
            const result = await pool.query(query, [
                nombre,
                apellidos,
                fecha_nacimiento,
                genero,
                direccion,
                telefono,
                id,
            ]);
            return result.rows[0]; // Devuelve el cliente actualizado
        } catch (error) {
            console.error(error);
            throw new Error("Error al actualizar el cliente en la base de datos");
        }
    },

    // Eliminar un cliente por ID
    deleteCliente: async (id) => {
        const query = `
        DELETE FROM public."CLIENTE"
        WHERE "ID_CLIENTE" = $1
        RETURNING *;
    `;
        try {
            const result = await pool.query(query, [id]);
            return result.rows[0]; // Devuelve el cliente eliminado
        } catch (error) {
            console.error(error);
            throw new Error("Error al eliminar el cliente de la base de datos");
        }
    },
};

module.exports = clienteModel;
