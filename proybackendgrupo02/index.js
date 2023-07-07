const express = require('express'); //permite hacer manejo de rutas o direccionamiento
const cors = require('cors'); //libreria que permite habilitar o no en referencias cruzadas en las aplicaciones
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { mongoose } = require('./database');

var app = express();

//middlewares
//app.use(express.json());
//app.use(cors({ origin: 'https://proyfinalgrupo02.vercel.app' }));
app.use(cors({ origin: '*' }));

// Configuración del límite de tamaño de carga útil a 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(morgan('dev'))//muestra la petision del back - se verifica la petision del back

//Cargamos el modulo de direccionamiento de rutas
app.use('/api/usuario', require('./routes/usuario.route.js'));
app.use('/api/mesa', require('./routes/mesa.route.js'));
app.use('/api/bebida',require('./routes/bebida.route.js'));
app.use('/api/pedido',require('./routes/pedidoBebida.route.js'));
app.use('/api/comentario',require('./routes/comentario.route.js'));
app.use('/api/promocion',require('./routes/promocion.route.js'));
app.use('/api/reserva',require('./routes/reserva.route.js'));

//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en puerto`, app.get('port'));
});