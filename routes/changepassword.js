var jwt = require('jsonwebtoken');
var hash = require('pbkdf2-password')()
const errors = require('../config/errors.json');
const fun = require('../modules/functions');

module.exports = {
    changepassword: function (req, res) {
        //parameter not found show error
        fun.validateTempAccessToken(req.query)
            .then(function (decoded) {
                var db = req.app.get('client'); //db client connect
                const clienttable = db.collection('clienttable')
                //query for authentication
                fun.getUserData(clienttable, decoded.a).then((result) => {
                    fun.matchPassowrds(req.query, req.body)
                        .then(function () {
                            hash({
                                password: req.body.password
                            }, function (err, pass, salt, hash) {
                                clienttable.updateOne({
                                    _id: result._id
                                }, {
                                    $set: {
                                        salt: salt,
                                        hash: hash
                                    }
                                }, function (err, re) {
                                    if (err) {
                                        res.send({
                                            "statusCode": 500,
                                            "error": errors.internal_error,
                                            "message": errors.db_not_connect
                                        });
                                    } else {
                                        res.send({
                                            "statusCode": 200,
                                            "message": errors.success_changepassword
                                        });
                                        fun.storeActivity(req, result._id, 'changepassword')
                                    }
                                })
                            })
                        })
                        .catch(function (errors) {
                            res.send(errors)
                        });
                }).catch((err) => {
                    res.send(err)
                })
            }).catch(function (errors) {
                res.send(errors)
            });
    }
}