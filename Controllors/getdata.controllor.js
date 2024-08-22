

import User from "../Model/user.model.js";


import Jobs from "../Model/jobs.model.js";


export default async function Getdata(req, res){


     try {

     const{phone} = req.body
 
     const user = await User.findOne({phone})

    if(!user) return res.status(404).json({message: "User are not found"})
        
   let userdata = await Jobs.findOne({phone: user.phone})

   if(!userdata) return res.status(404).json({message: "Userdata not here"})


   res.status(200).json(userdata)

     } catch (error) {

        console.log(error.message)
        
     }



}







