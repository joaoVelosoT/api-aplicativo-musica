const MusicaValidate = (req, res, next) => {
  const { nome, genero, artista } = req.body;

  if(!nome || typeof nome != 'string'){
    return res.status(400).json({
        msg: "Valide seus dados"
    })
  }

  if(!genero || typeof genero != 'string'){
    return res.status(400).json({
        msg: "Valide seus dados"
    })
  }

  if(!artista || typeof artista != 'string'){
    return res.status(400).json({
        msg: "Valide seus dados"
    })
  }

  return next();
};


const MusicaValidateID = (req, res, next) => {
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

  module.exports = { MusicaValidate, MusicaValidateID};