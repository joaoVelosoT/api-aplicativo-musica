const MusicaFavorita = require("../models/MusicaFavorista");
const MusicaService = require("./musica-service");

const MusicaFavoritaService = {
  create: async (data, idUsuario) => {
    try {

      data.idUsuario = idUsuario;
      // Validando se existe a musica
      const existeMusica = await MusicaService.getOne(data.idMusica);
      if(!existeMusica){
        return {
          error : true,
          msg : "Não existe essa musica"
        }
      }

      // Validando se ja existe essa musica nos favoritos
      const existeMusicaFavorita = await MusicaFavorita.findOne({idMusica : data.idMusica});
      if(existeMusicaFavorita){
        return {
          error : true,
          msg : "Já existe essa musica na playlist"
        }
      }

      const musicFavorita = await MusicaFavorita.create(data);
      return musicFavorita
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async (idUsuario) => {
    try {

      const musicasFavoritas = await MusicaFavorita.find({idUsuario : idUsuario});

      return musicasFavoritas
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getOne: async () => {
    try {
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  update: async () => {
    try {
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  delete: async () => {
    try {
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};


module.exports = MusicaFavoritaService;