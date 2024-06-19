const Category = require("../../models/category_model");

async function updateCategory(id, updatedInfo) {
    try {
        const category = await Category.findOne({ _id: id });

        if (category) {
            category.set(updatedInfo);
            await category.save();
            return category;
        }

        return null; // Category not found
        
    } catch (error) {
        throw error;
    }
}

module.exports = updateCategory;