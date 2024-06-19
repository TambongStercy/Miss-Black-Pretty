const Category = require("../../models/category_model");

async function  addVotesToParticipant(categoryName, participantName, votesToAdd) {
    try {
        // Find the category with the given name
        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            throw new Error("Category not found");
        }

        // Find the participant with the given name in the category
        const participant = category.participants.find(
            (p) => p.name === participantName
        );

        if (!participant) {
            throw new Error("Participant not found in the category");
        }

        // Add the array of votes to the participant's votes
        participant.votes = participant.votes.concat(votesToAdd);

        // Save the updated category
        await category.save();

        console.log(`${votesToAdd.length} votes added successfully to the participant`);
    } catch (error) {
        console.error("Error adding votes:", error.message);
    }
}

module.exports = addVotesToParticipant;