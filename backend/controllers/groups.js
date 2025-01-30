//controllers/groups.js
const Group = require('../models/group');

module.exports = {
  createGroup,
  indexGroups,
};

async function createGroup(req, res) {
    try {
        const group = await Group.create(req.body);
        res.status(201).json(group);
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Failed to create group' });
    }
}

async function indexGroups(req, res) {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Failed to fetch groups' });
    }
}