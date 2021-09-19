var jwt = require('jsonwebtoken');
var hash = require('pbkdf2-password')()
const errors = require('../config/errors.json');
const fun = require('../modules/functions');

module.exports = {
    register: function (req, res) {
        //parameter not found show error
        fun.validateRegisterData(req.body)
            .then(function () {
                var db = req.app.get('client'); //db client connect
                const clienttable = db.collection('clienttable')
                //query for authentication
                clienttable.find({
                    'email': req.body.email,
                    'cnumber': req.body.contactNo,
                    'username': req.body.username
                }).toArray(function (err, result) {
                    if (err) {
                        res.send({
                            "statusCode": 500,
                            "error": errors.internal_error,
                            "message": errors.db_not_connect
                        });
                        req.app.get('clientClose');
                    } else {
                        if (result.length !== 0) {
                            res.send({
                                "statusCode": 500,
                                "error": errors.user_found,
                                "message": errors.user_found_message
                            })
                        } else {
                            hash({
                                password: req.body.password
                            }, function (err, pass, salt, hash) {
                                if (err) {
                                    res.send({
                                        "statusCode": 500,
                                        "error": errors.internal_error,
                                        "message": err
                                    })
                                } else {
                                    clienttable.insertMany([{
                                        'fname': req.body.fname,
                                        'lname': req.body.lname,
                                        'salt': salt,
                                        'hash': hash,
                                        'email': req.body.email,
                                        'username': req.body.username,
                                        'cnumber': req.body.contactNo,
                                        'varified': false,
                                        'created_on': new Date(),
                                        'tccheck': req.body.tcCheck
                                    }], function (err, result) {
                                        if (err) {
                                            res.send({
                                                "statusCode": 500,
                                                "error": errors.internal_error,
                                                "message": errors.db_not_connect
                                            });
                                            req.app.get('clientClose');
                                        } else {
                                            clienttable.find({
                                                _id: result.insertedIds[0]
                                            }).toArray(function (err, row) {
                                                var data = {
                                                    a: row[0]._id,
                                                    v: row[0].varified,
                                                    u: row[0].email
                                                }
                                                var token = fun.makeValidTempAccessToken(data);
                                                fun.sendMail(row[0].email, "Verify Your Account", "", "verify", token)
                                                    .then(function () {
                                                        fun.storeActivity(req, row[0]._id, 'registration')
                                                        res.send({
                                                            "statusCode": 200,
                                                            "token": token,
                                                            "message": errors.success_registration
                                                        })
                                                    })
                                                    .catch(function (errors) {
                                                        res.send(errors)
                                                    });
                                            })

                                        }
                                    });
                                }
                            })
                        }
                    }
                });
            }).catch(function (errors) {
                res.send(errors)
            });
    }
}