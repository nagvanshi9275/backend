import Exp from "../Model/exp.model.js";

 

   

export default async function Exp1(req, res) {
  try {
    const { jobs, location, sallary, phone } = req.body;

    // Find existing expdata by phone
    let expdata = await Exp.findOne({ phone });

    if (!expdata) {
      // If no existing data, create a new entry
      expdata = new Exp({
        jobs: [jobs], // Initialize as an array since jobs is defined as an array in the schema
        location: [location],
        sallary: [sallary],
        phone,
      });

      await expdata.save();
      return res.status(201).json({ message: "expdata added successfully", expdata });
    } else {
      // If data exists, update the arrays
      expdata.jobs = [...expdata.jobs, jobs]; // Append the new job
      expdata.location = [...expdata.location, location]; // Append the new location
      expdata.sallary = [...expdata.sallary, sallary]; // Append the new salary

      await expdata.save();
      return res.status(200).json({ message: "Job updated successfully", expdata });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
















