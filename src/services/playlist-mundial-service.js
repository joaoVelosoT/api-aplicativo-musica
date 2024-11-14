const PlaylistMundial = require("../models/PlaylistMundial");

const PlaylistMundialService = {
  create: async (data) => {
    try {
      return await PlaylistMundial.create(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async () => {
    try {
      return await PlaylistMundial.find();
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

      return playlist;
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

      return await playlist.updateOne(data);
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

      return await playlist.deleteOne();
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};

module.exports = PlaylistMundialService;
