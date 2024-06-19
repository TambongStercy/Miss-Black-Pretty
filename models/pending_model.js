const mongoose = require("mongoose");

const pendingSchema = new mongoose.Schema({
    participant: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // Set to the desired time in seconds (24 hours in this example)
    },
    complete: {
        type: Boolean,
        default: false,
    }
});

// Static method to delete a pending by ID
pendingSchema.statics.deletePending = async function(pendingId) {
    try {
        const deletedPending = await this.findByIdAndDelete(pendingId)
        if (deletedPending) {
            return deletedPending
        } else {
            console.log("Pending not found")
            return null
        }
    } catch (error) {
        console.error("Error deleting pending:", error)
        throw error
    }
}

// Static method to find a pending by ID
pendingSchema.statics.findPendingById = async function(pendingId) {
    try {
        const foundPending = await this.findById(pendingId)
        if (foundPending) {
            return foundPending
        } else {
            console.log("Pending not found")
            return null
        }
    } catch (error) {
        console.error("Error finding pending:", error)
        throw error
    }
}

// Static method to complete a payment
pendingSchema.statics.complete = async function(pendingId) {
    try {
        const foundPending = await this.findById(pendingId)
        if (foundPending) {
            foundPending.complete = true
            await  foundPending.save()
            return true
        } else {
            console.log("Pending not found")
            return false
        }
    } catch (error) {
        console.error("Error finding pending:", error)
        throw error
    }
}


// Static method to complete a payment
pendingSchema.statics.isComplete = async function(pendingId) {
    try {
        const foundPending = await this.findById(pendingId)
        if (foundPending) {
            return foundPending.complete
        } else {
            console.log("Pending not found")
            return false
        }
    } catch (error) {
        console.error("Error finding pending:", error)
        throw error
    }
}


const Pending = mongoose.model("Pending", pendingSchema);

module.exports = Pending;