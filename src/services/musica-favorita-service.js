const MusicaFavorita = require("../models/MusicaFavorista");
const MusicaService = require("./musica-service");
const UserService = require("./user-service");

const MusicaFavoritaService = {
  create: async (data, idUsuario) => {
    try {
      data.idUsuario = idUsuario;

      // Validando se existe a musica
      const existeMusica = await MusicaService.getOne(data.idMusica);
      if (existeMusica.error) {
        return existeMusica
      }

      // Validando se ja existe essa musica nos favoritos
      const existeMusicaFavorita = await MusicaFavorita.findOne({
        idMusica: data.idMusica,
        idUsuario : idUsuario
      });
      if (existeMusicaFavorita) {
        return {
          error: true,
          code : 400,
          msg: "Já existe essa musica na playlist",
        };
      }

      const musicFavorita = await MusicaFavorita.create(data);
      return {
        msg : "Musica adicionada aos favoritos",
        code : 201,
        musicFavorita
      };
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

      const arrayDetalhado = []

      for(const musica of musicasFavoritas){
        // Pegando a validando a musica
        const musicaUser = await MusicaService.getOne(musica.idMusica);
        if(musicaUser.error){
          return musicaUser
        }

        // Pegando a validando o user
        const user = await UserService.getOne(musica.idUsuario);
        if(user.error){
          return user
        }

        const obj = {
          _id : musica._id,
          musica : {
            _id : musicaUser.musica._id,
            nomeMusica : musicaUser.musica.nome,
            imagemMusica : musicaUser.musica.imagem,
            generoMusica : musicaUser.musica.genero,
            artista : musicaUser.musica.artista

          },
          usuario : {
            _id : user._id,
            nomeUsuario : user.nome
          }
        }
        arrayDetalhado.push(obj);
      }

      console.log(arrayDetalhado);

      return arrayDetalhado;
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
        return {
          error : true,
          code : 404,
          msg : "Musica favorita não encontrada"
        };
      }

      // Pegando a validando a musica
      const musicaUser = await MusicaService.getOne(musicaFavorita.idMusica);
      if(musicaUser.error){
        return musicaUser
      }

      // Pegando a validando o user
      const user = await UserService.getOne(musicaFavorita.idUsuario);
      if(user.error){
        return user
      }

      const obj = {
        _id : musicaFavorita._id,
        musica : {
          _id : musicaUser.musica._id,
            nomeMusica : musicaUser.musica.nome,
            imagemMusica : musicaUser.musica.imagem,
            generoMusica : musicaUser.musica.genero,
            artista : musicaUser.musica.artista
        },
        usuario : {
          _id : user._id,
          nomeUsuario : user.nome
        }
      }


      

      return obj;
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
