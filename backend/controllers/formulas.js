const Formula = require('../models/formula');

module.exports = {
  createFormula,
//   update
};


async function createFormula(req, res) {
    try {
        console.log(req.body);
        req.body.createdBy = req.user._id;
        const formula = await Formula.create(req.body)
        res.status(201).json(formula);
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Create Formula Failed '});
    }
}