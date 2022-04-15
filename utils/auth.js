const jwt = require('jsonwebtoken');

exports.authUser = async(req, res, next)=>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(400).json({
            message:"The user is not authenticated",
            user:null
        })
    }

    try{
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        console.log(decoded)
        const currentTime = Date.now()/1000
        if(currentTime>decoded.exp){
            return res.status(400).json({
                message:"The token has expired, user need to reauthenticate again",
                user: null
            })
        }
        req.userId = decoded.id;
        next();
    }catch(error){
        return res.status(401).json({
            message:"The user is not authenticated",
            user:null
        })
    }
}