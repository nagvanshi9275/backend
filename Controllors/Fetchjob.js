

import User from "../Model/user.model.js";
import Jobs from "../Model/jobs.model.js"; // Correct the Jobs model import

export default async function Fetchjobs(req, res) {
  try {
    const { heading, phone } = req.body;

  
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find jobs where heading matches
    const matchjobs = await Jobs.find({
      heading: { $in: [heading] }
    });

    if (matchjobs.length === 0) {
      return res.status(404).json({ message: "No job found with this heading" });
    }

    // Extract relevant heading, description, location, and sallary
    const filterjobs = matchjobs.map((doc) => {
      // Get the indices of matching headings
      const jobindex = doc.heading
        .map((jobHeading, index) => (jobHeading === heading ? index : -1))
        .filter((index) => index !== -1);

      
      const relevantheading = jobindex.map((index) => doc.heading[index]);
      const relevantdescription = jobindex.map((index) => doc.description[index]);
      const relevantlocation = jobindex.map((index) => doc.location[index]);
      const sallary = jobindex.map((index) => doc.sallary[index]);

      return {
        ...doc.toObject(),
        heading: relevantheading,
        description: relevantdescription,
        location: relevantlocation,
        sallary: sallary
      };
    });

    // Respond with the filtered jobs
    res.status(200).json({ message: "Job filtered successfully", filterjobs });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}







