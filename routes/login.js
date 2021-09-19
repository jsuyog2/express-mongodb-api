var jwt = require('jsonwebtoken');
var hash = require('pbkdf2-password')()
const errors = require('../config/errors.json');
const fun = require('../modules/functions');

module.exports = {
    login: function (req, res) {
        //parameter not found show error
        fun.validateLoginData(req.body)
            .then(function () {
                var db = req.app.get('client'); //db client connect
                const clienttable = db.collection('clienttable')
                //query for authentication
                clienttable.find({
                    'email': req.body.email
                }).toArray(function (err, result) {
                    if (err) {
                        res.send({
                            "statusCode": 500,
                            "error": errors.internal_error,
                            "message": errors.db_not_connect
                        });
                        req.app.get('clientClose');
                    } else {
                        //show error if query failed
                        if (err) {
                            res.send({
                                "statusCode": 500,
                                "error": errors.internal_error,
                                "message": errors.db_not_connect
                            });
                        } else {
                            if (result.length == 0) {
                                res.send({
                                    "statusCode": 500,
                                    "error": errors.user_not_found,
                                    "message": errors.user_not_found_message
                                })
                            } else {
                                hash({
                                    password: req.body.password,
                                    salt: result[0].salt
                                }, function (err, pass, salt, hash) {
                                    if (err) {
                                        res.send({
                                            "statusCode": 500,
                                            "error": errors.internal_error,
                                            "message": err
                                        })
                                    } else if (hash === result[0].hash) {
                                        var data = {
                                            a: result[0]._id,
                                            v: result[0].varified,
                                            u: result[0].email
                                        }
                                        if (result[0].varified === false) {
                                            var token = fun.makeValidTempAccessToken(data);
                                            fun.sendMail(result[0].email, "Verify Your Account", "", "verify", token)
                                                .then(function () {
                                                    fun.storeActivity(req, result[0]._id, 'unverified login')
                                                    res.send({
                                                        "statusCode": 200,
                                                        "token": token,
                                                        "message": errors.success_unvrified_login
                                                    })
                                                })
                                                .catch(function (errors) {
                                                    res.send(errors)
                                                });
                                        } else {
                                            var token = fun.makeValidAccessToken(data, req);
                                            fun.storeActivity(req, result[0]._id, 'login')
                                            res.send({
                                                "statusCode": 200,
                                                "message": errors.success_login,
                                                "token": token

                                            })
                                        }
                                    } else {
                                        res.send({
                                            "statusCode": 500,
                                            "error": errors.password_wrong,
                                            "message": errors.password_wrong_message
                                        })
                                    }
                                });
                            }
                        }
                    }
                });
            }).catch(function (errors) {
                res.send(errors)
            });
    }
}