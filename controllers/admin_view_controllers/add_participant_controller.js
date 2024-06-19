const add = require("../category_controllers/add_participant");

async function addParticipant(req, res) {
    try {
        const name = req.body.categoryName.trim();
        const partName = req.body.participantName.trim();
        const image = req.image;

        if (!image) {
            return res.redirect('/admin/category?name=' + encodeURIComponent(name));
        }
        
        const participant = {
            name: partName,
            picture: image,
            category: name,
            votes: [],
        };

        //ADD candidate into the DB
        const cat = await add(name, participant);

        console.log(cat);
        return res.redirect('/admin/category?name=' + encodeURIComponent(name) );
    } catch (error) {
        throw error;
    }
}

module.exports = addParticipant;