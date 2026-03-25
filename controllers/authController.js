import { prisma } from "../config/db.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async(req,res)=>{
    const { name, email, password } = req.body;

    // //Check if user exists
    const userExists = await prisma.user.findUnique({
        where:{email:email},
    });

    if (userExists){
        return res
        .status(400)
        .json({email:"User already exists with this email"})
    }


    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //Create user
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    });

    res.status(201).json({
        status:"success",
        data:{
            user:{
                id:user.id,
                name:name,
                email:email
            }
        }
    });
};

//JWT small signed tokens

const login = async (req,res)=>{
    const {email,password} = req.body;

    //check if user email exists in the table
    const user = await prisma.user.findUnique({
        where:{email:email}
    });

    if (!user){
        res
        .status(400)
        .json({error:"Invalid email or password"})
    }

    //verify the password
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        res
        .status(400)
        .json({error:"Invalid email or password"})
    }

    //generate JWT Token

    const token = generateToken(user.id,res);

    res
    .status(201)
    .json({
        status:"success",
        data:{
            user:{
                id:user.id,
                email:user.email
            },
            token,
        }
    })
};

const logout = async(rep,res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires: new Date(0),
    })
    res
    .status(200)
    .json({
        status:"success",
        message:"Logged out sucessfully"
    });
};


export {register,login, logout};