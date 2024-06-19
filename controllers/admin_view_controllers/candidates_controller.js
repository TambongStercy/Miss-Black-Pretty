const getAllParticipants = require("../category_controllers/get_all_participants");
const getCategories = require("../category_controllers/get_categories");

async function candidates(req, res) {
    try {
        // const category = req.query.name;
        // const token = req.headers.authorization||req.query.token;
        
        // const authorization = req.headers.authorization;

        // const token = (authorization ? authorization.split(' ')[1] : undefined);
        
        const participants = await getAllParticipants();
        const categories = await getCategories();


        const categoryNames = categories.map(category => category.name);

        const active = 3;

        res.render("admin/candidates.ejs", { participants, categoryNames, active, });
    } catch (error) {
        throw error;
    }
}

module.exports = candidates;