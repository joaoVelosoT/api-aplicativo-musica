const MusicaFavorita = require("../models/MusicaFavorista");
const MusicaService = require("./musica-service");

const MusicaFavoritaService = {
  create: async (data, idUsuario) => {
    try {
      data.idUsuario = idUsuario;
      // Validando se existe a musica
      const existeMusica = await MusicaService.getOne(data.idMusica);
      if (!existeMusica) {
        return {
          error: true,
          msg: "Não existe essa musica",
        };
      }

      // Validando se ja existe essa musica nos favoritos
      const existeMusicaFavorita = await MusicaFavorita.findOne({
        idMusica: data.idMusica,
      });
      if (existeMusicaFavorita) {
        return {
          error: true,
          msg: "Já existe essa musica na playlist",
        };
      }

      const musicFavorita = await MusicaFavorita.create(data);
      return musicFavorita;
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async (idUsuario) => {
    try {
      const musicasFavoritas = await MusicaFavorita.find({
        idUsuario: idUsuario,
      });

      return musicasFavoritas;
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getOne: async (idUsuario, id) => {
    try {
      const musicaFavorita = await MusicaFavorita.findOne({
        _id: id,
        idUsuario: idUsuario,
      });

      if (!musicaFavorita) {
        return null;
      }

      return musicaFavorita;
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  update: async (idUsuario, id, data) => {
    try {

      // Validando se existe a musica
      const existeMusica = await MusicaService.getOne(data.idMusica);
      if (!existeMusica) {
        return {
          error: true,
          code: 404,
          msg: "Musica não encontrada",
        };
      }

      // Validando se ja existe essa musica nos favoritos do usuario
      const existeMusicaFavorita = await MusicaFavorita.findOne({
        idMusica: data.idMusica,
        idUsuario : idUsuario
      });

      // Se tiver a musica na playlist, devolve o erro
      if (existeMusicaFavorita) {
        return {
          error: true,
          code: 409,
          msg: "A música ja esta presente na playlist",
        };
      }

      // Pegando a musica da playlist
      const musicaFavorita = await MusicaFavorita.findOne({
        _id: id,
        idUsuario: idUsuario,
      });

      // Devolvendo com a musica atualizada
      return await musicaFavorita.updateOne(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  delete: async (idUsuario, id) => {
    try {

      const musicaFavorita = await MusicaFavorita.findOne({_id : id, idUsuario : idUsuario});
      
      if(!musicaFavorita){
        return {
          error : true,
          code : 404,
          msg : "Musica não encontrada na playlist"
        }
      }
      return await musicaFavorita.deleteOne();
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};

module.exports = MusicaFavoritaService;
