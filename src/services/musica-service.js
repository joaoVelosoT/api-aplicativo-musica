const Musica = require("../models/Musica");

const MusicaService = {
  create: async (data) => {
    try {
      return await Musica.create(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async () => {
    try {
      return await Musica.find();
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getOne: async (id) => {
    try {
      // console.log("id na musica",id)

      const musica = await Musica.findById(id);


      if(!musica){
        return {
          error : true,
          code : 404,
          msg : "Musica não encontrada"
        }
      }

      return {
        musica : musica,
        code : 200,
        msg : "Musica encontrada"
      }
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  update: async (id, data) => {
    try {
      return await Musica.findByIdAndUpdate(id, data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  delete: async (id) => {
    try {
      return await Musica.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};

module.exports = MusicaService;
