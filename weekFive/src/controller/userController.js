const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const createUserValidation =require("../validations/userValidation")

const cloudinary= require('../utils/cloudinary')
const fs = require('fs')

// No two user will have thesame email
// passwords are to be hashed
// handle validations against empty fields

// Signup controller
exports.signUp = async (req, res, next)=>{
    let {fullName, email, password} = req.body;

    try{
        const {error} = createUserValidation(req.body);
        if(error){
            return res.status(400).json({
                success : false,
                message : error.details[0].message
            });
        }

        const user = await User.findOne({email : email});
        if(user){
            return res.status(400).json({
                success : false,
                message : "Email already exist"
            });
        }

        //encrypt password
        let hashedPassword = await bcrypt.hash(password, 12);
        //  reassigning the password   
        password = hashedPassword;

        const savedUser = await User.create({fullName, email, password});
        console.log(savedUser)

        await savedUser.save();


        res.status(201).json({
            success : true,
            message : "Data created!",
            data : savedUser
        });
    }catch(error){
        res.status(500).json({
            success : false,
            message : "User not saved"
        })
    }

}
//email exist
//password match
//generate token
exports.signIn = async (req,res,next)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email: email});

    if(!user){
        return res.status(404).json({
            sucess:false,
            message:`user does not exist`
        });
    }

    //password matched
    const isvalidPassword = await bcrypt.compare(password,user.password);

    if(!isvalidPassword){
        return res.status(400).json({
            success:false,
            message:"invalid email or password"
        });
    }
    const accessToken = jwt.sign({id : user._id, name: user.fullName, email : user.email}, process.env.JWT_SECRET, {expiresIn: '40h'}) //to show token expiration timeout
    const refreshToken = jwt.sign({id : user._id, name: user.fullName, email : user.email}, process.env.REFRESH_SECRET, {expiresIn: '2d'}) //to show token expiration timeout
  
    user.refreshToken = refreshToken

    await user.save()

    res.status(200).json({
        success : true,
        message : "successfully loggedIn!",
        data : user,
        accessToken : accessToken,
        refreshToken : refreshToken
    })

}
exports.updateRecord = async (req,res) =>{
    const {id} = req.user 
    const {fullName} = req.body

    const user = await User.findOneAndUpdate({_id : id}, {fullName}, {new:true})
    if (!user) return res.status(404).json({success:false, msg: "User not found"})

    res.status(201).json({
        success : true,
        message : "Successfully updated one product in the database",
        data : user
    });
}

exports.generateRefreshToken = async(req,res)=>{
    const token = req.headers.refresh_token

    let user = await User.findOne({refresh_token : token})

    if (!user) return res.status(401).json({
        success:false, msg: "User not logged in"})

    const accessToken = jwt.sign({id : user._id, name: user.fullName, email : user.email}, process.env.JWT_SECRET, {expiresIn: '40t'}) //to show token expiration timeout
    
    res.status(200).json({
        success : true,
        message : "Access Token successfully generated!",
        data : user,
        accessToken : accessToken
    })

}
exports.uploadAvatar = async (req, res) =>{
    const {id} = req.user

    const uploader = async (path) => await cloudinary.uploads(path, 'avatars')
    let url;

    const file = req.file

    const {path} = file
    const  newPath = await uploader(path)

    url = newPath.url

    fs.unlinkSync(path)

    let user = await User.findOne({_id: id})

    user.avatar = url.toString()

    await user.save()

    res.status(200).json({
        success : true,
        message:'successfully uploaded an image',
        data: user
    })
}