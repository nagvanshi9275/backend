
import express from "express"


import Register from "../Controllors/register.controllor.js";


import Login from "../Controllors/login.controllor.js";

import Jobs1 from "../Controllors/Jobs.controllor.js";

import Getdata from "../Controllors/getdata.controllor.js";

const router = express.Router()


router.post('/register', Register)

router.post('/login', Login)

router.post('/jobs', Jobs1)

router.post('/getdata', Getdata)

export default router









































