const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formulaSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      diceSides: {
        type: Number,
        required: true,
      },
      numDice: {
        type: Number,
        required: true,
      },
      modifier: {
        type: Number,
        required: true, 
      },
      collection: {
        type: String,
        enum: ['None', 'Create Collection'],
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    }
  );

module.exports = mongoose.model('Formula', formulaSchema);