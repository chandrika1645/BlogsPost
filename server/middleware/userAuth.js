const JWT_SECRET = process.env.JWT_SECRET_USER;
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Failed to authenticate token" });
        }

        req.userId = decoded.id;
        req.username = decoded.username;
        next();
    })
}

module.exports = userMiddleware;