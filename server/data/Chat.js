const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  room: String,
  username: String,
  message: String,
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const chat = mongoose.model('Chat', chatSchema);

module.exports = chat;
