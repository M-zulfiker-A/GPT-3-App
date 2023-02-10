import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration } from 'openai'


const router = express.Router()
router.route("/")
    .get((req, res) => {
        res.send("HI from Post Route")
    })
    

export default router;