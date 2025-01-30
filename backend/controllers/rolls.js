//controllers/rolls.js
const Input = require('../models/input');

module.exports = {
    findRoller,
    initializeRoller,
};

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
        let input = await Input.findOne({ createdBy: userId });

        if (input) {
            input.result = result;
            input.numDice = numDice;
            input.diceSides = diceSides;
            input.modifier = modifier;
            input.source = source;
            input.formula = formula;
            await input.save();
            return res.status(200).json({ message: 'Roller updated successfully', input });
        } else {
            input = new Input({
                result,
                numDice,
                diceSides,
                modifier,
                source,
                formula,
                createdBy: userId,
            });
            await input.save();
            return res.status(201).json({ message: 'Roller created successfully', input });
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Create Roller Failed', error: e.message });
    }
}