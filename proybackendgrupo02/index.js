const express = require('express'); //permite hacer manejo de rutas o direccionamiento
const cors = require('cors'); //libreria que permite habilitar o no en referencias cruzadas en las aplicaciones
const { mongoose } = require('./database');
var app = express();

//middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

//Cargamos el modulo de direccionamiento de rutas
app.use('/api/usuario', require('./routes/usuario.route.js'));
app.use('/api/mesa', require('./routes/mesa.route.js'));
app.use('/api/bebida',require('./routes/bebida.route.js'));
app.use('/api/menu',require('./routes/menu.route.js'));

//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en puerto`, app.get('port'));
});