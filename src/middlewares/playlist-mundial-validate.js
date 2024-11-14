const PlaylistMundialValidate = (req, res, next) => {
  const { nome, imagem, descricao, categoria } = req.body;

  if (!nome || typeof nome != "string") {
    return res.status(400).json({
      msg: "Revise seus dados",
    });
  }

  if (!imagem || typeof imagem != "string") {
    return res.status(400).json({
      msg: "Revise seus dados",
    });
  }

  if (!descricao || typeof descricao != "string") {
    return res.status(400).json({
      msg: "Revise seus dados",
    });
  }

  if (!categoria || typeof categoria != "string") {
    return res.status(400).json({
      msg: "Revise seus dados",
    });
  }

  return next();
};

const PlaylistMundialValidateId = (req, res, next) => {
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


module.exports = {PlaylistMundialValidate, PlaylistMundialValidateId}