var jwt = require('jsonwebtoken');
var hash = require('pbkdf2-password')()
const errors = require('../config/errors.json');
const fun = require('../modules/functions');

module.exports = {
    forgotpassword: function (req, res) {
        //parameter not found show error
        fun.validateEmail(req.body)
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
                        if (result.length === 0) {
                            res.send({
                                "statusCode": 500,
                                "error": errors.user_found,
                                "message": errors.user_found_message
                            })
                        } else {
                            var data = {
                                a: result[0]._id,
                                v: result[0].varified,
                                u: result[0].email
                            }
                            var token = fun.makeValidTempAccessToken(data);
                            fun.sendMail(result[0].email, "Change Your Password", "", "changepassword", token)
                                .then(function () {
                                    res.send({
                                        "statusCode": 200,
                                        "message": errors.success_mail_sent
                                    });
                                    fun.storeActivity(req, result[0]._id, 'forgotpassword')
                                })
                                .catch(function (errors) {
                                    res.send(errors)
                                });

                        }
                    }
                })
            }).catch(function (errors) {
                res.send(errors)
            });
    }
}