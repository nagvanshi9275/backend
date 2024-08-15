

import User from "../Model/user.model.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";


export default async function Login(req, res) {

    const{phone, password} = req.body;


    try {

      const user = await User.findOne({phone})

      if(!user) return res.status(404).json({message: "User not found"})
     
    const ismatch = await bcrypt.compare(password, user.password)

    if(!ismatch) return res.status(404).json({message: "invalid creditional"})

        const token = jwt.sign(
            { id: user._id, phone: user.phone },
            process.env.JWT_SECRET, // Ensure this matches your .env file
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Logged in successfully",
            token,
            name: user.name,
            phone: user.phone
        });



        
    } catch (error) {

        console.log(error.message)

        res.status(500).json({message: "server error check again"})
        
    }






    
}





