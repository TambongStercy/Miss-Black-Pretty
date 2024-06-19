const Pending = require("../../models/pending_model");

async function createPendingDocument(participant, category, votes) {
    try {
        // Create a new Pending document
        const newPending = new Pending({
            participant,
            category,
            votes,
        });

        // Save the document to the database
        const savedPending = await newPending.save();

        console.log("New Pending document created:", savedPending);
        return savedPending;
    } catch (error) {
        console.error("Error creating Pending document:", error.message);
        throw error;
    }
}


module.exports = createPendingDocument;