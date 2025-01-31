//routes/formulas.js
const express = require('express');
const router = express.Router();
const formulaCtrl = require('../controllers/formulas');

// Paths for '/api/formulas'

// POST /dashboard, formulaCtrl.createFormula
router.post('/', formulaCtrl.createFormula)
//INDEX /dashboard, formulaCtrl.index
router.get('/', formulaCtrl.index)
//SHOW /formulas/:formulaID, formulaCtrl.show
router.get('/:formulaId', formulaCtrl.show)
//UPDATE /formulas/:formulaID, formulaCtrl.update
router.put('/:formulaId', formulaCtrl.update)
//DELETE /formulas/:fomulaID, formulaCtrl.deleteFormula
router.delete('/:formulaId', formulaCtrl.deleteFormula)

module.exports = router;