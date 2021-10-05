const express = require('express'); //Importo el modulo express (Para generar un objeto app)
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express(); //Objeto app (Núcleo de la aplicacion)

const port = process.env.PORT || 3000;
//Para que pueda leer los contenidos enviados en formato JSON.
app.use(bodyParser.json()); 

//Conexion a la base de datos MongoDB

const url = "mongodb+srv://cristian:<TuContraseña>@rucs.a7dwe.mongodb.net/<NombreDeTuBase>?retryWrites=true&w=majority";
             

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("Conexión establecida"))
    .catch(error => console.log(error));


//Modelo o esquema de la base de datos
const personaSchema = new mongoose.Schema({
    NUMERO_RUC:String,
    RAZON_SOCIAL:String,
    NOMBRE_COMERCIAL:String,
    ESTADO_CONTRIBUYENTE:String,
    CLASE_CONTRIBUYENTE:String,
    FECHA_INICIO_ACTIVIDADES:String,
    FECHA_ACTUALIZACION:String,
    FECHA_SUSPENSION_DEFINITIVA:String,
    FECHA_REINICIO_ACTIVIDADES:String,
    OBLIGADO:String,
    TIPO_CONTRIBUYENTE:String,
    NUMERO_ESTABLECIMIENTO:String,
    NOMBRE_FANTASIA_COMERCIAL:String,
    CALLE:String,
    NUMERO:String,
    INTERSECCION:String,
    ESTADO_ESTABLECIMIENTO:String,
    DESCRIPCION_PROVINCIA:String,
    DESCRIPCION_CANTON:String,
    DESCRIPCION_PARROQUIA:String,
    CODIGO_CIIU:String,
    ACTIVIDAD_ECONOMICA:String
});

const Persona = mongoose.model('Personas', personaSchema);

//Rutas
//Insertar datos en la base de datos mediante el metodo POST
app.post('/personas', function(req, res) {
    const persona = new Persona();
    persona.NUMERO_RUC = req.body.NUMERO_RUC;
    persona.RAZON_SOCIAL = req.body.RAZON_SOCIAL;
    persona.NOMBRE_COMERCIAL = req.body.NOMBRE_COMERCIAL;
    persona.ESTADO_CONTRIBUYENTE = req.body.ESTADO_CONTRIBUYENTE;
    persona.CLASE_CONTRIBUYENTE = req.body.CLASE_CONTRIBUYENTE;
    persona.FECHA_INICIO_ACTIVIDADES = req.body.FECHA_INICIO_ACTIVIDADES;
    persona.FECHA_ACTUALIZACION = req.body.FECHA_ACTUALIZACION;
    persona.FECHA_SUSPENSION_DEFINITIVA = req.body.FECHA_SUSPENSION_DEFINITIVA;
    persona.FECHA_REINICIO_ACTIVIDADES = req.body.FECHA_REINICIO_ACTIVIDADES;
    persona.OBLIGADO = req.body.OBLIGADO;
    persona.TIPO_CONTRIBUYENTE = req.body.TIPO_CONTRIBUYENTE;
    persona.NUMERO_ESTABLECIMIENTO = req.body.NUMERO_ESTABLECIMIENTO;
    persona.NOMBRE_FANTASIA_COMERCIAL = req.body.NOMBRE_FANTASIA_COMERCIAL;
    persona.CALLE = req.body.CALLE;
    persona.NUMERO = req.body.NUMERO;
    persona.INTERSECCION = req.body.INTERSECCION;
    persona.ESTADO_ESTABLECIMIENTO = req.body.ESTADO_ESTABLECIMIENTO;
    persona.DESCRIPCION_PROVINCIA = req.body.DESCRIPCION_PROVINCIA;
    persona.DESCRIPCION_CANTON = req.body.DESCRIPCION_CANTON;
    persona.DESCRIPCION_PARROQUIA = req.body.DESCRIPCION_PARROQUIA;
    persona.CODIGO_CIIU = req.body.CODIGO_CIIU;
    persona.ACTIVIDAD_ECONOMICA = req.body.ACTIVIDAD_ECONOMICA;


    persona.save(function(error, savedpersona) {
        if (error) return res.status(500).send(error);

         res.json({ message: "Registro guardado exitosamente" });
    });
});
//Obtener todos registros
app.get('/personas', function(req, res) {
    Persona.find({}, function(error, persona) {
        if (error) return res.status(500).send(error);

       res.json(persona);
    });
});
//Obtener registros con el ruc
app.get('/personas/:ruc', function(req, res) {
    Persona.findOne({ NUMERO_RUC : req.params.ruc }, function(error, persona) {
        if (error) return res.status(500).send(error);

       res.json(persona);
    });
});
// Modificar registros con metodo PUT
app.put('/personas/:ruc', function(req, res) {
    Persona.findOne({ NUMERO_RUC : req.params.ruc }, function(error, persona) {
        if (error) return res.status(500).send(error);

        persona.NUMERO_RUC = req.body.NUMERO_RUC;
        persona.RAZON_SOCIAL = req.body.RAZON_SOCIAL;
        persona.NOMBRE_COMERCIAL = req.body.NOMBRE_COMERCIAL;
        persona.ESTADO_CONTRIBUYENTE = req.body.ESTADO_CONTRIBUYENTE;
        persona.CLASE_CONTRIBUYENTE = req.body.CLASE_CONTRIBUYENTE;
        persona.FECHA_INICIO_ACTIVIDADES = req.body.FECHA_INICIO_ACTIVIDADES;
        persona.FECHA_ACTUALIZACION = req.body.FECHA_ACTUALIZACION;
        persona.FECHA_SUSPENSION_DEFINITIVA = req.body.FECHA_SUSPENSION_DEFINITIVA;
        persona.FECHA_REINICIO_ACTIVIDADES = req.body.FECHA_REINICIO_ACTIVIDADES;
        persona.OBLIGADO = req.body.OBLIGADO;
        persona.TIPO_CONTRIBUYENTE = req.body.TIPO_CONTRIBUYENTE;
        persona.NUMERO_ESTABLECIMIENTO = req.body.NUMERO_ESTABLECIMIENTO;
        persona.NOMBRE_FANTASIA_COMERCIAL = req.body.NOMBRE_FANTASIA_COMERCIAL;
        persona.CALLE = req.body.CALLE;
        persona.NUMERO = req.body.NUMERO;
        persona.INTERSECCION = req.body.INTERSECCION;
        persona.ESTADO_ESTABLECIMIENTO = req.body.ESTADO_ESTABLECIMIENTO;
        persona.DESCRIPCION_PROVINCIA = req.body.DESCRIPCION_PROVINCIA;
        persona.DESCRIPCION_CANTON = req.body.DESCRIPCION_CANTON;
        persona.DESCRIPCION_PARROQUIA = req.body.DESCRIPCION_PARROQUIA;
        persona.CODIGO_CIIU = req.body.CODIGO_CIIU;
        persona.ACTIVIDAD_ECONOMICA = req.body.ACTIVIDAD_ECONOMICA;

        persona.save(function(savingError, savedpersona) {
            if (savingError) return res.status(500).send(savingError);

            res.json(savedpersona);
        });
    });
});
//Borrar un registro mediante su ID con el metodo DELETE
app.delete('/personas/:ruc', function(req, res) {
    Persona.findOne({ NUMERO_RUC : req.params.ruc }, function(error, persona) {
        if (error) return res.status(500).send(error);

        persona.remove(function(removingError) {
            if (removingError) return res.status(500).send({ error: removingError });

           res.json({ message: "Registro eliminado exitosamente" });
        });
    });
});


//Le dice a express que cuando una petición llegue por el método GET y la ruta sea '/', entonces ejecute la función que le pasamos.
app.get('/', function(req, res) { //Funcion que recibe dos parametros una oerticion ->req y una respuesta ->res
    res.send('..Funcionando'); //Metodo que permite mostar respuesta(Funcionando)
});


//Puerto en donde corre el servidor
app.listen(port, function() {
    console.log(`Servidor corriendo en localhost:${port}`);
});