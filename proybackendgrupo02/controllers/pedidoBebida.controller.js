const Pedido = require('../models/pedidoBebida');
const Bebida = require('../models/bebida');
const nodemailer = require('nodemailer');
const pedidoCtrl = {}

pedidoCtrl.getPedidoBebida = async (req, res) => {
    var pedidos = await Pedido.find().populate('bebidasPedido.bebida');
    res.json(pedidos);
}

pedidoCtrl.createPedidoBebida = async (req, res) => {
    let pedido = new Pedido({ totalPedido: 0, bebidasPedido: [] })
    try {
        let cantidadBebidas = 0;
        let precioDetalle = 0;
        let bebidaId = ""
        let precioPedido = 0;
        const arrayBebida = req.body.bebidasPedido;

        for (let i = 0; i < arrayBebida.length; i++) {
            cantidadBebidas = arrayBebida[i].cantidadBebidas;
            precioDetalle = arrayBebida[i].precioDetalle
            bebidaId = arrayBebida[i].bebida
            pedido.bebidasPedido.push({ cantidadBebidas, precioDetalle, bebida: bebidaId })
            precioPedido = precioPedido + precioDetalle * cantidadBebidas;
        }

        pedido.totalPedido = precioPedido

        const emailUsuario = req.body.emailUsuario;

        //transportador del mensaje (quien lo envia en este caso un mail temporal )
        let transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: 'theWintonHouse@gmail.com', // Mail del que se va a enviar el mensaje
                pass: 'avavfnwuonsqahju',
            },
        });

        const mailOptions = {
            from: 'theWintonHouse@gmail.com',
            to: emailUsuario,
            subject: 'Pedido Registrado',
            text: "Gracias por tu Pedido esperamos que lo Disfrutes!! " 
              +  ", su total a pagar es de: $"+ pedido.totalPedido 

        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Correo electrónico enviado: ' + info.response);
            }
        });

        pedido.save();
        res.json({
            'status': '1',
            'msg': 'Pedido guardado.'
        })

    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

pedidoCtrl.editPedidoBebida = async (req, res) => {
    try {
        const { id } = req.params;
        req.body;
        await Pedido.findByIdAndUpdate({ _id: id }, req.body, { new: true, });

        res.json({
            status: '1',
            msg: 'Pedido Modifiado'
        });

    } catch (err) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
};

pedidoCtrl.deletePedidoBebida = async (req, res) => {
    try {
        await Pedido.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Pedido eliminado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = pedidoCtrl;