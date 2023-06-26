var express = require('express');
const router = express.Router();

var userController = require('../src/user/userController');
router.route('/user/alltodo').post(userController.getAllTodo);
router.route("/user/login").post(userController.loginUser);
router.route('/user/addUser').post(userController.addUser);
router.route('/user/forgot/verify').post(userController.forgotVerify);
router.route('/user/forgot/reset').patch(userController.resetPassword);
router.route('/user/register').post(userController.register);
router.route("/user/todo").patch(userController.addTodo);
router.route("/user/todoEdit").patch(userController.editTodo);













module.exports = router;