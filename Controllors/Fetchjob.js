


import User from "../Model/user.model.js";


import Jobs from "../Model/jobs.model.js";


export default function Fetchjobs(req, res){


  try {


    const{phone, profession} = req.body  
 
    const user = User.finOne({phone})

 //   if(!user) return res.status(404).json({message: "user not found"})
    
   const fetchdata = Jobs.find({})

   res.status(200).json(fetchdata)

    
  } catch (error) {
    

   console.log(error.message)


  }





}



