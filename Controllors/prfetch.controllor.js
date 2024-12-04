


import Profile from "../Model/profile.model.js";
import User from "../Model/user.model.js";

export default async function Prfetch(req, res) {
    const { phone } = req.body;

    try {
        const user = await User.findOne({ phone });

        const profile = await Profile.findOne({phone})

        if(!profile) return res.status(404).json({message: "Profile doesn't exist"})

        if (!user) {
            return res.status(404).json({ message: "User  not found" });
        }

        // Assuming you have a function to generate a token
        const token = generateToken(user); // Define this function according to your authentication logic

        res.status(200).json({
            message: "profile fetched successfully",
            token,
            Name: user.name,
            phone: user.phone,
            District: profile.District,
            Dihari: profile.Dihari,
            
            profilepic: profile.profilepic,
            skills: profile.skills,
            state: profile.state,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Example token generation function (you need to implement this according to your authentication logic)
function generateToken(user) {
    // Implement your token generation logic here (e.g., JWT)
    return "generated_token"; // Placeholder
}






