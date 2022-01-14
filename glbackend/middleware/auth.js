const jwt = require("jsonwebtoken"),
    User = require('../database/models/student.model');

module.exports = {
    isLoggedIn : async function (req, res, next){
        if(! req.headers.auth)
            return res.status(400).send("provide the authorization in header !")
        const token = req.headers.auth
        try{
            let payload = jwt.verify(token, 'secret key')
            req.user = await User.findById(payload.id).select({password : 0})
            next()
        }catch(e){
            console.log("error while authoring the user in auth.js !!!\nERROR :");
            console.error(e);
        }
    }
}