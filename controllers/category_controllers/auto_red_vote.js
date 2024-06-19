const redvotes = require("../category_controllers/remove_votes");
const { v4: uuidv4 } = require('uuid');

async function autoRedVoting(participant, category, amount) {
    try {
        const tx_ref = uuidv4();

        const xparticipant = participant;
        const xamount = Number(amount);
        const xcategory = category.toUpperCase();

        await redvotes(xcategory, xparticipant, xamount);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = autoRedVoting;

