"use strict";
//ESTO ES UN EJEMPLO DE LAS RUTAS
var AlumnoController = require("../controllers/alumno-controller"),
   express = require("express"),
  router = express.Router();

  router
  //****ALUMNO EJEMPLO****
  .get("/alumno/TodosAlumnos", AlumnoController.getAll)
  .post("/alumno/Insertar", AlumnoController.post)
  .delete("/alumno/Eliminar", AlumnoController.delete)

  .use(AlumnoController.error404);
  //JCBSKDJVBSDKJVB//

module.exports = router;
