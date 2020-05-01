const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

// method login start when we goes to the route localhost:5000/api/auth/login
router.post('/login', controller.login)

// method login start when we goes to the route localhost:5000/api/auth/register
router.post('/register', controller.register)

module.exports = router
