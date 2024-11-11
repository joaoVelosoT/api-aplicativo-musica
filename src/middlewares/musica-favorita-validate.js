const MusicaFavoritaValidate = (req, res, next) => {
  const { idMusica} = req.body;

  if (!idMusica || typeof idMusica != "string") {
    return res.status(400).json({
      msg: "Valide seus dados",
    });
  }

  

  if (!validateId(idMusica)) {
    return res.status(400).json({
      msg: "Valide seus dados",
    });
  }

  const data = {
    idMusica : idMusica,
  }

  req.musicaFavorita = data

  return next();
};

const MusicaFavoritaValidateID = (req, res, next) => {
  const { id } = req.params;

  if (!id || typeof id != "string") {
    return res.status(400).json({
      msg: "Valide seus parametros",
    });
  }

  if (!validateId(id)) {
    return res.status(400).json({
      msg: "Valide seus parametros",
    });
  }

  return next();
};

const validateId = (id) => {
  if (!id || typeof id != "string") {
    return false;
  }

  // Validando se o id enviado esta correto, pos o id do mongodb e composto por 24 caracteres
  if (id.length > 24 || id.length < 24) {
    return false;
  }

  return true;
};

module.exports = { MusicaFavoritaValidate, MusicaFavoritaValidateID };
