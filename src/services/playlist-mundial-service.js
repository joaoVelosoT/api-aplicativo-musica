const PlaylistMundial = require("../models/PlaylistMundial");
// const PlaylistMundialMusicService = require("./playlist-mundial-musica-service");

const PlaylistMundialService = {
  create: async (data) => {
    try {
      return {
        playMundial: await PlaylistMundial.create(data),
        msg: "Playlist mundial criada com sucesso !",
        code: 201,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async () => {
    try {
      return {
        playMundial: await PlaylistMundial.find(),
        code: 200,
        msg: "Todas as playlist mundiais",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getOne: async (id) => {
    try {
      const playlist = await PlaylistMundial.findOne({ _id: id });

      if (!playlist) {
        return {
          error: true,
          code: 404,
          msg: "Playlist Mundial não encontrada",
        };
      }

      return {
        playMundial: playlist,
        code: 200,
        msg: "Playlist Mundial encontrada",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  update: async (id, data) => {
    try {
      const playlist = await PlaylistMundial.findOne({ _id: id });

      if (!playlist) {
        return {
          error: true,
          code: 404,
          msg: "Playlist Mundial não encontrada",
        };
      }

      return {
        playMundial: await playlist.updateOne(data),
        code: 200,
        msg: "Playlist Mundial deletada com sucesso",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  delete: async (id) => {
    try {
      const PlaylistMundialMusicService = require("./playlist-mundial-musica-service");

      // Validar se existe a playlist
      const playlist = await PlaylistMundial.findOne({ _id: id });
      if (!playlist) {
        return {
          error: true,
          code: 404,
          msg: "Playlist Mundial não encontrada",
        };
      }

      // console.log(playlist);
      
      // Pegar todas as musicas da playlist
      const musicasPlaylist = await PlaylistMundialMusicService.getByPlaylist(
        playlist._id
      );

      if(musicasPlaylist.error){
        return musicasPlaylist
      }
      
      // Percorrer as musicas, para deletar as musicas da playlist
      musicasPlaylist.arrayDetalhado.forEach(async(musica) => {
         const musicaDelete = await PlaylistMundialMusicService.delete(musica._id);

         if(musicaDelete.error){
          return musicaDelete
         }
      })


      return {
        playMundial : await playlist.deleteOne(),
        code: 200,
        msg: "Playlist mundial deletada com sucesso",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};

module.exports = PlaylistMundialService;
