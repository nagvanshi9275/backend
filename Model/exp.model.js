

import mongoose from "mongoose";

const expschema = new mongoose.Schema({


   jobs:{

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




})


export default mongoose.model('Exp', expschema)










