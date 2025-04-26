const model = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    const blacklistToken = await model.findOne({ token: token });
    if (blacklistToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await model.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        return next();   
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}