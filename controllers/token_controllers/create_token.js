const Token = require("../../models/token_model"); 
const { v4: uuidv4 } = require('uuid');

// Function to create a new token
async function createToken() {
  try {
    
    const tokenValue = uuidv4();

    const newToken = await Token.create({
      value: tokenValue,
    });

    // console.log("Token created:", newToken);

    return newToken.value;

  } catch (error) {
    console.error("Error creating token:", error);
    throw error; // You might want to handle the error more gracefully in a real application
  }
}

module.exports = createToken;