const express = require('express')
const controller = require('../controllers/analitics')
const router = express.Router()

// method login start when we goes to the route localhost:5000/api/auth/login
router.get('/overview', controller.overview)

// method login start when we goes to the route localhost:5000/api/auth/register
router.post('/analitics', controller.analitics)

module.exports = router
