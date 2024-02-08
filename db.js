const mongoose= require('mongoose')

const connectDB=async()=>{
    try {
        const connection= await mongoose.connect('mongodb+srv://nizam:Areef2000@cluster0.s5mcoxw.mongodb.net/?retryWrites=true&w=majority')
        console.log('Database connected successfully')
    } catch (error) {
        console.log('error in connecting the database')
    }
}
module.exports = connectDB