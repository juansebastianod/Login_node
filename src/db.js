import mongoose from "mongoose";

export const connectDB= async()=>{

    try{
    mongoose.connect('mongodb://localhost/merndb')
    console.log("db is connect")
}catch(error){

    console.log(error)
}
}

