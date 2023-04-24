const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql2/promise')
// Authetication Service
const encryptPassword = require("./AutheticationService/encryptPassword");
const verifyPassword = require("./AutheticationService/verifyPassword")

const jwtSignUser = require("./AutheticationService/jwtSignUser");
const jwtVerifyUser = require('./AutheticationService/jwtVerifyUser');


const app = express();
app.use(morgan('combined'));
app.use(cors());
// Parsing the POST request body
app.use(express.json())

// Configure Port Number
const port = 8081;

// Create a MySQL Connection pool
const pool = mysql.createPool({
    host: '',   //\你的数据库服务器的host
    user: '',   //你用于登陆数据库服务器的用户名
    password: '',   //你用于登陆数据库服务器的密码
    database: '',  //你的数据库的名称
});

// Process post requests  path:/register
app.post('/register', async (req, res) => {
    // Obtain data from the request body
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Check if the email already exists
        const [row] = await pool.query(`SELECT * FROM TabTrackerUserData WHERE t_email='${email}'`);

        // If the same email exists, an error message is returned
        if (row.length > 0) {
            res.json({ error: "This email has already been registered" });
        } else {
            // Otherwise, insert the data into the data table
            (async () => {
                const hash = await encryptPassword(password);
                const [result] = await pool.query(`INSERT INTO TabTrackerUserData(t_email,t_password) VALUES ('${email}','${hash}')`);
                // Returned written data in JSON format
                res.json({ id: result.insertId, email: email, password: hash });
            })();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Interval Server Error" });
    }
})

// Process post requests  path:/login
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const [row] = await pool.query(`SELECT * FROM TabTrackerUserData WHERE t_email='${email}'`);
        if (row.length === 0) {
            res.json({ error: "User does not exist, please register first" });
        } else {
            verifyPassword(password, row[0].t_password).then((match) => {
                if (match) {
                    res.json({
                        success: "Login successful",
                        user: {
                            id: row[0].id,
                            email: row[0].t_email,
                            password: row[0].t_password,
                        },
                        token: jwtSignUser({ id: row[0].id }),
                    });
                } else {
                    res.json({ error: "Password error, please try again" });

                }
            }).catch((err) => {
                res.json({ error: `Error comparing password: ${err}` });
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Interval Server Error" });
    }
})

// Process post requests  path:/creategame
app.post('/creategame', async (req, res) => {
    const name = req.body.name;
    const developer = req.body.developer;
    const publisher = req.body.publisher;
    const image = req.body.image;
    const description = req.body.description;
    const CreatedAt = new Date(new Date().getTime()).toUTCString();

    try {
        const [result] = await pool.query(`INSERT INTO TabTrackerData(name,developer,publisher,CreateAt,image,description) VALUES ('${name}','${developer}','${publisher}','${CreatedAt}','${image}','${description}')`);
        res.json({ id: result.insertId, developer: developer, publisher: publisher, image: image, CreatedAt: CreatedAt, description: description });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Interval Server Error" });
    }
})

// Process get requests  path:/getgame
app.get('/getgame', async (_, res) => {
    try {
        const [row] = await pool.query('SELECT id,name,developer,publisher,CreateAt,image,description FROM TabTrackerData ORDER BY RAND() LIMIT 2');
        res.json(row);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Interval Server Error" });
    }
})

// Process get requests  path:/MyTab/:id
app.get('/MyTab/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ error: "Missing necessary parameters" });
        return;
    }
    try {
        const [row] = await pool.query(`SELECT name,developer,publisher,CreateAt,image,description,UpdateAt FROM TabTrackerData WHERE id='${id}'`);
        if (row.length === 0) {
            res.json({ error: "Tab does not exist, please create it first" });
        } else {
            res.json(row);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Interval Server Error" });
    }
})

// Process put requests  path:/MyTab/:id/edit
app.put('/MyTab/:id/edit', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ error: "Missing necessary parameters" });
        return;
    }
    try {
        const name = req.body.name;
        const developer = req.body.developer;
        const publisher = req.body.publisher;
        const image = req.body.image;
        const description = req.body.description;
        const UpdateAt = new Date(new Date().getTime()).toUTCString();
        const [row] = await pool.query(`SELECT * FROM TabTrackerData WHERE id='${id}'`);
        if (!row || !row.length) {
            res.json({ error: "Tab not found" });
        } else {
            const [result] = await pool.query(`UPDATE TabTrackerData SET name=('${name}'),developer=('${developer}'),publisher=('${publisher}'),UpdateAt=('${UpdateAt}'),image=('${image}'),description=('${description}') WHERE id='${id}'`);
            res.json(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Interval Server Error" });
    }
})

// Process get requests  path:/MyTab
app.get('/MyTab', async (req, res) => {
    try {
        const search = req.query.search;
        const [row] = await pool.query(`SELECT * FROM TabTrackerData WHERE CONCAT(name,developer,publisher) LIKE '%${search}%'`);
        res.json(row);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Interval Server Error" });
    }
})

// Process post requests  path:/bookmarkgame
app.post('/bookmarkgame', async (req, res) => {
    const tabId = req.body.tabId;
    const userId = req.body.userId;
    const token = req.body.token;
    const bookMarkAt = new Date(new Date().getTime()).toUTCString();
    if (jwtVerifyUser(token)) {
        try {
            const [results] = await pool.query(`SELECT * FROM TabTrackerBookMark WHERE userId='${userId}' AND tabId='${tabId}'`);
            if (results.length > 0) {
                return res.status(400).json({ error: "Non repeatable bookmark" })
            } else {
                const [row] = await pool.query(`SELECT * FROM TabTrackerUserData WHERE id='${userId}'`);
                if (row.length === 0) {
                    return res.status(404).json({ error: "User does not exist" })
                } else {
                    const [rows] = await pool.query(`SELECT * FROM TabTrackerData WHERE id='${tabId}'`);
                    if (rows.length === 0) {
                        return res.status(404).json({ error: "The tab does not exist" })
                    } else {
                        const [result] = await pool.query(`INSERT INTO TabTrackerBookMark(tabId,userId,bookMarkAt) VALUES ('${tabId}','${userId}','${bookMarkAt}')`);
                        return res.json({
                            success: "Bookmark successfully",
                            bookmark: {
                                id: result.insertId,
                                userId: userId,
                                tabId: tabId
                            },
                            tab: rows[0]
                        })
                    }
                }
            }
        } catch (err) {
            res.status(500).json({ error: "Interval Server Error" });
        }

    } else {
        res.status(401).json({ error: "Token is illegal" });
    }

})

// Process post requests  path:/unbookmark
app.post('/unbookmarkgame', async (req, res) => {
    const tabId = req.body.tabId;
    const userId = req.body.userId;
    const token = req.body.token;
    const bookmarkId = req.body.bookmarkId;

    if (jwtVerifyUser(token)) {
        try {
            const [row] = await pool.query(`SELECT * FROM TabTrackerUserData WHERE id='${userId}'`);
            if (row.length === 0) {
                return res.status(404).json({ error: "User does not exist" })
            } else {
                const [rows] = await pool.query(`SELECT * FROM TabTrackerData WHERE id='${tabId}'`);
                if (rows.length === 0) {
                    return res.status(404).json({ error: "The tab does not exist" })
                } else {
                    const [result] = await pool.query(`DELETE FROM TabTrackerBookMark WHERE bookmarkId='${bookmarkId}'`);
                    if (result.affectedRows > 0) {
                        return res.json({ success: "Unbookmark successfully" })
                    } else {
                        return res.json({ error: "Unbookmark failed" });
                    }
                }
            }
        } catch (err) {
            res.status(500).json({ error: "Interval Server Error" });
        }
    } else {
        res.status(401).json({ error: "Token is illegal" });
    }
})

// Process post requests  path:/getbookmark
app.post('/getbookmark', async (req, res) => {
    const userId = req.body.userId;
    const token = req.body.token;

    if (jwtVerifyUser(token)) {
        try {
            const [row] = await pool.query(`SELECT * FROM TabTrackerBookMark WHERE userId='${userId}'`);
            if (row.length > 0) {
                res.json(row)
            } else {
                res.json({ message: "No information found" });
            }

        } catch (err) {
            res.status(500).json({ error: "Interval Server Error" });
        }
    } else {
        res.status(401).json({ error: "Token is illegal" });
    }
})

// Process post requests  path:/homepageget
app.post('/homepageget', async (req, res) => {
    const tabId = req.body.tabId;
    const token = req.body.token;
    const result = [];

    if (jwtVerifyUser(token)) {
        try {
            for (const tab of tabId) {
                const [row] = await pool.query('SELECT * FROM TabTrackerData WHERE id = ?', [tab]);
                result.push(...row);
            }
            if (result.length > 0) {
                res.json(result)
            } else {
                res.json({ message: "No information found" });
            }
        } catch (err) {
            res.status(500).json({ error: "Interval Server Error" });
        }
    } else {
        res.status(401).json({ error: "Token is illegal" });
    }
})

// Process post requests  path:/history
app.post('/history', async (req, res) => {
    const tabId = req.body.tabId;
    const result = [];

    try {
        for (const tab of tabId) {
            const [row] = await pool.query('SELECT * FROM TabTrackerData WHERE id = ?', [tab]);
            result.push(...row);
        }
        if (result.length > 0) {
            res.json(result)
        } else {
            res.json({ message: "No information found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Interval Server Error" });
    }
})

app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});