const express = require("express");

const router = express.Router();

const {signUp, signIn} = require("../controller/userController");

router.route("/register").post(signUp);
router.route("/login").post(signIn)




module.exports = router;