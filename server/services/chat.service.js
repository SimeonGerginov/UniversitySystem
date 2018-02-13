const Chat = require('../data/Chat');

const chatService = (utils) => {
  return {
    getAllChatsInRoom(room, res) {
      Chat.find({ room: room }, function(err, chats) {
        if(err) {
          return res.status(400).send({ success: false, err });
        }

        return res.status(200).send({ success: true, chats });
      });
    },

    getChatById(chatId, res) {
      Chat.findById(chatId, function(err, chat) {
        if(err) {
          return res.status(400).send({ success: false, err });
        }

        return res.status(200).send({ success: true, chat });
      });
    },

    createChat(chat, res) {
      Chat.create(chat, function(err, c) {
        if(err) {
          return res.status(400).send({ success: false, err });
        }

        return res.status(200).send({ success: true, c });
      });
    },

    updateChat(chat, chatId, res) {
      Chat.findByIdAndUpdate(chatId, chat, function(err, c) {
        if(err) {
          return res.status(400).send({ success: false, err });
        }

        return res.status(200).send({ success: true, c });
      });
    },

    deleteChat(chat, chatId, res) {
      Chat.findByIdAndRemove(chatId, chat, function(err, c) {
        if(err) {
          return res.status(400).send({ success: false, err });
        }

        return res.status(200).send({ success: true, c });
      });
    }
  }
}

module.exports = chatService;
