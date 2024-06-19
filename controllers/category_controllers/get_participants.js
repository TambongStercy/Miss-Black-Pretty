const Category = require("../../models/category_model");

async function getParticipants(categoryName) {
    try {
        const category = await Category.findOne({ name: categoryName.trim().toUpperCase() });


        if (category) {
            return category.participants;
        }else{
            console.log(categoryName+" was not found");
            return []; // Category not found
        }
    } catch (error) {
        throw error;
    }
}


module.exports = getParticipants;