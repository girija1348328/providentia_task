let jwt = require("jsonwebtoken")
let decodedToken;

const authentication = async function (req, res, next) {
    try {
      let token = req.headers["x-api-key"] || req.headers["x-Api-key"];
  
      if (!token) return res.status(401).send({ status: false, message: "Missing authentication token in request" });
  
           decodedToken = jwt.verify(token, "secret")
  
           req.decodedToken = decodedToken
  
          next();
  
     
  
    } catch (error) {
      if (error.message == 'invalid token') return res.status(400).send({ status: false, message: "invalid token" });
  
      if (error.message == "jwt expired") return res.status(400).send({ status: false, message: "please login one more time, token is expired" });
  
      if (error.message == "invalid signature") return res.status(401).send({ status: false, message: "invalid signature" });
  
      return res.status(500).send({ status: false, message: error.message });
    }
  };

  module.exports = {authentication}