const express = require('express');
const router = express.Router();
const formulaCtrl = require('../controllers/formulas');

// Paths for '/api/dashboard'

// POST /dashboard, formulaCtrl.createFormula
router.post('/dashboard', formulaCtrl.createFormula)

//INDEX /dashboard, formulaCtrl.index
router.get('/dashboard', formulaCtrl.index)

// Paths for '/api/formulas'

//SHOW /formulas/:formulaID, formulaCtrl.show
router.get('/formulas/:formulaId', formulaCtrl.show)

//UPDATE /formulas/:formulaID, formulaCtrl.update
router.put('/formulas/:formulaId', formulaCtrl.update)

module.exports = router;