
import User from "../Model/user.model.js";


import Jobs from "../Model/jobs.model.js";

export default async function Jobs1(req, res) {


  try{

    const {heading, description, location, sallary, phone } = req.body


    const user = await User.findOne({phone})

    if(!user) return res.status(404).json({message: "User are not found"})


    let jobdata = await Jobs.findOne({phone})

   if(!jobdata){

   jobdata = new Jobs({

    heading,
    description,
    location,

    sallary,

   phone: user.phone,

   name: user.name



   })

  await jobdata.save()

  res.status(201).json({message: "jobdata added successfully", jobdata})

   } else {

   jobdata.heading = [...jobdata.heading, heading ]

   jobdata.description = [...jobdata.description, description]

   jobdata.location = [...jobdata.location, location]

   jobdata.sallary = [...jobdata.sallary, sallary]

   await jobdata.save();

   res.status(200).json({message: "product updated successfully", jobdata})

    


   }




}  catch(error){

    console.log(error.message)


}


    
}















