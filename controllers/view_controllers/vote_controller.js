const axios = require("axios");
var Moniker = require('moniker');
const addAvote = require("../category_controllers/add_a_vote");
const createPending = require("../peinding_controllers/create_pending");

const { v4: uuidv4 } = require('uuid');


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


async function vote(req, res) {
    try {

        const participant = req.query.participant.trim();
        const category = req.query.category.trim();
        const amount = Number(req.query.amount);

        // const pending = await createPending(participant, category, amount);

        // const tx_ref = pending.id;

        const name = Moniker.generator([Moniker.adjective, Moniker.noun]);

        const username = name.choose();


        const total = String(100 * amount);


        const email = username + "@gmail.com"

        // You have set email as email as category and name as participant

        const redirect_url = `${req.protocol}://${req.get('host')}/user/validation?participant=${encodeURIComponent(participant)}&category= ${encodeURIComponent(category)}&amount=${amount} `


        const paymentLink = `${req.protocol}://${req.get('host')}/pay/payment?email=${email}&amount=${total}&name=${username}&participant=${participant}&category=${category}&redirectUrl=${encodeURIComponent(redirect_url)}`
        

        res.redirect(paymentLink);
    } catch (error) {
        console.log(error);
        // throw error;
    }
}

module.exports = vote;
