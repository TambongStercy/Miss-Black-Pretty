const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    participants: [{
        picture: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        votes: [
            {
                date: { type: Date },
                token: { type: String },
            }
        ],
    }],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;