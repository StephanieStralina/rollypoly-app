const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inputSchema = new Schema(
  {
    diceSides: {
      type: Number,
      required: true,
      default: 20,
    },
    numDice: {
      type: Number,
      required: true,
      default: 1,
    },
    modifier: {
      type: Number,
      required: true,
      default: 0, 
    },
    result: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      enum: ['manual', 'formula'],
      default: 'manual',
    },
    formula: {
      type: Schema.Types.ObjectId,
      ref: 'Formula',
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  }
);

module.exports = mongoose.model('Input', inputSchema);