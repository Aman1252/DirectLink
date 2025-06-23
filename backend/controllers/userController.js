const userModel = require('../models/userModel');
const db = require('../db/db.js');

const {
  getUserByEmail,
  getUserByEmailOrMobile,
  createUser
} = userModel;

exports.signUpUser = (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = createUser({ name, email, mobile });
    res.status(201).json(user);
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginUser = (req, res) => {
  const { email, mobile } = req.body;

  try {
    const user = getUserByEmailOrMobile(email) || getUserByEmailOrMobile(mobile);

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please sign up first.' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchUser = (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const user = getUserByEmailOrMobile(query);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUsers = (req, res) => {
  try {
    const users = db.get('users').value();
    res.json(users);
  } catch (err) {
    console.error('Get Users Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};