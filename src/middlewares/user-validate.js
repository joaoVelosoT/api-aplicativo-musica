const UserValidate = (req, res, next) => {
  const { nome, email, senha, fotoPerfil} = req.body;

  if (!nome || typeof nome != "string") {
    return res.status(400).json({
      msg: "Valide seus dados",
    });
  }

  if (!email || typeof email != "string") {
    return res.status(400).json({
      msg: "Valide seus dados",
    });
  }

  if (!senha || typeof senha != "string") {
    return res.status(400).json({
      msg: "Valide seus dados",
    });
  }

  if (!fotoPerfil || typeof fotoPerfil != 'string'){
    const data = {
      nome: nome,
      email : email,
      senha : senha,
      fotoPerfil : "https://static.vecteezy.com/ti/vetor-gratis/p1/26434417-padrao-avatar-perfil-icone-do-social-meios-de-comunicacao-do-utilizador-foto-vetor.jpg"
    }
  
    req.user = data
    return next();
  }
  
  const data = {
    nome: nome,
    email : email,
    senha : senha,
    fotoPerfil : fotoPerfil
  }

  req.user = data
  return next();
};

const UserValidateID = (req, res, next) => {
  const { id } = req.params;

  if (!id || typeof id != "string") {
    return res.status(400).json({
      msg: "Valide seus parametros",
    });
  }

  // Validando se o id enviado esta correto, pos o id do mongodb e composto por 24 caracteres
  if (id.length > 24 || id.length < 24) {
    return res.status(400).json({
      msg: "Valide seus parametros",
    });
  }

  return next();
};

const UserValidadeLogin = (req, res, next) => {
  const { email, senha } = req.body;

  if (!email || typeof email != "string") {
    return res.status(400).json({
      msg: "Valide seus dados",
    });
  }

  if (!senha || typeof senha != "string") {
    return res.status(400).json({
      msg: "Valide seus dados",
    });
  }

  return next();
};

module.exports = { UserValidate, UserValidateID ,UserValidadeLogin};
