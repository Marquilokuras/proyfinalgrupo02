const mongoose = require('mongoose');
const URI = "mongodb+srv://marcosquinteros2003:12345@cluster0.psnhr2g.mongodb.net/proyfinalgrupo02";
//const URI = "mongodb://0.0.0.0/proyfinalgrupo02";
mongoose.connect(URI) 
    .then(db => console.log('Base de Datos conectada'))
    .catch(err => console.error(err))
module.exports = mongoose;
