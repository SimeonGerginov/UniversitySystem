const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chatSchema = new Schema({
  room: String,
  username: String,
  message: String,
  updated_at: {
    type: Date,
    default: Date.now
  }
});

let Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
