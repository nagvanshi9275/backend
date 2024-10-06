

import mongoose from "mongoose";



const profileschema = new mongoose.Schema({

phone: {

type: String,

required: true,

unique: true


},

District: {

    type: String,
    
    required: true,
    
    
    
    
    },


    state: {

        type: String,
        
        required: true,
        
    
        
        
        },

        skills: {

            type: String,
            
            required: true,
            
            
            
            
            },

            Dihari: {

                type: String,
                
                required: true,
                
                
                
                
                },

                Name: {

                    type: String,
                    
                    required: true,
                    
                    
                    
                    
                    },

                    profilepic: {

                        type: String,
                        
                        required: true,
                        
                        
                        
                        
                        }






})



export default mongoose.model('Profile', profileschema)

