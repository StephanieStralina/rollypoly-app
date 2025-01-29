const express = require('express');
const router = express.Router();
const formulaCtrl = require('../controllers/formulas');

// All paths start with '/api/dashboard'

// POST /, formulaCtrl.createFormula
router.post('/', formulaCtrl.createFormula)

//INDEX /, formulaCtrl.index
router.get('/', formulaCtrl.index)


module.exports = router;