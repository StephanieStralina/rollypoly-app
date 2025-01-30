//routes/groups.js
const express = require('express');
const router = express.Router();
const groupCtrl = require('../controllers/groups');

//All Routes start with groups

//INDEX /groups find roller functionality, groupCtrl.index
router.get('/', groupCtrl.indexGroups)

//CREATE /dashboard find roller functionality, rollCtrl.index
router.post('/', groupCtrl.createGroup)


module.exports = router;