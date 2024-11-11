const Playlist = require("../models/Playlist");
// const PlaylistMusicService = require("./playlist-music-service");

const PlaylistService = {
    create : async (data) => {
        try {
             console.log("no service",data);

             return await Playlist.create(data);
        } catch (error) {
            console.error(error);
            throw new Error("Erro, contate o suporte");
        }
    },
    getAll : async (idUsuario) => {
        try {

            console.log(idUsuario);

            return await Playlist.find({idUsuario : idUsuario});

        } catch (error) {
            console.error(error);
            throw new Error("Erro, contate o suporte");
        }
    },
    getOne : async (id, idUsuario) => {
        try {
            
            const playlist = await Playlist.findOne({
                _id : id,
                idUsuario : idUsuario
            });

            return playlist
            
            
        } catch (error) {
            console.error(error);
            throw new Error("Erro, contate o suporte");
        }
    },
    update : async (id, idUsuario, data) => {
        try {
            
            const playlist = await Playlist.findOne({
                _id : id,
                idUsuario : idUsuario
            });

            if(!playlist){
                return null
            }

            return await playlist.updateOne(data);
            
        } catch (error) {
            console.error(error);
            throw new Error("Erro, contate o suporte");
        }
    },
    delete : async (id, idUsuario) => {
        try {

            const playlist = await Playlist.findOne({
                _id : id,
                idUsuario : idUsuario
            })

            

            return await playlist.deleteOne();
        } catch (error) {
            console.error(error);
            throw new Error("Erro, contate o suporte");
        }
    }
}

module.exports = PlaylistService;