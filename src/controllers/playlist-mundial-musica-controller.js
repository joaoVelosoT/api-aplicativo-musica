const PlaylistMundialMusicService = require("../services/playlist-mundial-musica");

const PlaylistMundialMusicController = {
    create : async (req,res) => {
        try {
            const playMusic = await PlaylistMundialMusicService.create(req.musicPlaylist);

            if(playMusic.error){
                return res.status(playMusic.code).json({
                    msg : playMusic.msg
                })
            }

            return res.status(playMusic.code).json({
                msg : playMusic.msg,
                playlistMundialMusica: playMusic.playlistMundialMusica
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    getAll : async (req,res) => {
        try {
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    getOne : async (req,res) => {
        try {
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    update : async (req,res) => {
        try {
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    delete : async (req,res) => {
        try {
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    }
}


module.exports = PlaylistMundialMusicController