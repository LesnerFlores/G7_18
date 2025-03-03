'use strict'

var AlumnoModel = require('../models/alumno-model'),
	AlumnoController = () => {}

AlumnoController.getAll = (req, res, next) => {

	AlumnoModel.getAll((err, rows) => {
		if(err)
		{
			let locals = {
				title : 'Error al consultar la base de datos',
				description : 'Error de Sintaxis SQL',
				error : err
			}

			res.render('error', locals)
		}
		else
		{
			let locals = {
				title : 'Lista de Alumnos',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('index', locals)
		}
	})
}

AlumnoController.post = (req, res, next) => {
	let alumno = {
        no_cuenta : req.body.no_cuenta,
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        indice : req.body.indice
	}

	console.log(alumno)

	AlumnoModel.post(alumno, (err) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el Alumno con el id: ${alumno.no_cuenta}`,
				description : "Error de Sintaxis SQL",
				error : err
			}

			//res.render('error', locals)
			res.status(520).json(err);
		}
		else
		{
			res.send('Alumno Ingresado de Forma Correcta')
			//res.redirect('/')
		}
	})
}


AlumnoController.delete = (req, res, next) => {
	let no_cuenta = req.body.no_cuenta
	console.log(no_cuenta)

	AlumnoModel.delete(no_cuenta, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al eliminar el registro con el id: ${no_cuenta}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
//
			res.render('error', locals)
		}
		else
		{
			res.send('Alumno Eliminado de Forma Correcta')
			
		}
	})
}

// estos metodos los dejan tal cual como esta....
AlumnoController.addForm = (req, res, next) => 
    res.render('add-alumno', { title : 'Agregar Alumno' })

AlumnoController.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.render('error', locals)

	next()
}

module.exports = AlumnoController