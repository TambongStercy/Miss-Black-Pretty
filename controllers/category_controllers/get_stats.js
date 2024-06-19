const Category = require("../../models/category_model");

async function getStats() {
  try {
    const databaseInfo = {};

    // Total number of participants and total number of votes
    const [participantsCount, totalVotesCount] = await Promise.all([
      Category.aggregate([{ $project: { participants: 1 } }]).unwind("participants"),
      Category.aggregate([{ $project: { participants: 1 } }])
        .unwind("participants")
        .project({ votesCount: { $size: "$participants.votes" } })
        .group({ _id: null, totalVotes: { $sum: "$votesCount" } }),
    ]);

    databaseInfo.totalParticipants = participantsCount.length;
    databaseInfo.totalVotes = totalVotesCount[0].totalVotes || 0;

    // Top 3 voted participants
    const top3Participants = await Category.aggregate([
      { $unwind: "$participants" },
      { $project: { name: "$participants.name", picture: "$participants.picture", votes: { $size: "$participants.votes" } } },
      { $sort: { "votes": -1 } },
      { $limit: 3 },
      { $group: { _id: null, topParticipants: { $push: "$$ROOT" } } },
      { $project: { _id: 0, topParticipants: 1 } },
    ]);

    databaseInfo.topVotedParticipants = top3Participants[0].topParticipants;

    // Top 3 voted categories
    const top3Categories = await Category.aggregate([
      { $project: { name: 1, picture: 1, votes: { $size: "$participants.votes" } } },
      { $sort: { "votes": -1 } },
      { $limit: 3 },
    ]);

    databaseInfo.topVotedCategories = top3Categories;

    return databaseInfo;
  } catch (error) {
    console.error("Error while fetching database information:", error);
    throw error;
  }
}

// // Usage example
// getDatabaseInfo()
//   .then((databaseInfo) => {
//     console.log("Total Participants:", databaseInfo.totalParticipants);
//     console.log("Total Votes:", databaseInfo.totalVotes);
//     console.log("Top 3 Voted Participants:", databaseInfo.topVotedParticipants);
//     console.log("Top 3 Voted Categories:", databaseInfo.topVotedCategories);
//   })
//   .catch((error) => {
//     // Handle any errors here
//   });


module.exports = getStats;