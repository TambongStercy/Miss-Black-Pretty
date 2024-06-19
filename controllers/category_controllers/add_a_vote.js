const Category = require("../../models/category_model");

async function addVoteToParticipant(categoryName, participantName, vote) {
    try {
        const result = await Category.findOneAndUpdate(
            {
                name: categoryName,
                "participants.name": participantName,
            },
            {
                $push: { "participants.$.votes": vote },
            },
            { new: true }
        );


        if (!result) {
            throw new Error("Participant not found or category not found.");
        }

        return result;
    } catch (error) {
        console.error("Error while adding a vote to a participant by name:", error);
        throw error;
    }
}

module.exports = addVoteToParticipant;