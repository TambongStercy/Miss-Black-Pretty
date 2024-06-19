const addVotes = require("../category_controllers/add_votes");
const { v4: uuidv4 } = require('uuid');

async function autoVoting(participant, category, amount) {
    try {
        const tx_ref = uuidv4();

        const xparticipant = participant;
        const xamount = Number(amount);
        const xcategory = category.toUpperCase();

        const votes = [];
        for (i = 0; i < xamount; i++) {

            const vote = {
                date: Date.now(),
                token: tx_ref,
            };

            votes.push(vote);
        }

        await addVotes(xcategory, xparticipant, votes);
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = autoVoting;

