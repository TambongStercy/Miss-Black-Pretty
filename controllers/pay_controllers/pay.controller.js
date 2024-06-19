const flwUrl = 'https://api.flutterwave.com/v3' // Base URL for API
const options = {
    headers: { "Authorization": `Bearer ${process.env.FLW_SECRET_KEY}` }
}
const axios = require('axios')
const pendingModel = require('../../models/pending_model')
const createPending = require("../peinding_controllers/create_pending");

const { v4: uuidv4 } = require('uuid')

const initPay = async (req, res) => {
    try {

        const { phone, country, network, amount, email, name, currency, participant, category } = req.body;

        //note that the amount here is in XAF
        console.log(req.body);

        if (!phone || !country || !network || !amount || !email || !name || !currency || !participant || !category) {
            return res.status(400).json({ message: 'All fields are required' })
        }


        let type;
        let newAmount;


        if (currency != 'XAF' || currency != 'XOF') {
            const currencyResponse = await axios.get(`${flwUrl}/rates?from=XAF&to=${currency}&amount=${amount}`, options)

            newAmount = Math.ceil(currencyResponse.data.data.to.amount)
        } else {
            newAmount = amount
        }

        const vote = amount/100;


        const pending = await createPending(participant, category, vote);
        console.log(pending);
        const pendingId = pending.id;

        const body = {
            "tx_ref": pendingId,
            "amount": Number(newAmount).toString(),
            "currency": currency,
            "email": email,
            "phone_number": phone,
            "fullname": name,
        }

        switch (country) {
            case 'KE':
                //country not composry
                type = 'mpesa';
                break;
            case 'GH':
                //country not composry
                type = 'mobile_money_ghana';
                body.network = network;
                break;
            case 'UG':
                //country not composry
                type = 'mobile_money_uganda';
                break;
            case 'BF':
            case 'CI':
            case 'CM':
            case 'SN':
                //country is composry
                type = 'mobile_money_franco';
                body.country = country;
                break;
            case 'TZ':
                //country not composry
                type = 'mobile_money_tanzania';
                break;
            case 'RW':
                //country not composry
                type = 'mobile_money_rwanda';
                const transId = uuidv4();
                body.order_id = transId;
                break;
            case 'ZM':
                //country not composry
                type = 'mobile_money_zambia';
                break;
            default:
                return res.status(400).json({ message: 'Ce pay n\'est pas encore disponible' })
        }


        const response = await axios.post(`${flwUrl}/charges?type=${type}`, body, options)

        return res.status(200).json({ message: 'payment was initiated successfully', pendingId: pendingId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'An error occurred in the server' })
    }
}

const requestPay = (req, res) => {
    try {


        const { amount, redirectUrl, name, email, participant, category } = req.query;

        if(!amount || !redirectUrl || !name || !email || !participant || !category) {
            return res.status(400).json({message: 'All fields are required'})
        }

        console.log(amount, redirectUrl, name, email)

        res.render("payment.ejs", { amount, redirectUrl, name, email, participant, category });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'An error occurred in the server' })
    }
}

const checkPayment = async (req, res) => {
    try {

        const { pendingId } = req.query;

        const pending = await pendingModel.findPendingById(pendingId)


        if (!pending) {
            return res.status(400).json({ message: 'Pending not found', status: 'failed' })
        }

        if (!pending.complete) {
            return res.status(200).json({ message: 'Payment not complete', status: 'pending' })
        }

        await pendingModel.deletePending(pendingId)

        console.log('payment successfull')

        return res.status(200).json({ message: 'payment successfull', status: 'success' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'An error occurred in the server' })
    }
}

const convertXFA = async (req, res) => {
    try {
        const { amount, currency } = req.query

        if (currency == 'XAF' || currency == 'XOF') {
            return res.status(200).json({ amount: Number(amount) })
        }

        const response = await axios.get(`${flwUrl}/rates?from=XAF&to=${currency}&amount=${amount}`, options)

        const data = response.data.data

        console.log('XAF: ' + data.from.amount)
        console.log(currency + ': ' + data.to.amount)


        res.status(200).json({ amount: data.to.amount })



    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'An error occurred in the server' })
    }
}

function encrypt(encryptionKey, payload) {
    const text = JSON.stringify(payload);
    const forge = require("node-forge");
    const cipher = forge.cipher.createCipher(
        "3DES-ECB",
        forge.util.createBuffer(encryptionKey)
    );
    cipher.start({ iv: "" });
    cipher.update(forge.util.createBuffer(text, "utf-8"));
    cipher.finish();
    const encrypted = cipher.output;
    return forge.util.encode64(encrypted.getBytes());
}

module.exports = { initPay, requestPay, checkPayment, convertXFA }