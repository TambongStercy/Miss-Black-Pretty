const update = require("../category_controllers/update_category");

async function updateCategory(req, res) {
    try {
        const name = req.body.name.trim();
        const id = req.body.id.trim();

        const category =
            req.image ? 
            {
                name: name,
                picture: req.image,
            } : 
            { name: name };
            

        //update category in the DB
        await update(id, category);
        return res.redirect('/admin/categories');
    } catch (error) {
        throw error;
    }
}

module.exports = updateCategory;