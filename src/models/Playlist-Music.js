const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaPlaylistMusic = new Schema({
    idMusica : {
        type : String,
        required : true
    },
    idPlaylist : {
        type : String,
        required : true
    },
})

const PlaylistMusic = mongoose.model('PlaylistMusica', schemaPlaylistMusic);
module.exports = PlaylistMusic;