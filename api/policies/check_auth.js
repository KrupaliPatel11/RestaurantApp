const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        console.log(decoded)
        next();
    } catch (error) {
        return await res.status(401).json({
            FAILED: "Auth failed"
        })
    }
};