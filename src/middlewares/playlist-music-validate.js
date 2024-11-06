const PlaylistMusicValidate = (req,res,next) => {
    const { idMusica, idPlaylist } = req.body;


    
    // if(req.method === 'PUT'){

    //   if(!idMusica || typeof idMusica != 'string' && !idPlaylist || typeof idPlaylist != 'string'){
    //     return res.status(400).json({
    //       msg: "Valide seus dados"
    //   })
    //   }

    //   const data = {
    //     idMusica : idMusica,
    //     idPlaylist : idPlaylist,
    //   }
    //   req.playMusic = data;
    //   return next();

    // }



    if(!idMusica || typeof idMusica != 'string' || idMusica.length > 24 || idMusica.length < 24){
        return res.status(400).json({
            msg: "Valide seus dados"
        })
    }

    if(!idPlaylist || typeof idPlaylist != 'string' || idPlaylist.length > 24 || idPlaylist.length < 24){
        return res.status(400).json({
            msg: "Valide seus dados"
        })
    }


    const data = {
      idMusica : idMusica,
      idPlaylist : idPlaylist,
    }

    req.playMusic = data;
    return next();
}

const PlaylistMusicValidateId = (req,res,next) => {
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
}

module.exports = {PlaylistMusicValidate, PlaylistMusicValidateId};