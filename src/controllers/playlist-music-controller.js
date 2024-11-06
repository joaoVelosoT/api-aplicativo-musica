const PlaylistMusicService = require("../services/playlist-music-service");

const PlaylistMusicController = {
    create : async (req,res) => {
        try {

            const playMusic = await PlaylistMusicService.create(req.playMusic, req.user.id);

            if(!playMusic){
                return res.status(400).json({
                    msg : "Playlist ou musica não encontrada"
                })
            }
            return res.status(200).json({
                msg : "Musica adicionada na playlist",
                playMusic
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: "Erro, contate o suporte",
            })
        }
    },
    getAll : async (req,res) => {
        try {
            const playMusics = await PlaylistMusicService.getAll();

            return res.status(200).json({
                msg : "Todas as musicas",
                playMusics
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: "Erro, contate o suporte",
            })
        }
    },
    getOne : async (req,res) => {
        try {
            
            const playMusic = await PlaylistMusicService.getOne(req.params.id);

            if(!playMusic){
                return res.status(404).json({
                    msg : "Não foi encontrada a musica na playlist"
                })
            }

            return res.status(200).json({
                msg : "Musica encontrada na playlist",
                playMusic
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: "Erro, contate o suporte",
            })
        }
    },
    update : async (req,res) => {
        try {

            const playMusic = await PlaylistMusicService.update(req.params.id, req.playMusic);

            if(!playMusic){
                return res.status(404).json({
                    msg : "Não foi encontrada a musica na playlist"
                })
            }

            return res.status(200).json({
                msg : "Musica atualizada na playlist",
                playMusic
            });


        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: "Erro, contate o suporte",
            })
        }
    },
    delete : async (req,res) => {
        try {
            const playMusic = await PlaylistMusicService.delete(req.params.id);

            if(!playMusic){
                return res.status(404).json({
                    msg : "Não foi encontrada a musica na playlist"
                })
            }

            return res.status(200).json({
                msg : "Musica deletada na playlist",
                playMusic
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: "Erro, contate o suporte",
            })
        }
    }
}

module.exports = PlaylistMusicController;