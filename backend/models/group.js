const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema ({
  name: {
  type: String,
  unique: true,
  required: true,
  default: 'None',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('Group', groupSchema);