const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { mongoose } = require('./database');

var app = express();

//middlewares
//app.use(express.json());
app.use(cors({ origin: 'https://proyfinalgrupo02.vercel.app' }));
app.use(cors({ origin: '*' })); 

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(morgan('dev'))

app.use('/api/usuario', require('./routes/usuario.route.js'));
app.use('/api/mesa', require('./routes/mesa.route.js'));
app.use('/api/bebida',require('./routes/bebida.route.js'));
app.use('/api/comentario',require('./routes/comentario.route.js'));
app.use('/api/promocion',require('./routes/promocion.route.js'));
app.use('/api/pedido',require('./routes/pedidoBebida.route.js'));
app.use('/api/reserva',require('./routes/reserva.route.js'));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en puerto`, app.get('port'));
});
