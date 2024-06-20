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
        const paymentMethod = req.query.paymentMethod.trim();
        const amount = Number(req.query.amount);


        const name = Moniker.generator([Moniker.adjective, Moniker.noun]);

        const username = name.choose();


        const total = String(100 * amount);


        const email = username + "@gmail.com"

        // You have set email as email as category and name as participant

        let paymentLink;
        const redirect_url = `${req.protocol}://${req.get('host')}/user/validation?participant=${encodeURIComponent(participant)}&category= ${encodeURIComponent(category)}&amount=${amount} `

        if (paymentMethod === "card") {


            let pNum = "665992000";

            const randPos = randomIntFromInterval(1, 7);

            const randNum = randomIntFromInterval(0, 9)

            let newNum = pNum.substring(0, randPos) + randNum + pNum.substring(randPos + 1);

            const pending = await createPending(participant, category, amount);

            const tx_ref = pending.id;

            const options = {
                headers: { "Authorization": `Bearer ${process.env.FLW_SECRET_KEY}` }
            };

            const response = await axios.post(
                "https://api.flutterwave.com/v3/payments",
                {
                    tx_ref: tx_ref,
                    amount: total,
                    currency: "XAF",
                    redirect_url: redirect_url,
                    payment_options: "card",
                    customer: {
                        email: email,
                        phonenumber: newNum,
                        name: username,
                    },
                },
                options
            );

            const data = response.data.data;
            paymentLink = data.link;
        } else {
            paymentLink = `${req.protocol}://${req.get('host')}/pay/payment?email=${email}&amount=${total}&name=${username}&participant=${participant}&category=${category}&redirectUrl=${encodeURIComponent(redirect_url)}`
        }


        console.log(paymentLink);


        res.redirect(paymentLink);

    } catch (error) {
        console.log(error);
        // throw error;
    }
}

module.exports = vote;
