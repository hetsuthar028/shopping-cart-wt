require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.isAdmin = (req, res, next) => {
    let decoded = jwt.decode(req.headers.authorization);
    if(decoded.isAdmin === true){
        next()
    } else {
        return res.status(403).send({message: "Unauthorized request"});
    }
}