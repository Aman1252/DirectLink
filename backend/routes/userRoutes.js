const express = require('express');
const router = express.Router(); 

const { signUpUser, searchUser , getAllUsers, loginUser } = require('../controllers/userController');

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/search', searchUser);
router.get('/all', getAllUsers);

module.exports = router;
