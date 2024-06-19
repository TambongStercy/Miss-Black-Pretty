const getCategories = require("../category_controllers/get_categories");
const getPartVotes = require("../category_controllers/get_part_votes");

async function categories(req, res) {
    try {
        const categories = await getCategories();
        

        for (const category of categories) {
            const partVotes = await getPartVotes(category.name);
            category.participantsCount = partVotes.participantsCount
            category.totalVotes = partVotes.totalVotes
        }

        const active = 2;
        res.render("admin/categories.ejs", { categories, active });
    } catch (error) {
        throw error;
    }
}

module.exports = categories;