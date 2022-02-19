const isAdmin = require('./auth/isAdmin');
const isLoggedIn = require('./auth/isLoggedIn');

module.exports = {
    isAdmin: isAdmin.isAdmin,
    isLoggedIn: isLoggedIn.isLoggedIn
}