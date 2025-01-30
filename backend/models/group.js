const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema ({
  name: {
  type: String,
  default: null,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('Group', groupSchema);