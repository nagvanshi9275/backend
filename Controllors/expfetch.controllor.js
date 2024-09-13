
import Exp from "../Model/exp.model.js";

export default async function Expfetch(req, res) {
  try {
    const { phone, jobs } = req.body;

    // Find the documents where the job is present in the array
    const matchjobs = await Exp.find({
      jobs: { $in: [jobs] },
    });

    if (matchjobs.length === 0) {
      return res.status(404).json({ message: "No job found with this name" });
    }

    // For each document, extract only the relevant jobs, locations, and salaries
    const filteredJobs = matchjobs.map((doc) => {
      const jobIndexes = doc.jobs
        .map((job, index) => (job === jobs ? index : -1)) // get the indexes where jobs match
        .filter((index) => index !== -1); // filter out invalid indexes

      // Filter the jobs, salaries, and locations arrays based on the matching indexes
      const relevantJobs = jobIndexes.map((index) => doc.jobs[index]);
      const relevantSalaries = jobIndexes.map((index) => doc.sallary[index]); // make sure 'sallary' exists in schema
      const relevantLocations = jobIndexes.map((index) => doc.location[index]); // make sure 'location' exists in schema

      return {
        ...doc.toObject(), // convert document to plain JS object
        jobs: relevantJobs, // only relevant jobs
        sallary: relevantSalaries, // only relevant salaries
        location: relevantLocations, // only relevant locations
      };
    });

    res.status(200).json({ message: "Jobs found", filteredJobs });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}









