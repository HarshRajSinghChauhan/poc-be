const { auth } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/authorize.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const userController = require('./user.controller');
const express = require('express');
const { loginSchema, registerSchema } = require('./user.validate');
const router = express.Router();

router.post("/register", validate(registerSchema), (req, res) => {
    userController.registerUser(req, res);
});

router.get("/getAllUsers", auth, authorize('admin'), (req, res) => {
    userController.getAllUsers(req, res);
});

router.post("/login", validate(loginSchema), (req, res) => {
    userController.loginUser(req, res);
});

router.patch("/updateUserRole", auth, authorize('admin'), (req, res) => {
    userController.updateUserRole(req, res);
})

router.delete("/deleteUser", auth, authorize('admin'), (req, res) => {
    userController.deleteUser(req, res);
})

router.get("/summary", auth, (req, res) => {
    userController.getSummary(req, res);
});
module.exports = router;
