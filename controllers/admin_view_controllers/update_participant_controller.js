const update = require("../category_controllers/update_participant");

async function updateParticipant(req, res) {
    try {
        const name = req.body.categoryName.trim();
        const id = req.body.id.trim();
        const partName = req.body.participantName.trim();
        const oldCategory = req.body.oldCategory;
        const token = req.query.token;

        const participant =
            req.image ?
                {
                    name: partName,
                    category: name,
                    picture: req.image,
                } :
                {
                    name: partName,
                    category: name,
                };

        //update candidate in the DB
        await update(oldCategory, id, participant);

        return res.redirect('/admin/category?name=' + encodeURIComponent(name));

    } catch (error) {
        throw error;
    }
}

module.exports = updateParticipant;