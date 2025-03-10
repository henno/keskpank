const { db, getById, getBy, getAll, insert } = require('../database');
const { validateUrl, validateBankPrefix } = require('./validators');

// Bank model operations
const BankModel = {
    /**
     * Create a new bank
     * @param {Object} bankData Bank data with name, transactionUrl, apiKey, bankPrefix, owners, jwksUrl
     * @returns {Object} Created bank
     */
    create: (bankData) => {
        // Validate data
        if (!bankData.name || typeof bankData.name !== 'string') {
            throw new Error('name is required and must be a string');
        }
        
        if (!validateUrl(bankData.transactionUrl)) {
            throw new Error('transactionUrl is invalid');
        }
        
        if (!validateBankPrefix(bankData.bankPrefix)) {
            throw new Error('bankPrefix must be exactly 3 characters');
        }
        
        if (!bankData.owners || typeof bankData.owners !== 'string' || bankData.owners.length < 1) {
            throw new Error('owners is required and must be a string');
        }
        
        if (!validateUrl(bankData.jwksUrl)) {
            throw new Error('jwksUrl is invalid');
        }
        
        try {
            // Insert into database
            return insert('banks', bankData);
        } catch (error) {
            // Handle unique constraint violations
            if (error.message.includes('UNIQUE constraint failed')) {
                if (error.message.includes('apiKey')) {
                    throw new Error('API key already exists');
                }
                if (error.message.includes('bankPrefix')) {
                    throw new Error('Bank prefix already exists');
                }
            }
            throw error;
        }
    },
    
    /**
     * Find a bank by API key
     * @param {string} apiKey API key
     * @returns {Object|null} Bank or null if not found
     */
    findByApiKey: (apiKey) => {
        return getBy('banks', 'apiKey', apiKey);
    },
    
    /**
     * Get all banks with selected fields
     * @param {Array} fields Fields to select
     * @returns {Array} Array of banks
     */
    find: (fields = ['*']) => {
        return getAll('banks', fields);
    }
};

module.exports = BankModel;