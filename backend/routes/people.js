const express = require("express");
const router = express.Router();
const mysqlConnection = require("./../connection");
const jwt = require("jsonwebtoken");

const SECRET_KEY = '1234';

router.post("/register", (req, res) => {
    checkEmailIdExist(req, (response, error) => {
        if (!error) {
            let user_count = response['user_count'];
            if (user_count == 0) {
                let query = `insert into form_tbl(firstname,lastname,emailId,password) values("${req.body.firstname}","${req.body.lastname}","${req.body.emailId}","${req.body.password}")`
                mysqlConnection.query(query, (err, rows, fields) => {
                    if (!err) {
                        res.send(rows);
                    } else {

                        console.log(err)
                    }
                })
            } else {
                res.status(403).send('email id is already exist. please try again with another email id')
            }
        } else {
            res.status(500).send('something went wrong')
        }

    })
})

function checkEmailIdExist(req, response) {
    let query = `select count(*) as user_count from form_tbl where emailId="${req.body.emailId}"`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            response(rows[0], null)
        } else {
            response(null, err)
            console.log('this is the error:', err)
        }
    })

}

router.post('/login', (req, res) => {
    let query = `select* from form_tbl where emailId="${req.body.emailId}" and password="${req.body.password}"`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (rows.length == 1) {
            //create jwt token and send response
            console.log('this is the rows', rows)
            let token = createToken(rows[0])
            res.status(200).send({ token: token })
        } else {
            res.status(404).send('username or password is incorrect')
            console.log(err)
        }
    })
})

router.post('/todo', (req, res) => {
    jwt.verify(req.headers.authorization.replace('Bearer ', ''), SECRET_KEY, function (err, decoded) {
        if (!err) {
            let query = `insert into to_do(name,discription,status,userid) values("${req.body.name}","${req.body.discription}","${req.body.status}","${req.body.userid}")`
            //jwt verify
            mysqlConnection.query(query, (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    console.log(err);
                }
            })
        } else {
            res.status(400).send('token is expired')
        }
    });
})

router.get('/todo/user/:userid', (req, res) => {
    jwt.verify(req.headers.authorization.replace('Bearer ', ''), SECRET_KEY, function (err, decoded) {
        if (!err) {
            let query = `select* from to_do where userid="${req.params.userid}"`
            mysqlConnection.query(query, (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    console.log(err);
                }
            })
        } else {
            res.status(400).send('token is expired')
        }
    });
})
router.get('/todo/:id', (req, res) => {
    jwt.verify(req.headers.authorization.replace('Bearer ', ''), SECRET_KEY, function (err, decoded) {
        if (!err) {
            let query = `select* from to_do where id="${req.params.id}"`
            mysqlConnection.query(query, (err, rows, fields) => {
                if (!err) {
                    res.send(rows[0])
                    console.log('this is the rows:', rows)
                } else {
                    console.log(err);
                }
            })
        } else {
            res.status(400).send('token is expired');
        }
    });
})

router.put('/todo', (req, res) => {
    jwt.verify(req.headers.authorization.replace('Bearer ', ''), SECRET_KEY, function (err, decoded) {
        if (!err) {
            let query = `update to_do set name='${req.body.name}',discription='${req.body.discription}' where id='${req.body.id}'`
            mysqlConnection.query(query, (err, rows, fields) => {
                if (!err) {
                    res.send(rows)
                } else {
                    console.log(err);
                }
            })
        } else {
            res.status(400).send('token is expired');
        }
    });
})

router.delete('/todo/:id', (req, res) => {
    jwt.verify(req.headers.authorization.replace('Bearer ', ''), SECRET_KEY, function (err, decoded) {
        if (!err) {
            let query = `delete from to_do where id="${req.params.id}"`
            mysqlConnection.query(query, (err, rows, fields) => {
                if (!err) {
                    res.send(rows)
                } else {
                    console.log(err);
                }
            })
        } else {
            res.status(400).send('token is expired');
        }
    });
})

createToken = function (user) {
    let token = jwt.sign({
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
        emailId: user.emailId
    }, SECRET_KEY, {
            expiresIn: 86400
        })
    return token;
}


module.exports = router;