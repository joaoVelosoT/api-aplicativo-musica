const jwt = require('jsonwebtoken');

const TokenAuthenticate = (req,res,next) => {

    const token = req.headers.authorization;

    console.log(req.headers);
    // console.log("o token aqui",token);
    if(!token){
        return res.status(401).json({
            msg : "Acesso negado"
        })
    }

    jwt.verify(token, process.env.SECRET, (err,user) => {
        if(err){
            return res.status(401).json({
                msg : "Acesso negado"
            })
        }
        // console.log(user)
        req.user = user
        return next();
    })
}

module.exports = TokenAuthenticate;