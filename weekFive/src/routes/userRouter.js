const express = require("express");
const verifyUser = require("../middlewares/authorize")
const upload = require("../utils/upload")
const router = express.Router();

const {signUp, signIn, updateRecord, generateRefreshToken, uploadAvatar} = require("../controller/userController");

router.route("/register").post(signUp);
router.route("/login").post(signIn)
router.get('/protected', verifyUser, (req,res) =>{
    const {name} = req.user;
    res.status(200).json({
        success:true,
        msg:`this is for those signed in`,
       greeting:`hello ${name}`
    })

})
router.get('/refreshtoken',generateRefreshToken)
router.route("/edit").put(updateRecord)
router.post('/upload', verifyUser, upload.single('avatar'), uploadAvatar)


module.exports = router;