const Token = require("../../models/token_model");

// Function to find a token by its value
async function findToken(tokenValue) {
    try {
        const foundToken = await Token.findOne({ value: tokenValue });
        // console.log("Token found:", foundToken);
        return !!foundToken;
    } catch (error) {
        console.error("Error finding token:", error);
        throw error;
    }
}

module.exports = findToken;