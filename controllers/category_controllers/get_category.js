const Category = require("../../models/category_model");

async function getCategory(name) {
    const foundCategory = await Category.findOne({name: name.toUpperCase()});
    
    return foundCategory;
}

module.exports = getCategory;