
import mongoose from "mongoose";

const seekjobs = new mongoose.Schema({

profession:{

type: [String],

required: true,


},


place: {

type: [String],

required: true

},

experience: {

type: [String],

required: true


},

age: {

type: [String],

required: true

},

phone: {

type: String,

required: true,

unique: true


},

name: {

type: String,

required: true



}





})




export default mongoose.model('seekjobs',  seekjobs );



