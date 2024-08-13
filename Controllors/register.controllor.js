


import User from "../Model/user.model.js";

//import bcrypt from "bcryptjs";

import bcrypt from 'bcrypt';


//import { JsonWebTokenError } from "jsonwebtoken";

import jwt from  "jsonwebtoken";


export default async function  Register(req,  res) {


   const {name, phone, password } = req.body;

  // const hashedPassword = await bcrypt.hash(password, 10);


     try {

     const user = User.findOne({phone})

     const salt = await bcrypt.genSalt(10)


     const hashedpassword = await bcrypt.hash(password, salt)



     user = new User({

    name,

    phone,

    password
      





     })

     await user.save()

     res.status(200).json(user)

        
     } catch (error) {
        console.log(error.message)

     }








    
}






