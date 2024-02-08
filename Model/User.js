const mongoose=require('mongoose')
const { Schema } = mongoose

const userSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type:String,
        minLength:[6,'Password should be atleast 6 charcters']
    }
})
module.exports=mongoose.model('user',userSchema)