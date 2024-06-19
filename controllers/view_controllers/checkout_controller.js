const { v4: uuidv4 } = require('uuid');

function checkout(req, res) {
    try {
        const tx_ref = uuidv4();
        const participant = req.query.participant;
        res.render("checkout.ejs", { participant, tx_ref });
    } catch (error) {
        throw error;
    }
}

module.exports = checkout;