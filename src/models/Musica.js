const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaMusica = new Schema({
    nome : {
        type : String,
        required : true
    },
    genero : {
        type : String,
        required : true
    },
    artista : {
        type : String,
        required : true 
    }
});

const Musica = mongoose.model('Musica', schemaMusica);

module.exports = Musica;