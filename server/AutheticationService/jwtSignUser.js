const jwt = require("jsonwebtoken");

function jwtSignUser(payload) {
    // JWT secret key
    const secretKey = 'Jiong';
    // Limit Token Time
    const ONE_WEEK = 3600 * 24 * 7;
    return jwt.sign(payload, secretKey, { expiresIn: ONE_WEEK });
}

module.exports = jwtSignUser;