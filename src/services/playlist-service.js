const Playlist = require("../models/Playlist");
const UserService = require("./user-service");

const PlaylistService = {
  create: async (data) => {
    try {
      // Buscando o user
      const user = await UserService.getOne(data.idUsuario);

      // Se não achar o user, devolver com o erro
      if (!user) {
        return {
          error: true,
          code: 404,
          msg: "Usuario não encontrado",
        };
      }

      // Criando a playlist
      const playlist = await Playlist.create(data);

      return {
        error: false,
        code: 201,
        msg: "Playlist criada com sucesso",
        playlist: {
          _id: playlist._id,
          nomePlaylist: playlist.nome,
          imagem: playlist.imagem,
          descricao: playlist.descricao,
        },
        user: {
          _id: user._id,
          nomeUsuario: user.nome,
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async (idUsuario) => {
    try {
      // Pegando as playlist do usuario
      const playlists = await Playlist.find({ idUsuario: idUsuario });

      // Criando um array da playlist com mais detalhes
      const playlistDetalhada = [];

      // Usando o for para pegar cada playlist, fazer um get no usuario, e colocar mais dados do usuario no objeto
      for (const playlistObj of playlists) {

        // Pegando o user com o id da playlistObj
        const user = await UserService.getOne(playlistObj.idUsuario);

        // Criando o objeto com o novo retorno detalhado
        const objetoPlaylist = {
          _id : playlistObj._id,
          nome: playlistObj.nome,
          imagem: playlistObj.imagem,
          descricao: playlistObj.descricao,
          user: {
            idUsuario: playlistObj.idUsuario,
            nomeUsuario: user.nome,
            emailUsuario : user.email
          },
        };
        // Adicionando o objetoPlaylist na playlistDetalhada
        playlistDetalhada.push(objetoPlaylist);
      }

      return playlistDetalhada;
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getOne: async (id, idUsuario) => {
    try {
      // Pegando o user
      const user = await UserService.getOne(idUsuario);
      // Pegando a playlist
      const playlist = await Playlist.findOne({
        _id: id,
        idUsuario: idUsuario,
      });

      // Se não achar a playlist, devolver objeto com o erro, code e msg
      if(!playlist){
        return {
          error : true,
          code : 404,
          msg : "Playlist não encontrada"
        }
      }

      // Se achar a playlist, devolver o objeto com o user detalhado
      return {
        msg: "Playlist achada com sucesso",
        playlist: {
          _id: playlist._id,
          nomePlaylist: playlist.nome,
          imagem: playlist.imagem,
          descricao: playlist.descricao,
        },
        user: {
          _id: user._id,
          nomeUsuario: user.nome,
        },
      };
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
