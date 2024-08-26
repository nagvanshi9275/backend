
import User from "../Model/user.model.js";


import Jobs from "../Model/jobs.model.js";

import seekjobs from "../Model/seek.model.js";

export default async function seekjobs1(req, res) {


  try{

    const {profession, place, experience,  age,  phone, name } = await req.body


    const user = await User.findOne({phone})

    if(!user) return res.status(404).json({message: "User are not found"})


    let seekdata = await seekjobs.findOne({phone})

   if(!seekdata){

   seekdata = new seekjobs({

    profession,
    place,
    experience,

    age,

   phone: user.phone,

   name: user.name



   })

  await seekdata.save()

  res.status(201).json({message: "jobdata added successfully", seekdata})

   } else {

   seekdata.profession = [...seekdata.profession, profession ]

 seekdata.place = [...seekdata.place, place]

   seekdata.experience = [...seekdata.experience, experience]

   seekdata.age = [...seekdata.age, age]

   await ServiceWorkerContainerdata.save();

   res.status(200).json({message: "seekingjob updated successfully", seekdata})

    


   }




}  catch(error){

    console.log(error.message)


}


    
}















