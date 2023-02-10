import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './MongoDB/Connect.js'
import postRoutes from './Routes/postRoutes.js'
import dalleRoutes from "./Routes/dalleRoutes.js"

dotenv.config()


const app = express()
app.use(cors())
app.use(express.json({limit : '50mb'}))

app.use("/api/v1/post", postRoutes)
app.use("/api/v1/dalle", dalleRoutes)

app.get("/", async(req, res)=>{
    res.status(200).send("hi")
})

const startServer = async()=> {
    try {
        connectDB(process.env.MONGO_URL)
        app.listen(8000, () => console.log("listening to port 8000"))
    } catch (error) {
        console.log(error)
    }
}

startServer()