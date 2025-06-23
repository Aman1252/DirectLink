const db = require('../db/db');

// Store an offline message
const storeOfflineMessage = (toEmail, message) => {
  db.get('messages')
    .push({ toEmail, ...message })
    .write();
};

// Get all offline messages for a user
const getOfflineMessages = (toEmail) => {
  return db.get('messages')
    .filter({ toEmail })
    .value();
};

// Clear offline messages for a user
const clearOfflineMessages = (toEmail) => {
  const messages = db.get('messages')
    .remove({ toEmail })
    .write();
  return messages;
};

module.exports = {
  storeOfflineMessage,
  getOfflineMessages,
  clearOfflineMessages,
};
