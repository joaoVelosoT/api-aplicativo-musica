const MusicaFavoritaService = require("../services/musica-favorita-service");

const MusicaFavoritaController = {
    create : async (req,res) =>  {
        try {
            const {id} = req.user;
            const data = req.musicaFavorita;
           

            
            const musicFavorita = await MusicaFavoritaService.create(data, id);
            if(musicFavorita.error){
                return res.status(400).json({
                    msg : musicFavorita.msg
                })
            }

            return res.status(200).json({
                msg : "Musica favorita adicionada com sucesso",
                musicFavorita
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
    getOne : (req,res) =>  {
        try {
            
            const id = req.user
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    update : (req,res) =>  {
        try {
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
    delete : (req,res) =>  {
        try {
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : "Erro, contate o suporte"
            })
        }
    },
}


module.exports = MusicaFavoritaController;