import jwt, { decode } from "jsonwebtoken";
import { prisma } from "../config/db.js";


export const authMiddleware = async (req,res,next) => {
    //we must tell the middleware to continue to the request otherwise it will be go in a loop
    //check if token is valid to continue or not
    //next is a function telling the middleware to move forward

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }else if(req.cookies?.jwt){
        token = req.cookies.jwt;
    }

    if(!token){
        return res
            .status(401)
            .json({error:"Not authorized, no token provided"});
    }

    try{
        //Verify token and extract userId
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where:{id:decoded.id},
        
        });
        if (!user){
            return res
                .status(401)
                .json({error:"User no longer exists"})
        }
        req.user = user;
        next();//move forward
    }catch(error){
        return res
            .status(401)
            .json({error: "Not authorized, token failed"});
    }
};