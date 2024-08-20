import jwt from "jsonwebtoken"

 const Authentication= async (req,res,next) =>{
    try {
        const token = await req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Authentication failed",
            success:false
        })
    }
    const decode = await jwt.verify(token,process.env.PRIVATE_KEY_JWT)
    if(!decode){
        res.status(400).json({
            message:"Invalid  Token",
            success:false
        })
    }
    req.userId=decode.userId
    next()
    } catch (error) {
        console.log(error)
    }
}
export default Authentication