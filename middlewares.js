const BankModel = require("./models/bankModel");
exports.RequestBodyIsValidJson = (err, req, res, next) => {
    // body-parser will set this to 400 if the json is in error
    if (err.status === 400)
        return res.status(err.status).send('Malformed JSON');
    return next(err); // if it's not a 400, let the default error handling do it.
}

exports.RequestHeadersHaveCorrectContentType = (req, res, next) => {
    // Catch invalid Content-Types
    var RE_CONTYPE = /^application\/(?:x-www-form-urlencoded|json)(?:[\s;]|$)/i;
    if (req.method !== 'GET' && !RE_CONTYPE.test(req.headers['content-type'])) {
        res.setStatus = 406
        return res.send('Content-Type is not application/json');
    }
    next();
}
exports.enableCORS = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

exports.validateApiKey = async (req, res, next) => {
    let clientApiKey = req.get('api-key');
    if (!clientApiKey) {
        return res.status(400).send({
            error: "Missing API key"
        });
    }
    try {
        let clientDetails = await BankModel.findOne({"apiKey": clientApiKey});
        if (clientDetails) {
            next();
        } else {
            return res.status(400).send({
                error: "Invalid API key"
            })
        }
    } catch (e) {
        return res.status(500).send({
            error: JSON.stringify(e, null, 2)
        })
    }
}