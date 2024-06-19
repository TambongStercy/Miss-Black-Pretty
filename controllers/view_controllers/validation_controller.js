// const addAvote = require("../category_controllers/add_a_vote");
// const redAvote = require("../category_controllers/red_a_vote");


async function validate(req, res) {
    try {
        const tx_ref = req.query.tx_ref;
        const transaction_id = req.query.transaction_id;

        const participant = req.query.participant.trim();
        const amount = Number(req.query.amount);
        const category = req.query.category.toUpperCase().trim();
        
        const status =  req.query.status;
        const success = (status === 'successful')?true:false;
        
        res.redirect("/user/individual?categoryName=" + encodeURIComponent(category) + "&participantName=" + encodeURIComponent(participant)+"&alert="+encodeURIComponent(success));
       
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = validate;

