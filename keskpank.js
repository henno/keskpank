const express = require("express")
const dotenv = require('dotenv')
const routes = require('./routes.js')
const {initDb, db} = require('./database')
const {RequestHeadersHaveCorrectContentType, RequestBodyIsValidJson, enableCORS} = require('./middlewares')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/api.json');
const fetch = require('node-fetch');

// Init configuration from .env file
dotenv.config();

// Initialize SQLite database
initDb();

// Function to remove duplicate banks keeping only the latest entry
const removeDuplicateBanks = () => {
    console.log("Checking for duplicate banks...");
    
    // Find duplicate jwksUrls and keep only the latest one
    const sql = `
        DELETE FROM banks
        WHERE id NOT IN (
            SELECT MAX(id) 
            FROM banks 
            GROUP BY jwksUrl
        )
    `;
    
    const stmt = db.prepare(sql);
    const result = stmt.run();
    
    if (result.changes > 0) {
        console.log(`Removed ${result.changes} duplicate bank(s)`);
    } else {
        console.log("No duplicate banks found");
    }
};

// Initialize Express
const app = express();

// Run middlewares
app.use(enableCORS);
app.use(RequestHeadersHaveCorrectContentType);
app.use(express.json()); // Parse request body if's JSON
app.use(RequestBodyIsValidJson)
app.use('/', routes) // Load routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Function to check each bank's JWKS URL connectivity
const checkBanksConnectivity = async () => {
    console.log("Checking banks connectivity...");
    
    // Get all banks with their jwksUrl and id
    const stmt = db.prepare("SELECT id, name, jwksUrl FROM banks");
    const banks = stmt.all();
    
    for (const bank of banks) {
        try {
            // Set a timeout of 3 seconds for the fetch request
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            
            await fetch(bank.jwksUrl, { signal: controller.signal });
            
            // Clear the timeout if the fetch completes within 3 seconds
            clearTimeout(timeoutId);
            console.log(`Bank ${bank.name} is responsive`);
        } catch (error) {
            console.log(`Bank ${bank.name} is not responsive - removing from database`);
            
            // Delete the bank from the database
            const deleteStmt = db.prepare("DELETE FROM banks WHERE id = ?");
            deleteStmt.run(bank.id);
        }
    }
};

// Run the app
const server = app.listen(process.env.PORT || 3000, () => {
    const port = server.address().port;
    console.log(`Server running at http://localhost:${port}`);
    
    // Check for duplicate banks on startup
    removeDuplicateBanks();
});

// Schedule the bank connectivity check to run every minute
setInterval(checkBanksConnectivity, 60000);