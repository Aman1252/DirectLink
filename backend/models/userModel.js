const db = require('../db/db.js');

const getUserByEmailOrMobile = (query) => {
  return db.get('users').find((u) => u.email === query || u.mobile === query).value();
};

const getUserByEmail = (email) => {
  return db.get('users').find({ email }).value();
};

const createUser = ({ name, email, mobile }) => {
  const newUser = { name, email, mobile };
  db.get('users').push(newUser).write();
  return newUser;
};

module.exports = {
  getUserByEmailOrMobile,
  getUserByEmail,
  createUser,
};
