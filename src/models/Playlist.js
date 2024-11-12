const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schemaPlaylist = new Schema({
    nome : {
        type : String,
        required : true
    },

    imagem : {
        type : String,
        required : true
    },
    descricao : {
        type : String,
        required : false
    },
    idUsuario : {
        type : String,
        required : true
    }
});

const Playlist = mongoose.model("Playlist", schemaPlaylist);

module.exports = Playlist;