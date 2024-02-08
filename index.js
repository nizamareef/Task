const express=require('express')
const connectDB=require('./db')
var cors = require('cors')
const app = express()
const port = 5000


connectDB()

app.use(express.json());
app.use(cors());


app.use('/api/auth',require('./Routes/auth'))

app.listen(port,()=>{
    console.log(`The server is running on ${port}`)
})