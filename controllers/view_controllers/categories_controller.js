// const getCategories = require("../category_controllers/get_categories");

async function categories(req, res) {
    try {
        // const categories = await getCategories();
        
        // res.render("categories.ejs",{categories});    

        res.redirect("/user/candidates");

    } catch (error) {
        throw error;
    }
}

module.exports = categories;