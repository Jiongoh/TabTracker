// Password encryption
// Call function to generate encrypted password:
// (async ()=>{
//     const password='mypassword';
//     const hashPassword=await encryptPassword(password);
// })()

const bcrypt = require("bcryptjs");

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            } else {
                bcrypt.hash(password, salt, null, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                })
            }
        })
    })
}

async function encryptPassword(password) {
    try {
        const hash = await hashPassword(password);
        return hash;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = encryptPassword;
