import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import  jwt from 'jsonwebtoken'
import {tokenAcceso} from '../libs/jwt.js'

export const register = async(req,res)=> {
const {email,password,username}=req.body
try {

const passwordHast =await bcrypt.hash(password,10)
const newUser = new User({
    username,
    email,
    password:passwordHast,
})

const userSave = await newUser.save()

const token=await tokenAcceso({id:userSave._id})


res.cookie('token',token)
res.json({
    id:userSave._id,
    username:userSave.username,
    email:userSave.email,
    createdAt:userSave.createdAt,
    updatedAt:userSave.updatedAt,

})
// res.json({
//     
// });
    
} catch (error) {
    return res.status(500).json({message:error.message})
}


}

export const login = async(req,res)=> {
    const {email,password}=req.body
    try {

    const userFound=  await User.findOne({email})
    if(!userFound) return res.status(400).json({
        message:"user not found"
    })
    
    const isMach =await bcrypt.compare(password,userFound.password)

    if(!isMach) return res.status(400).json({
        message:"password not equial"
    })
   


    
    const token=await tokenAcceso({id:userFound._id})
    
    
    res.cookie('token',token)
    res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email,
        createdAt:userFound.createdAt,
        updatedAt:userFound.updatedAt,
    
    })
    // res.json({
    //     
    // });
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    
    
    }

export const logout =(req,res)=>{
try {
    res.cookie('token',"",{
        expires: new Date(0)
    })

    return res.sendStatus(200);
    
} catch (error) {
    console.log(error)
}
    }

export const profile =async (req,res)=>{

    const userFound = await User.findById(req.user.id);

    if(!userFound) res.status(401).json({message:"User no encontrado"})

    return res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email,
        createdAt:userFound.createdAt,
        updatedAt:userFound.updatedAt,

    })

    console.log(req.user)
    res.send('profile')
    }