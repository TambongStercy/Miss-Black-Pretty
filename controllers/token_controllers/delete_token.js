const Token = require("../../models/token_model");

// Function to delete a token by its value
async function deleteToken(tokenValue) {
    try {
        const deletedToken = await Token.findOneAndDelete({ value: tokenValue });
        console.log("Token deleted:", deletedToken);
        return deletedToken;
    } catch (error) {
        console.error("Error deleting token:", error);
        throw error;
    }
}

module.exports = deleteToken;