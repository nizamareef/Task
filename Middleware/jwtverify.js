var jwt=require('jsonwebtoken')
const jwt_secret='TASK'


const jwtVerify=(req,res,next)=>{
    const token = req.header("authtoken")
    if( !token ) return res.status(401).send({'error':'Authtoken not provided'})
    try {
        const decoded=jwt.verify(token,jwt_secret)
        if(!decoded.user.id){
            return res.status(400).send({'error':'Invalid Token'})
        }
        req.user=decoded.user;
        next()
    } catch (error) {
        res.status(500).send({ msg: 'Internal Server Error' });
    }
}

module.exports=jwtVerify