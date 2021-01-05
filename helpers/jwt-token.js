const jwt = require("jsonwebtoken");
const util = require("util");
const generatetoken  = util.promisify(jwt.sign);
const verifyToken = util.promisify(jwt.verify);

module.exports.generatetoken = generatetoken;
module.exports.verifyToken = verifyToken;