const PlaylistMundial = require("../models/PlaylistMundial");

const PlaylistMundialService = {
  create: async (data) => {
    try {
      return {
        playMundial : await PlaylistMundial.create(data),
        msg : "Playlist mundial criada com sucesso !",
        code : 201
    }
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async () => {
    try {

      return {
        playMundial : await PlaylistMundial.find(),
        code : 200,
        msg : "Todas as playlist mundiais"
    }

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
        playMundial : playlist,
        code : 200,
        msg : "Playlist Mundial encontrada",
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
        playMundial : await playlist.updateOne(data),
        code : 200,
        msg : "Playlist Mundial deletada com sucesso"
    }
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  delete: async (id) => {
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
        playMundial : await playlist.deleteOne(),
        code : 200,
        msg : "Playlist mundial deletada com sucesso"

      }
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};

module.exports = PlaylistMundialService;
