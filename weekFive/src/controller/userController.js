const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// No two user will have thesame email
// passwords are to be hashed
// validate against empty fields

// Signup controller
exports.signUp = async (req, res, next)=>{
    let {fullName, email, password} = req.body;

    try{
        const user = await User.findOne({email : email});
        if(user){
            return res.status(400).json({
                success : false,
                message : "Email already exist"
            });
        }

        //encrypt password
        let hashedPassword = await bcrypt.hash(password, 10);
        //  reassigning the password   
        password = hashedPassword;

        const savedUser = await User.create({fullName, email, password});
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
    const user = await User.findOne({email:email});

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
    const token = jwt.sign({id : user._id, name: user.fullName, email : user.email},`secret`)
    res.status(200).json({
        success : true,
        message : "successfully loggedIn!",
        data : user,
        token:token
    })

}