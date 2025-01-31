//routes/rolls.js

const express = require('express');
const router = express.Router();
const rollCtrl = require('../controllers/rolls');

//All Routes start with dashboard

//INDEX /dashboard find roller functionality, rollCtrl.index
router.get('/', rollCtrl.index)
//INDEX /dashboard find roller functionality, rollCtrl.index
router.get('/:userId', rollCtrl.findRoller)
//CREATE /dashboard create roller functionality, rollCtrl.initializeRoller
router.post('/', rollCtrl.initializeRoller)

module.exports = router;