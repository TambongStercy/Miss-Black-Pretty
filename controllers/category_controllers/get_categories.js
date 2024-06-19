const Category = require("../../models/category_model");

async function getCategories() {
    try {
        const categories = await Category.find({}, { participants: 0 });
        return categories;
    } catch (error) {
        throw error;
    }
}

module.exports = getCategories;