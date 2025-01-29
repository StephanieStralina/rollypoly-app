const Formula = require('../models/formula');

module.exports = {
  createFormula,
  index,
  show,
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

async function index(req, res) {
  const formulas = await Formula.find({ createdBy: req.user._id })
  res.status(200).json(formulas);
}

async function show(req, res) {
  try {
    const formula = await Formula.findById(req.params.formulaId);
    console.log(formula);
    res.status(200).json(formula);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e.message });
  }
}