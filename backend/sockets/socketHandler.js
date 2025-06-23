const { getUserByEmailOrMobile } = require('../models/userModel');
const messageService = require('../services/messageService');

// Store online users (email -> socket.id)
const onlineUsers = new Map();

module.exports = function handleSocketConnection(io, socket) {
  console.log(`User connected: ${socket.id}`);

  // Client identifies themselves
  socket.on('identify', (email) => {
    onlineUsers.set(email, socket.id);
    io.emit('user-online', { email });

    const offlineMessages = messageService.getOfflineMessages(email);
    offlineMessages.forEach((msg) => {
      socket.emit('receive-message', msg);
    });

    messageService.clearOfflineMessages(email);
  });

  // Handle direct message
  socket.on('send-message', ({ toEmail, fromEmail, message, timestamp }) => {
  const toSocketId = onlineUsers.get(toEmail);

  const msgPayload = {
    fromEmail,
    message,
    timestamp: timestamp || Date.now()
  };

  if (toSocketId) {
    io.to(toSocketId).emit('receive-message', msgPayload);
  } else {
    messageService.storeOfflineMessage(toEmail, msgPayload);
  }
  });

  // Cleanup on disconnect
  socket.on('disconnect', () => {
    for (const [email, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(email);
        io.emit('user-offline', { email });
        console.log(`Disconnected user: ${email} (${socket.id})`);
        break;
      }
    }
  });
};
