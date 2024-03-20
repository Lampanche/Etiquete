const express = require('express');
const UserController = require('../Controllers/userController');

const router = express.Router();


router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.get('/users', UserController.getAllUsers);
router.get('/autocomplete/users',UserController.autoComplete);

module.exports = router;