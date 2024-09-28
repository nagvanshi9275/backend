
import User from "../Model/user.model.js";
import seekjobs from "../Model/seek.model.js"; // Assuming the model name is `seekjobs`

export default async function Talent(req, res) {
  try {
    const { profession, phone } = req.body;

    // Find the user by phone number
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find jobs where profession matches
    const matchjobs = await seekjobs.find({
      profession: { $in: [profession] }
    });

    // If no matching jobs are found, return a 404 response
    if (matchjobs.length === 0) {
      return res.status(404).json({ message: "No talent found" });
    }

    // Map over the matched jobs to filter relevant details
    const filterjobs = matchjobs.map((doc) => {
      // Get indices where the profession matches the requested one
      const talentIndex = doc.profession
        .map((jobProfession, index) => (jobProfession === profession ? index : -1))
        .filter((index) => index !== -1);

      // Extract relevant headings and locations based on the matched indices
      const relevantHeading = talentIndex.map((index) => doc.profession[index]);
      const relevantLocation = talentIndex.map((index) => doc.place[index]);
      const relevantexperience = talentIndex.map((index) => doc.experience[index])
      const relevantage = talentIndex.map((index) => doc.age[index]);
      // Convert Mongoose document to plain object and return filtered data
      return {
        ...doc.toObject(), // Ensures that the Mongoose document is converted to a plain JS object
        profession: relevantHeading,
        place: relevantLocation,
        experience: relevantexperience,
        age: relevantage
      };
    });

    // Respond with the filtered jobs
    res.status(200).json({ message: "Talent filtered successfully", filterjobs });

  } catch (error) {
    // Log the error and send a 500 status code for server error
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}








