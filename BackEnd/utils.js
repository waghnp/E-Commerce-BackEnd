import jwt from 'jsonwebtoken';
import config from './config';

const getToken=(user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.name,
        isAdmin:user.isAdmin
    },config.JWT_SECRET,{
        expiresIn:'2h'
    })
}

const isAuth=(req,res,next)=>{
    const token=req.headers.authorization;
    console.log('requsted headers ',req.headers)
    if(token){
        const onlyToken=token.slice(7,token.length);
        jwt.verify(onlyToken,config.JWT_SECRET,(error,decode)=>{
            if(error){
                return res.status(401).send({msg:'Invalid Token'});
            }
            console.log('request is ',req);
            console.log('this is a user ',req.user);
            req.user=decode
            console.log('After adding the token ',req.user)
            next();
            return
        })
    }else{
        return res.status(401).send({msg:'Token is not supplied '});
    }
}

const isAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({msg:'Admin Token is not valid'});
}

export {getToken,isAdmin,isAuth}; 