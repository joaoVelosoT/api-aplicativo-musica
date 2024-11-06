
const PlaylistMusic = require('../models/Playlist-Music');
const MusicaService = require('./musica-service');
const PlaylistService = require('./playlist-service');
const PlaylistMusicService = {
    create : async (data, idUsuario) => {
        try {

                // Validar se existe a musica
                const existeMusica = await MusicaService.getOne(data.idMusica);
                if(!existeMusica){
                    return null
                }

                // Validar se existe a playlist
                const existePlaylist = await PlaylistService.getOne(data.idPlaylist, idUsuario);
                if(!existePlaylist){
                    return null
                }

            return await PlaylistMusic.create(data);

        } catch (error) {
            console.error(error);
            throw new Error("Erro, contate o suporte");
        }
    },
    getAll : async () => {
        try {
            
        } catch (error) {
            console.error(error);
            throw new Error("Erro, contate o suporte");
        }
    },
    getOne : async () => {
        try {
            
        } catch (error) {
            console.error(error);
            throw new Error("Erro, contate o suporte");
        }
    },
    update : async () => {
        try {
            
        } catch (error) {
            console.error(error);
            throw new Error("Erro, contate o suporte");
        }
    },
    delete : async () => {
        try {
            
        } catch (error) {
            console.error(error);
            throw new Error("Erro, contate o suporte");
        }
    }
}

module.exports = PlaylistMusicService;