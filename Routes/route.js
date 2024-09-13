
import express from "express"


import Register from "../Controllors/register.controllor.js";


import Login from "../Controllors/login.controllor.js";

import Jobs1 from "../Controllors/Jobs.controllor.js";

import Getdata from "../Controllors/getdata.controllor.js";


import seekjobs1 from "../Controllors/seekjobs.controllor.js";

import Fetchjobs from "../Controllors/Fetchjob.js";

import Exp1 from "../Controllors/exp.controllor.js"

import Expfetch from "../Controllors/expfetch.controllor.js";
const router = express.Router()


router.post('/register', Register)

router.post('/login', Login)

router.post('/jobs', Jobs1)

router.post('/getdata', Getdata)

router.post('/seekjobs', seekjobs1)

router.post('/fetchjobs', Fetchjobs)

router.post('/exp', Exp1)

router.post('/expfetch', Expfetch)

export default router









































