const PlaylistMundialService = require("../services/playlist-mundial-service");

const PlaylistMundialController = {
  create: async (req, res) => {
    try {
        const data = req.playlist;
        const playMundial = await PlaylistMundialService.create(data);

        return res.status(playMundial.code).json({
            msg : playMundial.msg,
            playlistMundial : playMundial.playMundial
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg : "Erro, contate o suporte"
        })
    }
  },
  getAll: async (req, res) => {
    try {
        
        const playMundial = await PlaylistMundialService.getAll();

        return res.status(playMundial.code).json({
            msg : playMundial.msg,
            PlayListMundial : playMundial.playMundial
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg : "Erro, contate o suporte"
        })
    }
  },
  getOne: async (req, res) => {
    try {
        
        const { id } = req.params

        const playMundial = await PlaylistMundialService.getOne(id);

        if(playMundial.error){
            return res.status(playMundial.code).json({
                msg : playMundial.msg
            })
        }

        return res.status(playMundial.code).json({
            msg : playMundial.msg,
            PlaylistMundial : playMundial.playMundial
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg : "Erro, contate o suporte"
        })
    }
  },
  update: async (req, res) => {
    try {
        const data = req.playlist;
        const { id } = req.params;

        const playMundial = await PlaylistMundialService.update(id, data);

        if(playMundial.error){
            return res.status(playMundial.code).json({
                msg : playMundial.msg
            })
        }

        return res.status(playMundial.code).json({
            msg : playMundial.msg,
            playlistMundial : playMundial.playMundial
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg : "Erro, contate o suporte"
        })
    }
  },
  delete: async (req, res) => {
    try {
        
        const { id } = req.params;

        const playMundial = await PlaylistMundialService.delete(id);

        if(playMundial.error){
            return res.status(playMundial.code).json({
                msg : playMundial.msg,
                playlistMundial : playMundial.playMundial
            })
        }

        return res.status(playMundial.code).json({
            msg : playMundial.msg,
            playlistMundial : playMundial.playMundial
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg : "Erro, contate o suporte"
        })
    }
  },
};


module.exports = PlaylistMundialController;