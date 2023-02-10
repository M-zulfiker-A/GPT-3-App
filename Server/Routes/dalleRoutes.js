import express from 'express'
import dotenv from 'dotenv'
import { Configuration , OpenAIApi } from 'openai'


dotenv.config()
const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const router = express.Router()
router.route("/")
    .get(async (req, res) => {
        res.send("HI from dalle Route")
    })
    .post(async (req,res) => {
        try {
            const {prompt} = req.body
            const AIresponse = openai.createImage({
                prompt,
                n : 1,
                size : '1024x1024',
                response_format : 'b64_json'
            })
            const Image =  (await AIresponse).data.data[0].b64_json
            res.status(200).json({
                photo : Image
            })
        } catch (error) {
            res.status(500).send(error?.response.data.error.message)
        }
    })
export default router