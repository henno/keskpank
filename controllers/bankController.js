const BankModel = require("../models/bankModel");

async function register(req, res) {

    // Parse request body
    const {name, transactionUrl} = req.body

    // Generate api key for the bank
    let apiKey = generateUUID()

    // Attempt to save bank to the DB
    try {

        // Create bank in DB
        const bank = await BankModel.create({
            name, transactionUrl, apiKey
        });

        // Return bank object to client
        res.send(JSON.stringify(bank, null, 2));


    } catch (e) {

        // Handle any errors
        res.statusCode = 400
        res.json({error: e.message});

    }

}

/**
 * Function to produce UUID.
 * See: http://stackoverflow.com/a/8809472
 */
function generateUUID() {
    var d = new Date().getTime();

    if (typeof window !== 'undefined' && window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


module.exports = {
    register
}