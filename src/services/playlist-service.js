const Playlist = require("../models/Playlist");
const UserService = require("./user-service");
// const PlaylistMusicService = require("./playlist-music-service");

const PlaylistService = {
  create: async (data) => {
    try {
      const user = await UserService.getOne(data.idUsuario);
      if (!user) {
        return {
            error : true,
            code : 404,
            msg : "Usuario não encontrado"
        }
      }

      const playlist = await Playlist.create(data);

      return {
        error: false,
        code: 201,
        msg: "Playlist criada com sucesso",
        playlist: {
            _id : playlist._id,
          nomePlaylist: playlist.nome,
        
        },
        user : {
            _id : user._id,
            nomeUsuario : user.nome 
        }
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async (idUsuario) => {
    try {
      console.log(idUsuario);

      return await Playlist.find({ idUsuario: idUsuario });
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getOne: async (id, idUsuario) => {
    try {
      const playlist = await Playlist.findOne({
        _id: id,
        idUsuario: idUsuario,
      });

      return playlist;
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  update: async (id, idUsuario, data) => {
    try {
      const playlist = await Playlist.findOne({
        _id: id,
        idUsuario: idUsuario,
      });

      if (!playlist) {
        return null;
      }

      return await playlist.updateOne(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  delete: async (id, idUsuario) => {
    try {
      const playlist = await Playlist.findOne({
        _id: id,
        idUsuario: idUsuario,
      });

      return await playlist.deleteOne();
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};

module.exports = PlaylistService;
