"use strict"

var conn = require("../config/db-connection"),
  AlumnoModel = () => {};

AlumnoModel.getAll = (cb) => conn.query("SELECT * FROM alumno", cb); //cb callback funciton

AlumnoModel.post = (data, cb) => 

             conn.query( "INSERT INTO public.alumno(no_cuenta, nombre, apellido, indice) VALUES ($1,$2,$3,$4)",
              [  
                data.no_cuenta,
                data.nombre,   
                data.apellido,
                data.indice
              ],
              cb);

AlumnoModel.delete = (id, cb) =>
  conn.query(
    "delete from public.alumno where no_cuenta = $1", [id], cb
    );

module.exports = AlumnoModel;
