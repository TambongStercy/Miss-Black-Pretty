const Category = require("../../models/category_model");

async function addParticipant(categoryName, participant) {
    try {
        const category = await Category.findOne({ name: categoryName });
        if (category) {
            category.participants.push(participant);
            await category.save();
            return category;
        }
        return null; // Category not found
    } catch (error) {
        throw error;
    }
}

module.exports = addParticipant;