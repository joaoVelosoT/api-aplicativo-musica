const MusicaService = require("../services/musica-service");

const MusicaController = {
    create : async (req,res) => {
        try {
            const data = {
                nome : req.body.nome,
                genero : req.body.genero,
                artista : req.body.artista
            }

            const musica = await MusicaService.create(data);

            return res.status(200).json({
                msg : "Musica criada com sucesso",
                musica
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
            
            const musicas = await MusicaService.getAll();
            return res.status(200).json({
                msg : "Todas as musicas",
                musicas
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
            const {id} = req.params

            const musica = await MusicaService.getOne(id);

            if(musica.error){
                return res.status(musica.code).json({
                    msg : musica.msg
                })
            }


            return res.status(musica.code).json({
                msg : musica.msg,
                musica : musica.musica
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: "Erro, contate o suporte",
            })
        }
    },
    update : async (req,res) => {
        try {
            const {id} = req.params
            const data = {
                nome : req.body.nome,
                genero : req.body.genero,
                artista : req.body.artista
            }

            const musica = await MusicaService.update(id, data);
            if(!musica){
                return res.status(404).json({
                    msg : "Musica não encontrada"
                })
            }

            return res.status(200).json({
                msg : "Musica atualizada com sucesso",
                musica
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: "Erro, contate o suporte",
            })
        }
    },
    delete : async (req,res) => {
        try {
            const {id} = req.params;
            const musica = await MusicaService.delete(id);

            if(!musica){
                return res.status(404).json({
                    msg : "Musica não encontrada"
                })
            }

            return res.status(200).json({
                msg : "Musica deletada com sucesso",
                musica
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: "Erro, contate o suporte",
            })
        }
    },
};

module.exports = MusicaController;