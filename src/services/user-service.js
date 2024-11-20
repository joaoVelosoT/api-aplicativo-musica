const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const UserService = {
  create: async (data) => {
    try {
      // Procurando no banco de dados se existe ja existe esse email
      const existeEmail = await User.findOne({ email: data.email });
      // console.log(existeEmail);
      if (existeEmail) {
        return null;
      }
      // Criptografando a senha do usuario
      const senhaCript = await bcrypt.hash(data.senha, 10);

      // Colocando a senha criptografada na data
      data.senha = senhaCript;

      // Retornando o user criado
      return await User.create(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async () => {
    try {
      return await User.find();
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getOne: async (id) => {
    try {
      const user = await User.findById(id);

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  update: async (id, data) => {
    try {
      const user = await User.findOne({ email: data.email });

      if (user) {
        return {
          error: true,
          code: 404,
          msg: "Conta ja existente",
        };
      }
      return await User.findByIdAndUpdate(id, data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  delete: async (id) => {
    try {

      const PlaylistService = require("./playlist-service");

      const user = await User.findById(id);

      if (!user) {
        return {
          error: true,
          code: 404,
          msg: "Usuario não encontrado",
        };
      }

      // Deletar as playlist
      const playlists = await PlaylistService.getAll(id);
      if(playlists.error){
        return playlists
      }
      playlists.forEach(async(playlist) => {
        const deletarPlaylist = await PlaylistService.delete(playlist._id, id);
        if(deletarPlaylist.error){
            return deletarPlaylist
        }
      })


      // Deletar as musicas favoritas



      
      return {
        code : 200,
        msg : "Usuario deletado com sucesso !",
        user : await User.findByIdAndDelete(id)
      }
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  login: async (data) => {
    try {
      const user = await User.findOne({ email: data.email });

      if (!user) {
        return null;
      }

      if ((await bcrypt.compare(data.senha, user.senha)) === false) {
        return null;
      }

      // console.log(await bcrypt.compare(data.senha, user.senha))

      const token = await jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.SECRET,
        { expiresIn: "10h" }
      );

      return {
        token,
        user : user._id
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};

module.exports = UserService;
