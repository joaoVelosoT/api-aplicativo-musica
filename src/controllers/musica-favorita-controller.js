const MusicaFavoritaService = require("../services/musica-favorita-service");

const MusicaFavoritaController = {
    create : async (req,res) =>  {
        try {
            const {id} = req.user;
            const data = req.musicaFavorita;
           

            
            const musicFavorita = await MusicaFavoritaService.create(data, id);
            if(musicFavorita.error){
                return res.status(musicFavorita.code).json({
                    msg : musicFavorita.msg
                })
            }

            return res.status(musicFavorita.code).json({
                msg : musicFavorita.msg,
                musicFavorita : musicFavorita.musicFavorita
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    getAll : async(req,res) =>  {
        try {
            const {id} = req.user;
            
            const musicasFavoritas = await MusicaFavoritaService.getAll(id);

            return res.status(200).json({
                msg : "Todas as musicas da playlist",
                musicasFavoritas
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    getOne : async(req,res) => {
        try {
            
            const idUsuario = req.user.id;
            const {id} = req.params;
            const musicaFavorita = await MusicaFavoritaService.getOne(idUsuario, id);

            if(!musicaFavorita){
                return res.status(404).json({
                    msg : "Musica favorita não encontrada"
                })
            }

            return res.status(200).json({
                msg : "Musica favorita encontrada com sucesso",
                musicaFavorita
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    update : async (req,res) =>  {
        try {
            const idUsuario = req.user.id;

            const { id } = req.params;

            const data = req.musicaFavorita

            const musicaFavorita = await MusicaFavoritaService.update(idUsuario, id, data);
            
            if(musicaFavorita.error){
                return res.status(musicaFavorita.code).json({
                   msg : musicaFavorita.msg
                })
            }

            return res.status(200).json({
                msg : "Musica favorita atualizada com sucesso",
                musicaFavorita
            })
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    delete : async(req,res) =>  {
        try {
            const idUsuario = req.user.id;
            const { id } = req.params;

            const musicaFavorita = await MusicaFavoritaService.delete(idUsuario, id);

            if(musicaFavorita.error){
                return res.status(musicaFavorita.code).json({
                  msg : musicaFavorita.msg
                })
              }
            return res.status(200).json({
                msg : "Musica Favorita deletada com sucesso",
                musicaFavorita
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
}


module.exports = MusicaFavoritaController;