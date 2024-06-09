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

export const login = (req,res)=>res.send("login sebas")