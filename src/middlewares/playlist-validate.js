const PlaylistValidate = (req,res,next) => {

    const {nome, imagem, descricao} = req.body;

    if(!nome || typeof nome != 'string'){
        return res.status(400).json({
            msg: "Valide seus dados"
        })
    };

    if(!imagem || typeof imagem != 'string'){
        const data = {
            nome : nome,
            imagem : "https://cdn.icon-icons.com/icons2/3873/PNG/512/music_playlist_icon_244657.png",
            descricao : descricao
        }
    
        req.playlist = data;
    
    
        return next();
    };

    // if(!descricao || typeof descricao != 'string'){
    //     return res.status(400).json({
    //         msg: "Valide seus dados"
    //     })
    // };



    const data = {
        nome : nome,
        imagem : imagem,
        descricao : descricao
    }

    req.playlist = data;


    return next();
}


const PlaylistValidateId = (req,res,next) => {
    const {id} = req.params;

    if(!id || typeof id != 'string'){
        return res.status(400).json({
            msg : "Valide seus parametros"
        })
    };

     // Validando se o id enviado esta correto, pos o id do mongodb e composto por 24 caracteres
     if (id.length > 24 || id.length < 24) {
        return res.status(400).json({
          msg: "Valide seus parametros",
        });
      }
    
      return next();
}

module.exports = {PlaylistValidate, PlaylistValidateId};