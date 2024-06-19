const getParticipants = require("../category_controllers/get_participants");

async function individual(req, res) {
    try {
        const categoryName = req.query.categoryName;
        const participantName = req.query.participantName;
        const alert = req.query.alert;

        const participants = await getParticipants(categoryName);

        const participant = participants.find((part) => part.name.toLowerCase() == participantName.trim().toLowerCase());


        res.render("individual.ejs", { participant, alerte: alert });
    } catch (error) {
        throw error;
    }
}

module.exports = individual;