const create = require("../category_controllers/create_category");

async function createCategory(req, res) {
    try {
        const image = req.image;
        const name = req.body.name.trim();
        


        //create category into the DB
        await create(name, image);

        return res.redirect('/admin/categories');
    } catch (error) {
        throw error;
    }
}

module.exports = createCategory;