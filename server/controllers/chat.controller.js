const chatController = ({ chatService }) => {
  return {
    getAllChatsInRoom: (req, res) => {
      const room = req.params.room;

      chatService.getAllChatsInRoom(room, res);
    },

    getChatById: (req, res) => {
      const chatId = req.params.chatId;

      chatService.getChatById(chatId, res);
    },

    createChat: (req, res) => {
      const chat = req.body;

      chatService.createChat(chat, res);
    },

    updateChat: (req, res) => {
      const chatId = req.params.chatId;
      const chat = req.body;

      chatService.updateChat(chat, chatId, res);
    },

    deleteChat: (req, res) => {
      const chatId = req.params.chatId;
      const chat = req.body;

      chatService.deleteChat(chat, chatId, res);
    }
  }
}

module.exports = chatController;
