const Musica = require("../models/Musica");
const Playlist = require("../models/Playlist");
const PlaylistMusic = require("../models/Playlist-Music");

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

      // Validando se a musica existe
      const musica = await MusicaService.getOne(id);
      if(!musica){
        return musica
      }
      // Pegando todas as playlist que usam essa musica e deletando todas
      const musicasPlaylist = await PlaylistMusic.find({idMusica : id});
      musicasPlaylist.forEach(async(musica) => {
        await musica.deleteOne();
      })

      
      return {
        msg : "Musica deletada com sucesso",
        code : 200,
        musica : await Musica.findByIdAndDelete(id)
      }
      // return await Musica.findByIdAndDelete(id);


    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};

module.exports = MusicaService;
