const Input = require('../models/input');

module.exports = {
    findRoller,
};

async function findRoller(req, res) {
    try {
        const userId = req.params.userId;  
        const input = await Input.findOne({ createdBy: userId }); 
        if (!input) {
            return res.status(404).json({ message: 'No roll found for this user' });
        }
        res.status(201).json(input);
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Create Formula Failed '});
    }
}