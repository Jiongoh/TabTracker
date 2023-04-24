const bcrypt = require("bcrypt-nodejs");

async function verifyPassword(plainTextPassword, hashedPassword) {
    // try {
    //     return await bcrypt.compare(plainTextPassword, hashedPassword);
    // } catch (err) {
    //     console.error("Error comparing password: ", err);
    //     return null;
    // }

    return new Promise((resolve, reject) => {
        bcrypt.compare(plainTextPassword, hashedPassword, (err, match) => {
            if (err) {
                console.error("Error comparing password: ", err);
                reject("failed");
            } else {
                resolve(match);
            }
        })
    })
}

module.exports = verifyPassword;