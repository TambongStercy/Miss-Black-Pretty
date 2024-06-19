const mongoose = require("mongoose");
const Category = require("../../models/category_model"); // Update the path accordingly

async function removeAnyVote(categoryName, participantName) {
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

        // Remove the first vote for the participant, if any
        if (participant.votes.length > 0) {
            participant.votes.shift(); // Remove the first vote
        } else {
            throw new Error("No votes found for the participant");
        }

        // Save the updated category
        await category.save();

        console.log("One vote removed successfully for the participant");
    } catch (error) {
        console.error("Error removing vote:", error.message);
    }
}



module.exports = removeAnyVote;
