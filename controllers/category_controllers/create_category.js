const Category = require("../../models/category_model");

async function createCategory(name, picture) {
    try {
        const newCategory = new Category({ name, picture });
        await newCategory.save();
        return newCategory;
    } catch (error) {
        throw error;
    }
}

module.exports = createCategory;