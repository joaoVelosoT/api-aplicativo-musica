const UserService = require("../services/user-service");

const UserController = {
  create: async (req, res) => {
    try {

      const data = req.user

      const user = await UserService.create(data);

      if(!user){
        return res.status(401).json({
          msg : "Conta ja existente"
        })
      }

      return res.status(200).json({
        msg : "Usuario criado com sucesso",
        user
      })

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  getAll: async (req, res) => {
    try {
        
      const users = await UserService.getAll();
      return res.status(200).json({
        msg : "Todos os users",
        users
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  getOne: async (req, res) => {
    try {
        const {id} = req.params

        const user = await UserService.getOne(id);

        if(!user){
          return res.status(404).json({
            msg : "Usuario nao encontrado"
          })
        }

        return res.status(200).json({
          msg : "Usuario encontrado",
          user
        })
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  update: async (req, res) => {
    try {
      const {id} = req.params;

      const data = {
        nome : req.body.nome,
        email : req.body.email,
        senha : req.body.senha
      }

      const user = await UserService.update(id, data);

      if(!user){
        return res.status(404).json({
          msg : "Usuario nao encontrado"
        })
      }

      return res.status(200).json({
        msg : "Usuario atualizado com sucesso !",
        user
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const {id} = req.params;

      const user = await UserService.delete(id);

      if(!user){
        return res.status(404).json({
          msg : "Usuario nao encontrado"
        })
      }

      return res.status(200).json({
        msg : "Usuario deletado com sucesso !",
        user
      })

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  login: async (req, res) => {
    try {

      const data = {
        email : req.body.email,
        senha : req.body.senha
      }

      const login = await UserService.login(data);

      if(!login){
        return res.status(401).json({
          msg : "Login não autorizado"
        })
      }

      return res.status(200).json({
        msg : "Login autorizado",
        login
      })

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
};



module.exports = UserController;