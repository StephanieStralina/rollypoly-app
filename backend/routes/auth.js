//routes/auth.js
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/auth'

// POST /api/auth/signup
router.post('/signup', authCtrl.signUp);
// POST /api/auth/login
router.post('/login', authCtrl.logIn);
//PUST /api/auth/update
router.put('/update', ensureLoggedIn, authCtrl.updateUser);

module.exports = router;