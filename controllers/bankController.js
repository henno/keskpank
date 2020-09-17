const BankModel = require("../models/bankModel");

/**
 * Function to produce a random string in specified format.
 * @param format String Format of the string
 * See: http://stackoverflow.com/a/8809472
 */
function randomString(format) {
    var d = new Date().getTime();

    if (typeof window !== 'undefined' && window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }

    return format.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

async function register(req, res) {

    console.log('POST /register');

    // Parse request body
    const {name, transactionUrl, owners} = req.body

    // Generate api key for the bank
    let apiKey = randomString('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    let bankPrefix = randomString('xxx')

    // Attempt to save bank to the DB
    try {

        // Create bank in DB
        const bank = await BankModel.create({
            name, transactionUrl, apiKey, bankPrefix, owners
        });

        // Return bank object to client
        res.send(JSON.stringify(bank, null, 2));


    } catch (e) {

        // Handle any errors
        res.statusCode = 400
        res.json({error: e.message});

    }

}

module.exports = {
    register
}