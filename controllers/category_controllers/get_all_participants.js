const Category = require("../../models/category_model");

async function getAllParticipants() {
    try {
        const participants = await Category.distinct('participants', {});
        // const participants = await Category.aggregate([
        //     {
        //       $unwind: "$participants"
        //     },
        //     {
        //       $sort: {
        //         "participants.name": 1
        //       }
        //     },
        //     {
        //       $group: {
        //         _id: "$participants.name",
        //         picture: { $first: "$participants.picture" },
        //         votes: { $sum: { $size: "$participants.votes" } }
        //       }
        //     },
        //     {
        //       $sort: {
        //         name: 1, // Sort alphabetically by name
        //         votes: -1 // Then, sort by the number of votes in descending order
        //       }
        //     }
        //   ]);
      
        return participants;
    } catch (error) {
        console.error("Error while fetching participants:", error);
        throw error;
    }
}

module.exports = getAllParticipants;