const autoRedVote = require("../category_controllers/auto_red_vote");


async function voteAutoView(req, res) {
    try {

        const participant = req.body.participant;
        const category = req.body.category;
        const amount = req.body.amount;

        const authorization = req.headers.authorization;
        const token = (authorization ? authorization.split(' ')[1] : undefined);

        console.log(participant)
        console.log(category)
        console.log(amount)


        await autoRedVote(participant, category, amount);

        res.redirect("/user/individual?categoryName=" + encodeURIComponent(category) + "&participantName=" + encodeURIComponent(participant) );
    } catch (error) {
        throw error;
    }
}

module.exports = voteAutoView;


