const PlaylistMundialMusicaValidate = (req, res, next) => {
  const { idMusica, idPlaylist } = req.body;

  if (!validateId(idMusica) || !validateId(idPlaylist)) {
    return res.status(400).json({
      msg: "Valide seus dados",
    });
  }

  const data = {
    idMusica : idMusica,
    idPlaylist : idPlaylist
  }
  req.musicPlaylist = data 

  return next();
};

const PlaylistMundialMusicaValidateId = (req, res, next) => {
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


module.exports = { PlaylistMundialMusicaValidate, PlaylistMundialMusicaValidateId}