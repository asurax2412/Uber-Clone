const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');



router.post('/register', [
    
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid Email'),
    body('fullname.firstname')
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.registerUser);


router.post('/login', [
    
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid Email'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.loginUser);


router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);
module.exports = router;
