import User from '../models/user.model.js'

export const register = async(req,res)=> {

try {
const {email,password,username}=req.body
const newUser = new User({
    username,
    email,
    password
})

const userSave = await newUser.save()
res.json(userSave);
    
} catch (error) {
    console.log(error)
}


}

export const login = (req,res)=>res.send("login sebas")