/**
 * Validate a URL
 * @param {string} url URL to validate
 * @returns {boolean} True if valid URL
 */
const validateUrl = (url) => {
    const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
    return typeof url === 'string' && re.test(url);
};

/**
 * Validate bank prefix
 * @param {string} prefix Bank prefix to validate
 * @returns {boolean} True if valid prefix
 */
const validateBankPrefix = (prefix) => {
    return typeof prefix === 'string' && prefix.length === 3;
};

module.exports = {
    validateUrl,
    validateBankPrefix
};