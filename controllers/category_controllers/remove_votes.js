const mongoose = require("mongoose");
const Category = require("../../models/category_model"); // Update the path accordingly


async function removeVotesFromParticipant(categoryName, participantName, numVotesToRemove) {
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

        // Check if there are enough votes to remove
        if (participant.votes.length < numVotesToRemove) {
            throw new Error("Not enough votes to remove for the participant");
        }

        // Remove the specified number of votes from the participant's votes
        participant.votes.splice(0, numVotesToRemove);

        // Save the updated category
        await category.save();

        console.log(`Successfully removed ${numVotesToRemove} votes from the participant`);
    } catch (error) {
        console.error("Error removing votes:", error.message);
    }
}


module.exports = removeVotesFromParticipant;
