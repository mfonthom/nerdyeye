const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

//token must exist and must contain the Bearer prefix
// token must be valid

const verifyUser = (req,res, next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            success:false, msg:"forbidden" })
    }
   try{ const token = authHeader.split(" ")[1]

    let verified = jwt.verify(token, process.env.JWT_SECRET)

    
    req.user = verified

    next()
    }catch(error){
       console.log(error) 
       return res.status(401).json({success:false, msg:error })
    }


}
 module.exports = verifyUser