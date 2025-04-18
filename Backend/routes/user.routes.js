const express = require('express')
const router = express.Router();
const {body} = require('express-validator')
const userConterller = require('../controllers/user.controller')


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:2}).withMessage('First name must be at least 2 character long'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 character long'),
])


module.exports = router