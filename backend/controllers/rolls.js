//controllers/rolls.js
const Input = require('../models/input');
const User = require('../models/user');
const mongoose = require('mongoose');

module.exports = {
    findRoller,
    initializeRoller,
    index,
};

async function index(req, res) {
    const user = await User.findById(req.user._id ).populate('rollHistory');
    const historyArr = user.rollHistory;
    res.status(200).json(historyArr);
  }

async function findRoller(req, res) {
    try {
        const input = await Input.findOne({ createdBy: req.params.userId }); 
        return res.status(200).json(input || null);
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Find Roller Failed '});
    }
}


async function initializeRoller(req, res) {
    try {
        const { userId, result, numDice, diceSides, modifier, source, formula } = req.body;
        const userObjectId = new mongoose.Types.ObjectId(userId); 
        let input = await Input.findOne({ createdBy: userObjectId });
        
        if (input) {
            input.result = result;
            input.numDice = numDice;
            input.diceSides = diceSides;
            input.modifier = modifier;
            input.source = source;
            input.formula = formula;
            await input.save();
        } else {
            input = new Input({
                result,
                numDice,
                diceSides,
                modifier,
                source,
                formula,
                createdBy: userObjectId,
            });
            await input.save();
        }

        const user = await User.findById(userObjectId);

        if (user) {
            if (user.rollHistory.length >= 10) {
                user.rollHistory = user.rollHistory.slice(1);
            }
            user.rollHistory.push({
                result: input.result,
                numDice: input.numDice,
                diceSides: input.diceSides,
                modifier: input.modifier,
                source: input.source,
                formula: input.formula,
                createdBy: input.createdBy,
            });
            await user.save();
        }
        return res.status(201).json({ message: 'Roller saved successfully', input });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Create Roller Failed', error: e.message });
    }
}