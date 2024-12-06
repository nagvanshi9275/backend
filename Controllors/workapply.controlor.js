import seekjobs from "../Model/seek.model.js";
import Jobs from "../Model/jobs.model.js";
import Profile from "../Model/profile.model.js";
import User from "../Model/user.model.js";

// In-memory array to store all API call data
let responseData = [];

export default async function Workapply(req, res) {
    const { phone } = req.body;

    try {
        // Find the user by phone
        const user = await User.findOne({ phone });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Find the profile by phone
        const profile = await Profile.findOne({ phone });
        if (!profile) return res.status(404).json({ message: "Profile not found" });

        // Construct the data object for the current phone
        const currentData = {
            phone: profile.phone,
            District: profile.District,
            Name: profile.Name,
            state: profile.state,
            skills: profile.skills,
        };

        // Check if the phone already exists in responseData
        const existingDataIndex = responseData.findIndex((data) => data.phone === profile.phone);

        if (existingDataIndex === -1) {
            // Add new data if not already present
            responseData.push(currentData);
        } else {
            // If already present, update the existing entry (optional)
            responseData[existingDataIndex] = currentData;
        }

        // Send the accumulated response data
        res.status(200).json({
            message: "Data fetched successfully",
            data: responseData,
        });
    } catch (error) {
        console.error("Error in Workapply controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}









