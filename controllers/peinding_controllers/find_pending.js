const Pending = require("../../models/pending_model");

async function getPendingById(pendingId) {
    try {
        // Find the document by ID
        const foundPending = await Pending.findById(pendingId);

        if (foundPending) {
            console.log("Pending document found:", foundPending);
        } else {
            console.log("Pending document not found.");
        }

        return foundPending;
    } catch (error) {
        console.error("Error getting Pending document by ID:", error.message);
        throw error;
    }
}

module.exports = getPendingById;