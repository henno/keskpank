const express = require("express")
const dotenv = require('dotenv')
const routes = require('./routes.js')
const {initDb} = require('./database')
const {RequestHeadersHaveCorrectContentType, RequestBodyIsValidJson, enableCORS} = require('./middlewares')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/api.json');


// Init configuration from .env file
dotenv.config();

// Initialize SQLite database
initDb();

// Initialize Express
const app = express();

// Run middlewares
app.use(enableCORS);
app.use(RequestHeadersHaveCorrectContentType);
app.use(express.json()); // Parse request body if's JSON
app.use(RequestBodyIsValidJson)
app.use('/', routes) // Load routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Run the app
app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
})
