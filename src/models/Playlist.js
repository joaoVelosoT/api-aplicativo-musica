const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schemaPlaylist = new Schema({
    nome : {
        type : String,
        required : true
    },
    // categoria
    // imagem
    // tags
    idUsuario : {
        type : String,
        required : true
    }
});

const Playlist = mongoose.model("Playlist", schemaPlaylist);

module.exports = Playlist;