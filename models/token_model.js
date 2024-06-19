const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // Set to the desired time in seconds (24 hours in this example)
    },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;