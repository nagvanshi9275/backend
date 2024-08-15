

import express from "express"


import Register from "../Controllors/register.controllor.js";


import Login from "../Controllors/login.controllor.js";

const router = express.Router()


router.post('/register', Register)

router.post('/login', Login)


export default router



