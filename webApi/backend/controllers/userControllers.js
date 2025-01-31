const userModel = require('../models/userModel')
const asyncHandler = require("../middleware/async");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require("path");
const fs = require("fs");
const sendOtp = require('../service/sendOtp');

const createUser = async (req,res) => {
    // 1. Check incomming data
    console.log(req.body);

    // 2. Destructure the incomming data
    const {name, email,phone, password} = req.body;

    // 3. Validate the data (if empty, stop the process and send res)
    if(!name|| !phone || !password|| !email){
        // res.send("Please enter all fields!")
        return res.json({
            "success" : false,
            "message" : "Please enter all fields!"
        })
    }

    // 4. Error Handling (Try Catch)
    try {
        // 5. Check if the user is already registered
        const existingUser = await userModel.findOne({email : email }|| {phone : phone})

        // 5.1 if user found: Send response 
        if(existingUser){
            return res.json({ 
                "success" : false,
                "message" : "User Already Exists!"
            })
        }


        // Hashing/Encryption of the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,randomSalt)

        // 5.2 if user is new:
        const newUser = new userModel({
       
            name : name,
            email : email,
            phone : phone,
            password : hashedPassword
        })

        // Save to database
        await newUser.save()

        // send the response
        res.status(201).json({
            "success" : true,
            "message" : "User Created Successfully!"
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message" : "Internal Server Error!" 
        })
    }
 

    
}

// Login function
const loginUser =  async (req,res) => {

    // Check incomming data
    console.log(req.body)

    // Destructuring
    const {email, password}  = req.body;

    // Validation
    if(!email || !password){
        return res.status(400).json({
            "success" : false,
            "message" : "Please enter all fields!"
        })
    }


    // try catch
    try {

        // find user (email)
        const user = await userModel.findOne({email : email})
        // found data : firstName, lastname, email, password

        // not found (error message)
        if(!user){
            return res.status(400).json({
                "success" : false,
                "message" : "User not exists!"
            })
        }

        // Compare password (bcrypt)
        const isValidPassword = await bcrypt.compare(password,user.password)

        // not valid (error)
        if(!isValidPassword){
            return res.status(400).json({
                "success" : false,
                "message" : "Password not matched!"
            })
        }   

        // token (Generate - user Data + KEY)
        const token = await jwt.sign(
            {id : user._id,isAdmin : user.isAdmin},
            process.env.JWT_SECRET
        )

        // response (token, user data)
        res.status(200).json({
            "success" : true,
            "message" : "Logged In Successfully!",
            "token" : token,
            "userData" : user
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "success" : false,
            "message" : "Internal Server Error!"
        })
    }
    
}

//Forgot Password by using phone number
const forgotPassword = async (req,res) => {
    const {phone}=req.body;
    if(!phone){
        return res.status(400).json({
            "success" : false,
            "message" : "Please provide your phone number!"
        })
    }
    try{

    //finding existing user with phone number
    const user=await userModel.findOne({phone : phone})
    if(!user){
        return res.status(400).json({
            "success" : false,
            "message" : "User not exists!"
        })
    }

    //generating 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    //set expiery
    const expieryDate = Date.now() + 360000; //360000=1hr

    //save in database for verification
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = expieryDate;
    await user.save();

    //send to registered phone number   
    const isSent = await sendOtp(phone,otp);

    if(!isSent){
        return res.status(400).json({
            "success" : false,
            "message" : "Error Sending OTP Code!"
        })
    }
  
    //sucess
    res.status(200).json({
        "success" : true,
        "message" : "OTP Sent Successfully!"
    })

    }catch(error){
        console.log(error)
        res.status(500).json({
            "success" : false,
            "message" : "Internal Server Error!"
        })
    }
}

//veify OTP and set new pswd

const verifyOtpAndSetPassword= async (req,res)=>{
    //get data 
    const {phone,otp,newPassword}=req.body;

    if(!phone || !otp || !newPassword){
        return res.status(400).json({
            "success" : false,
            "message" : "Please provide all fields!"
        })
    }

    try{

        //finding existing user with phone number
        const user=await userModel.findOne({phone : phone})
       
        //comparing otp
        if(user.resetPasswordOTP!= otp){
            return res.status(400).json({
                "success" : false,
                "message" : "Invalid OTP!"
            })
        }

        //comparing expiery
        if(user.resetPasswordExpires<Date.now()){
            return res.status(400).json({
                "success" : false,
                "message" : "OTP Expired!"
            })
        }
        
        //hashing password
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword,randomSalt)
        
        //set new password
        user.password=hashedPassword;
        await user.save();


        //sucess
        res.status(200).json({
            "success" : true,
            "message" : "Password Updated Successfully!"
        })



    }catch(error){
        console.log(error)
        res.status(500).json({
            "success" : false,
            "message" : "Internal Server Error!"
        })
    }

        
}

    //Get Current Profile
    const getCurrentProfile = async (req, res) => {
      // const id = req.user.id;
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        
        const user = await userModel.findById(decoded.id);
        if (!user) {
          return res.status(400).json({
            success: false,
            message: 'User not found',
          });
        }
        res.status(200).json({
          success: true,
          message: 'User fetched successfully',
          user: user,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: error,
        });
      }
    };
    
    // Get User Token
    const getToken = async (req, res) => {
      try {
        console.log(req.body);
        const { id } = req.body;
    
        const user = await userModel.findById(id);
        if (!user) {
          return res.status(400).json({
            success: false,
            message: 'User not found',
          });
        }
    
        const jwtToken = await jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          (options = {
            expiresIn:
              Date.now() + process.env.JWT_TOKEN_EXPIRE * 24 * 60 * 60 * 1000 ||
              '1d',
          })
        );
    
        return res.status(200).json({
          success: true,
          message: 'Token generated successfully!',
          token: jwtToken,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error',
          error: error,
        });
      }
    };
    const updateUserProfile = async (req, res) => {
      const { fullName, email, phoneNumber, password } = req.body;
      const id = req.user.id; // Assuming you have middleware to get userId from token
    
      if (!fullName || !email || !phoneNumber) {
        return res.status(400).json({
          success: false,
          message: 'Please enter all required fields',
        });
      }
    
      try {
        const user = await userModel.findById(id);
    
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found',
          });
        }
    
        // Update user details
        user.fullName = fullName;
        user.email = email;
        user.phoneNumber = phoneNumber;
    
        await user.save();
    
        res.status(200).json({
          success: true,
          message: 'User profile updated successfully',
          user: {
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
          },
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
    };


// exporting
module.exports = {
    createUser,
    loginUser,
    forgotPassword,
    verifyOtpAndSetPassword,
    getCurrentProfile,
    getToken,
    updateUserProfile,
}