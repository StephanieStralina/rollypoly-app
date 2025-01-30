//controllers/formulas.js
const Formula = require('../models/formula');

module.exports = {
  createFormula,
  index,
  show,
  update,
  deleteFormula
};


async function createFormula(req, res) {
    try {
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
    res.status(200).json(formula);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e.message });
  }
}

async function update(req, res) {
  try {
    const formula = await Formula.findById(req.params.formulaId);
    if (!formula.createdBy.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that! >:[ ")
    };

    const updatedFormula = await Formula.findByIdAndUpdate(
      req.params.formulaId,
      req.body,
      { new: true }
    );

    updatedFormula._doc.createdBy = req.user._id;
    res.status(200).json(updatedFormula);
  } catch (e) {
    console.log(e);
    res.status.json({ e: e.message })
  }
}

async function deleteFormula(req, res) {
  try {
    const formula = await Formula.findById(req.params.formulaId);
    if (!formula.createdBy.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }
    const deletedFormula = await Formula.findByIdAndDelete(req.params.formulaId);
    res.status(200).json(deletedFormula);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e.message })
  }
}