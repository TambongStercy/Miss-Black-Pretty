const findPending = require("../peinding_controllers/find_pending");
const deletePending = require("../peinding_controllers/delete_pending");
const autoVote = require("../category_controllers/auto_vote");


async function flwWebhook(req, res) {
    try {
        // console.log('webhook functioning')
        // If you specified a secret hash, check for the signature
        // const secretHash = process.env.FLW_SECRET_HASH;
        // const signature = req.headers["verif-hash"];
        // if (!signature || (signature !== secretHash)) {
        //     // This request isn't from Flutterwave; discard
        //     res.status(401).end();
        // }

        const payload = req.body;
        const status = payload.data.status;
        const pendingId = payload.data.tx_ref;


        console.log(payload.data)
        console.log(payload.data.status)
        console.log(payload.data.customer)

        if (status === "successful") {
            console.log("success webhook payment")

            const pending = await findPending(pendingId);
            const participant = pending.participant
            const category = pending.category
            const amount = pending.votes

            if (pending) {
                console.log("add votes")
                console.log(participant)
                console.log(category)

                // let i = 0;
                // for (i = 0; i < amount; i++) {
    
                //     console.log('voting');
    
                //     const vote = {
                //         date: Date.now(),
                //         token: transaction_id,
                //     };
    
                //     await addAvote(category, participant, vote);
                // }
    

                // for every 10 votes, 1 vote is added 
                // Do the calculation (amt + floor(amt/10))
                
                await autoVote(participant, category, amount);
            } else {
                console.log("Warning!! pending payment not found: \n" + pending);
            }


        } else if (status === "failed") {
            console.log("failed webhook payment")
        } else {
            console.log("failed with status: " + status);
        }

        await deletePending(pendingId);

        res.status(200).end()
    } catch (error) {
        console.log(error);
    }
};

module.exports = flwWebhook;
