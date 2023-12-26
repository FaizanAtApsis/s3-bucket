const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const { User } = require("../models");

exports.protect = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    // Make sure token exists
    if (!token) {
        return res.status(401).json("User is unauthorized!");
    }
    try {
        // Verify token
        const decoded =  jwt.decode(token, process.env.JWT_SECRET);
        
        req.user = await User.findOne({
            where: {
                id: decoded.id,
            }
        });

        if (!req.user) {
            return res.status(401).json({
                success: false,
                msg: `User is unauthorized!`,
            });
        }
        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json("User is unauthorized!");
    }
});