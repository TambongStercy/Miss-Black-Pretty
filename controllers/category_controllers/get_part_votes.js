const Category = require("../../models/category_model");

async function getCategoryParticipantsAndVotes(categoryName) {
  try {
    // Find the category by name
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      throw new Error("Category not found");
    }


    const participantsCount = category.participants.length;

    // Calculate the total number of votes for the category
    let totalVotes = 0;
    for (const participant of category.participants) {
      totalVotes += participant.votes.length;
    }

    return { participantsCount, totalVotes };
  } catch (error) {
    console.error("Error while fetching participants and votes:", error);
    throw error;
  }
}

module.exports = getCategoryParticipantsAndVotes;