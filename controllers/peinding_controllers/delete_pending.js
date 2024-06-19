const Pending = require("../../models/pending_model");

async function deletePendingDocumentById(pendingId) {
    try {
        // Find the document by ID and delete it
        const deletedPending = await Pending.findByIdAndDelete(pendingId);

        if (deletedPending) {
            console.log("Pending document deleted:", deletedPending);
        } else {
            console.log("Pending document not found.");
        }

        return deletedPending;
    } catch (error) {
        console.error("Error deleting Pending document:", error.message);
        throw error;
    }
}


module.exports = deletePendingDocumentById;