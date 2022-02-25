require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    try{
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        next();
    } catch(e){
        return res.status(401).send({message: "Unauthenticated request. Please login to make requests!"});
    }
}