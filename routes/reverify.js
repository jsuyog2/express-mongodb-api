var jwt = require('jsonwebtoken');
var hash = require('pbkdf2-password')()
const errors = require('../config/errors.json');
const fun = require('../modules/functions');

module.exports = {
    reverify: function (req, res) {
        //parameter not found show error
        fun.validateAccessTokenWithoutVerify(req.query)
            .then(function (decoded) {
                fun.validateEmail(decoded)
                    .then(function () {
                        var db = req.app.get('client'); //db client connect
                        const clienttable = db.collection('clienttable')
                        //query for authentication
                        fun.getUserData(clienttable, decoded.a).then((result) => {
                            if (result.length === 0) {
                                res.send({
                                    "statusCode": 500,
                                    "error": errors.user_not_found,
                                    "message": errors.user_not_found_message
                                })
                            } else {
                                if (result.varified === false) {
                                    var data = {
                                        a: result._id,
                                        v: result.varified,
                                        u: result.email
                                    }
                                    var token = fun.makeValidTempAccessToken(data);
                                    fun.sendMail(result.email, "Verify Your Account", "", "verify", token)
                                        .then(function () {
                                            fun.storeActivity(req, result._id, 'reverify')
                                            res.send({
                                                "statusCode": 200,
                                                "message": errors.success_mail_sent
                                            })
                                        })
                                        .catch(function (errors) {
                                            res.send(errors)
                                        });
                                } else {
                                    res.send({
                                        "statusCode": 500,
                                        "error": errors.email_verified,
                                        "message": errors.email_verified_message
                                    });
                                }
                            }
                        }).catch((err) => {
                            res.send(err);
                        })
                    }).catch(function (errors) {
                        res.send(errors)
                    });
            }).catch(function (errors) {
                res.send(errors)
            });
    }
}