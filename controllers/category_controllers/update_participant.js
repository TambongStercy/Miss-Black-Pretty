const Category = require("../../models/category_model");

async function updateParticipant(categoryName, participantId, updatedInfo) {
    try {
        const category = await Category.findOne({ name: categoryName });
        if (category) {
            const participant = category.participants.id(participantId);

            // const participant = await Category.findOne(
            //     {
            //       name: categoryName,
            //       'participants._id': participantId
            //     },
            //     { 'participants.$': 1 }
            // );
            
            if (participant) {
                participant.set(updatedInfo);
                await category.save();
                return participant;
            }
        }
        return null; // Category or participant not found
    } catch (error) {
        throw error;
    }
}

module.exports = updateParticipant;
