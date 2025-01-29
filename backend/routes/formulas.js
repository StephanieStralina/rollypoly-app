const express = require('express');
const router = express.Router();
const formulaCtrl = require('../controllers/formulas');

// All paths start with '/api/dashboard'

// POST /, postsCtrl.createFormula
router.post('/', formulaCtrl.createFormula)


module.exports = router;