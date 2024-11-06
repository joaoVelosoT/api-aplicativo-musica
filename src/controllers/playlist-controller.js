const PlaylistService = require("../services/playlist-service");

const PlaylistController = {
  create: async (req, res) => {
    try {

        // console.log(req.user);

        const data = {
          nome : req.body.nome,
           
        }

        const playlist = await PlaylistService.create(data);

        return res.status(200).json({
          msg : "Playlist criada com sucesso",
          playlist
        })

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  getAll: async (req, res) => {
    try {

      const idUsuario = req.user.id
      const playlists = await PlaylistService.getAll(idUsuario);

      return res.status(200).json({
        msg : "Playlists criadas",
        playlists
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  getOne: async (req, res) => {
    try {

      const { id } = req.params;
      const idUsuario = req.user.id;

      const playlist = await PlaylistService.getOne(id, idUsuario);

      if(!playlist){
        return res.status(404).json({
          msg : "Playlist não encontrada"
        })
      };

      return res.status(200).json({
          msg : "Playlist encontrada",
          playlist
      })

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  update: async (req, res) => {
    try {

      const idUsuario = req.user.id;

      const { id } = req.params

      const data = {
        nome : req.body.nome,
        idUsuario : req.user.id
      }

      const playlist = await PlaylistService.update(id, idUsuario, data);

      if(!playlist){
        return res.status(404).json({
          msg : "Playlist não encontrada"
        })
      };

      return res.status(200).json({
        msg : "Playlist atualizada",
        playlist
    })

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  delete: async (req, res) => {
    try {

      const idUsuario = req.user.id;
      const { id } = req.params

      const playlist = await PlaylistService.delete(id, idUsuario);

      if(!playlist){
        return res.status(404).json({
          msg : "Playlist não encontrada"
        })
      };

      return res.status(200).json({
        msg : "Playlist deletada com sucesso",
        playlist
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
};


module.exports = PlaylistController