

import User from "../Model/user.model.js";
import Jobs from "../Model/jobs.model.js";

export default async function Fetchjobs(req, res) {
  try {
    const { phone, heading } = req.body;

    // Find the user by phone number
    const user = await User.findOne({ phone });

    // If the user is not found, return a 404 status with a message
    if (!user) return res.status(404).json({ message: "User not found" });

    // Use aggregation to filter the specific job heading from the array
    const fetchdata = await Jobs.aggregate([
      { $match: { heading: { $in: [heading] } } }, // Match documents that contain the specific job in the heading array
      { $project: { 
          heading: {
            $filter: {
              input: "$heading",
              as: "item",
              cond: { $eq: ["$$item", heading] }
            }
          },
          description: {
            $arrayElemAt: [
              "$description",
              { $indexOfArray: ["$heading", heading] }
            ]
          },
          location: {
            $arrayElemAt: [
              "$location",
              { $indexOfArray: ["$heading", heading] }
            ]
          },
          sallary: {
            $arrayElemAt: [
              "$sallary",
              { $indexOfArray: ["$heading", heading] }
            ]
          },
          phone: 1,
          name: 1
      }}
    ]);

    // If no jobs are found, return a 404 status with a message
    if (fetchdata.length === 0 || fetchdata[0].heading.length === 0) {
      return res.status(404).json({ message: "No jobs found for this heading" });
    }

    // Return the filtered job
    res.status(200).json(fetchdata);
  } catch (error) {
    // Log the error and return a 500 status with a server error message
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
}






