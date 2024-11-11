const PlaylistMusicService = require("../services/playlist-music-service");

const PlaylistMusicController = {
  create: async (req, res) => {
    try {
      const playMusic = await PlaylistMusicService.create(
        req.playMusic,
        req.user.id
      );

      if (playMusic.error) {
        return res.status(400).json({
          msg: playMusic.msg,
        });
      }
      return res.status(200).json({
        msg: "Musica adicionada na playlist",
        playMusic,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const playMusics = await PlaylistMusicService.getAll(req.user.id);

      return res.status(200).json({
        msg: "Todas as musicas",
        playMusics,
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
      const idUsuario = req.user.id;
      const { id } = req.params;

      const playMusic = await PlaylistMusicService.getOne(idUsuario, id);

      if (!playMusic) {
        return res.status(404).json({
          msg: "Não foi encontrada a musica na playlist",
        });
      }

      return res.status(200).json({
        msg: "Musica encontrada na playlist",
        playMusic,
      });
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
      const { id } = req.params;
      const data = req.playMusic;

      const playMusic = await PlaylistMusicService.update(idUsuario, id, data);


      if(playMusic.error){
        return res.status(400).json({
          msg : playMusic.msg
        })
      }

      return res.status(200).json({
        msg: "Musica atualizada na playlist",
        playMusic,
      });

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
      const { id } = req.params;

      const playMusic = await PlaylistMusicService.delete(idUsuario, id);

      if(playMusic.error){
        return res.status(400).json({
          msg : playMusic.msg
        })
      }

      // if (!playMusic) {
      //   return res.status(404).json({
      //     msg: "Não foi encontrada a musica na playlist",
      //   });
      // }

      return res.status(200).json({
        msg: "Musica deletada na playlist",
        playMusic,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  getByPlaylist : async (req,res) => {

    const {id} = req.params;
    const idUsuario = req.user.id;

    const playMusic = await PlaylistMusicService.getByPlaylist(idUsuario, id);

    if(playMusic.error){
      return res.status(404).json({
        msg : playMusic.msg
      })
    }

    return res.status(200).json({
      msg : "Musicas da playlist",
      playMusic
    })


  }
};

module.exports = PlaylistMusicController;
