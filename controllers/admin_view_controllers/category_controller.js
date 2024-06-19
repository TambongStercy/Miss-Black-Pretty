const getCategory = require("../category_controllers/get_category");
const getCategories = require("../category_controllers/get_categories");

async function category(req, res) {
    try {

        const name = req.query.name.toUpperCase().trim();

        console.log("category: " + name);

        const active = 2;
        const category = await getCategory(name);
        const categories = await getCategories();

        const categoryNames = categories.map(category => category.name);

        return res.render("admin/category.ejs", { active, category, categoryNames });

    } catch (error) {
        throw error;
    }
}

module.exports = category;