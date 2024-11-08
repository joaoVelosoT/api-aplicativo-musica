const PlaylistMusic = require("../models/Playlist-Music");
const MusicaService = require("./musica-service");
const PlaylistService = require("./playlist-service");
const PlaylistMusicService = {
  create: async (data, idUsuario) => {
    try {
      // Validar se existe a musica
      const existeMusica = await MusicaService.getOne(data.idMusica);
      if (!existeMusica) {
        return {
          error: true,
          msg: "Musica não encontrada",
        };
      }
      
      // Validar se existe a playlist
      console.log(data.idPlaylist, idUsuario)
      const existePlaylist = await PlaylistService.getOne(data.idPlaylist, idUsuario);
      
      
      if (!existePlaylist) {
        return {
          error: true,
          msg: "Playlist não encontrada",
        };
      }

      // Validar se existe já existe a musica na playlist
      const musicasPlaylist = await PlaylistMusicService.getAll(idUsuario);
      const existeMusicPlaylist = () => {
        var retorno = null;
        musicasPlaylist.filter((musica) => {
          if (musica.idMusica === existeMusica.id) {
            return (retorno = true);
          }
        });
        return retorno;
      };

      // Se a musica ja existe na playlist, devolver mensagem de erro
      if (existeMusicPlaylist()) {
        return {
          error: true,
          msg: "Essa musica ja existe na playlist",
        };
      }

      data.idUsuario = idUsuario;

      return await PlaylistMusic.create(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async (idUsuario) => {
    try {
      return PlaylistMusic.find({ idUsuario: idUsuario });
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getOne: async (idUsuario, id) => {
    try {
      return await PlaylistMusic.findOne({
        idUsuario: idUsuario,
        _id: id,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  update: async (idUsuario, id, data) => {
    try {
        
      // Validar se existe a musica
      if (data.idMusica) {
        var existeMusica = await MusicaService.getOne(data.idMusica);
        console.log(existeMusica);
        if (!existeMusica) {
          return {
            error: true,
            msg: "Musica não encontrada",
          };
        }
      }

      // Validar se existe a playlist
      if (data.idPlaylist) {
        var existePlaylist = await PlaylistService.getOne(
          data.idPlaylist,
          idUsuario
        );
        if (!existePlaylist) {
          return {
            error: true,
            msg: "Playlist não encontrada",
          };
        }
      }

      // Validar se existe já existe a musica na playlist
      const musicasPlaylist = await PlaylistMusicService.getAll(idUsuario);
      const existeMusicPlaylist = () => {
        var retorno = null;
        musicasPlaylist.filter((musica) => {
          if (musica.idMusica === existeMusica.id) {
            return (retorno = true);
          }
        });
        return retorno;
      };

      // Se a musica ja existe na playlist, devolver mensagem de erro
      if (existeMusicPlaylist()) {
        return {
          error: true,
          msg: "Essa musica ja existe na playlist",
        };
      }
      const playMusic = await PlaylistMusic.findOne({
        idUsuario: idUsuario,
        _id: id,
      });

      if (!playMusic) {
        return {
          error: true,
          msg: "Não foi encontrada a musica na playlist",
        };
      }

      return playMusic.updateOne(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  delete: async (idUsuario, id) => {
    try {
      const playMusic = await PlaylistMusic.findOne({
        idUsuario: idUsuario,
        _id: id,
      });

      if (!playMusic) {
        return {
          error: true,
          msg: "Não foi encontrada a musica na playlist",
        };
      }

      return await playMusic.deleteOne();
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getByPlaylist : async (idUsuario, idPlaylist) => {
    try {
      
      const musicPlay = await PlaylistMusic.find({
        idUsuario : idUsuario,
        idPlaylist : idPlaylist
      })

      return musicPlay


    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
      
    }
  }
};

module.exports = PlaylistMusicService;
