var jwt = require('jsonwebtoken');
var hash = require('pbkdf2-password')()
const errors = require('../config/errors.json');
const fun = require('../modules/functions');
const sql = () => {
    return `SELECT json_build_object(
    'name',concat(c.fname,' ',c.lname),
    'email',c.email, 
    'username',c.username, 
    'number',c."cnumber", 
    'varified',c.varified, 
    'created_on',c.created_on, 
    'last_login',c.last_login, 
    'tccheck',c.tccheck
    )
    FROM public.clienttable c where c_id = $1;`;
}

module.exports = {
    userresponse: function (req, res) {
        //parameter not found show error
        fun.ValidAccessToken(req.query, req)
            .then(function (decoded) {
                var db = req.app.get('client'); //db client connect
                const clienttable = db.collection('clienttable')
                //query for authentication
                fun.getUserData(clienttable, decoded.a).then((result) => {
                    if (result.varified !== false) {
                        res.send(result)
                        fun.storeActivity(req, result._id, 'getalldata')
                    } else {
                        res.send({
                            "statusCode": 500,
                            "error": errors.email_not_verified,
                            "message": errors.email_not_verified_message
                        });
                    }
                }).catch((err) => {
                    res.send(err)
                })
            }).catch(function (errors) {
                res.send(errors)
            });
    }
}