const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaPlaylistMundialMusic = new Schema({
    idMusica : {
        type : String,
        required : true
    },
    idPlaylist : {
        type : String,
        required : true
    },
})

const PlaylistMundialMusic = mongoose.model('PlaylistMundialMusica', schemaPlaylistMundialMusic);

module.exports = PlaylistMundialMusic