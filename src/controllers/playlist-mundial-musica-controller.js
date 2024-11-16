const PlaylistMundialMusicService = require("../services/playlist-mundial-musica-service");

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
            
            const todasMusicasPlaylistMundial = await PlaylistMundialMusicService.getAll();

            if(todasMusicasPlaylistMundial.error){
                return res.status(todasMusicasPlaylistMundial.code).json({
                    msg : todasMusicasPlaylistMundial.msg
                })
            }

            return res.status(todasMusicasPlaylistMundial.code).json({
                msg : todasMusicasPlaylistMundial.msg,
                todasMusicasPlaylistMundial : todasMusicasPlaylistMundial.arrayDetalhado
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    getOne : async (req,res) => {
        try {
            const { id } = req.params

            const musicaPlaylistMundial = await PlaylistMundialMusicService.getOne(id);

            if(musicaPlaylistMundial.error){
                return res.status(musicaPlaylistMundial.code).json({
                    msg : musicaPlaylistMundial.msg
                })
            }

            return res.status(musicaPlaylistMundial.code).json({
                msg : musicaPlaylistMundial.msg,
                musicaPlaylistMundial : musicaPlaylistMundial.obj
            })


        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    getByPlaylist : async (req,res) => {
        try {
            
            const { id } = req.params;

            const musicasPlaylistMundial = await PlaylistMundialMusicService.getByPlaylist(id);

            if(musicasPlaylistMundial.error){
                return res.status(musicasPlaylistMundial.code).json({
                    msg : musicasPlaylistMundial.msg
                })
            }


            return res.status(musicasPlaylistMundial.code).json({
                msg : musicasPlaylistMundial.msg,
                musicasPlaylistMundial : musicasPlaylistMundial.arrayDetalhado
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    update : async (req,res) => {
        try {
            const { id } = req.params;
            const data = req.musicPlaylist;

            const playMusic = await PlaylistMundialMusicService.update(id, data);

            if(playMusic.error){
                return res.status(playMusic.code).json({
                    msg : playMusic.msg
                })
            }


            return res.status(playMusic.code).json({
                msg : playMusic.msg,
                musicaPlaylistMundial : playMusic.playlistMundialMusica
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    delete : async (req,res) => {
        try {
            const { id } = req.params;

            const playMusic = await PlaylistMundialMusicService.delete(id);

            if(playMusic.error){
                return res.status(playMusic.code).json({
                    msg : playMusic.msg
                })
            }


            return res.status(playMusic.code).json({
                msg : playMusic.msg,
                musicaPlaylistMundial : playMusic.musicaPlaylistMundial
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    }
}


module.exports = PlaylistMundialMusicController