
import mongoose from "mongoose";

const jobsschema = new mongoose.Schema({


   heading:{

  type:[String],

  required: true



   },

   description:{

    type:[String],
    required: true

   },

   location:{
    
   type: [String],
   required: true 


   },

   sallary:{

    type: [String],

    required: true

   },

   phone:{

   type: String,
   required: true   
   },

  name:{
   type: String,
   required: true


  }




})


export default mongoose.model('Jobs', jobsschema)



