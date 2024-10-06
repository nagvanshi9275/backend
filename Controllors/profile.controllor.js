import User from "../Model/user.model.js";
import Profile from "../Model/profile.model.js";

export default async function createOrUpdateProfile(req, res) {
    try {
        const { phone, District, state, skills, Dihari, Name } = req.body;

        // Check if the user 
        const user = await User.findOne({ phone });

        if (!user) return res.status(404).json({ message: "User is not registered" });

        // Check if a profile already exists for the user, and update or create accordingly
        let profileData = await Profile.findOneAndUpdate(
            { phone }, // Find profile by phone
            { District, state, skills, Dihari, Name }, // Fields to update or set
            { new: true, upsert: true } // Return the updated document and create if not found
        );

        // Send response with updated or newly created profile
        res.status(200).json({
            message: profileData ? "Profile successfully updated" : "Profile successfully created",
            profileData
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "An error occurred while processing the request" });
    }
}
