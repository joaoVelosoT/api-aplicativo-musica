const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaPlaylistMundial = new Schema({
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
    categoria : {
        type : String,
        required : false
    },
});

const PlaylistMundial = mongoose.model('PlayListMundial', schemaPlaylistMundial);

module.exports = PlaylistMundial
