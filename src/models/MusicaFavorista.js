const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaMusicaFavorita = new Schema({
    idMusica : {
        type : String,
        required : true
    },
    idUsuario : {
        type : String,
        required : true
    }
})


const MusicaFavorita = mongoose.model('MusicaFavorita', schemaMusicaFavorita);

module.exports = MusicaFavorita;