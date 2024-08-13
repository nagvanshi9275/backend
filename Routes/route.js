

import express from "express"


import Register from "../Controllors/register.controllor.js"


const router = express.Router()


router.post('/register', Register)


export default router



