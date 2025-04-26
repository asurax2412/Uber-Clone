const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
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
    body('vehicle.color')
        .notEmpty().withMessage('Color is required')
        .isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate')
        .notEmpty().withMessage('Plate is required')
        .isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity')
        .notEmpty().withMessage('Capacity is required')
        .isNumeric().withMessage('Capacity must be a number')
        .isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType')
        .notEmpty().withMessage('Vehicle type is required')
        .isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type'),
], captainController.registerCaptain);


module.exports = router;