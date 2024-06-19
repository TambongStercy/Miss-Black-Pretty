const autoVote = require("../category_controllers/auto_vote");

async function voteAutoView(req, res) {
    try {
        
        const participant = req.body.participant;
        const category = req.body.category;
        const amount = req.body.amount;

        console.log(participant)
        console.log(category)
        console.log(amount)


        await autoVote(participant,category,amount);

        res.redirect("/user/individual?categoryName="+encodeURIComponent(category)+"&participantName="+encodeURIComponent(participant));
    } catch (error) {
        throw error;
    }
}

module.exports = voteAutoView;



