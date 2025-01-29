const express = require('express');
const router = express.Router();
const rollCtrl = require('../controllers/rolls');

//INDEX /dashboard, rollCtrl.index
router.get('/dashboard/:userId', rollCtrl.findRoller)


module.exports = router;