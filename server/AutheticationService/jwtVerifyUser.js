const jwt = require('jsonwebtoken');

function jwtVerifyUser(token) {
    try {
        const decoded = jwt.verify(token, 'Jiong');
        console.log(decoded);
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = jwtVerifyUser;