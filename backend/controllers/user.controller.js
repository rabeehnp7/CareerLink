import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"

export const register = async(req,res)=>{
    try {
        const {fullName,phoneNumber,email,password,role}=req.body
        const file=req.file
        const fileUri=getDataUri(file)
        const cloudResponse =await cloudinary.uploader.upload(fileUri.content)
        if(!fullName || !phoneNumber || !email || !password || !role){
            return res.status(400).json({
                message:"Fill out all the fields",
                success:false
            })
        }
        const isUser=await User.findOne({email})
        if(isUser){
            return res.status(400).json({
                message:"User already exists in this email address",
                success:false
            })
        }
         const encryptedPass=await bcrypt.hash(password,10)
         
        const user= await User.create({
            fullName,
            email,
            password:encryptedPass,
            phoneNumber,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url
            }
         })
        return res.status(200).json({
            message:"Account Created Successfully",
            success:true
         })
    } catch (error) {
        console.log(error)
    }
}
export const login = async (req,res)=>{
    try {
        const {email,password,role}=req.body
    if( !email || !password || !role){
        return res.status(400).json({
            message:"Fill out all the fields",
            success:false
        })
    }
    let user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
        message:"Incorrect email address",
        success:false
        })
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password)
    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Incorrect Password",
            success:false
        })
    }
    if(role !== user.role){
        return res.status(400).json({
            message:"Account doesnt exist with current role",
            success:false
        })
    }
    const tokenData={
        userId:user._id,
        fullName:user.fullName,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    }
    const token=jwt.sign(tokenData,process.env.PRIVATE_KEY_JWT,{ expiresIn: '1d' })    
    return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000 , httpOnly:true ,sameSite:'strict'}).json({
        message:`Welcome ${user.fullName}`,
        user,
        success:true
    })
    } catch (error) {
        console.log(error)
    }
}
export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    } catch (error) {
        
    }
} 
export const updateprofile = async (req,res) =>{
    try {
        const {fullName,email,phoneNumber,skills,bio}=req.body

        const file=req.file
        const fileUri=getDataUri(file)
        const cloudResponse =await cloudinary.uploader.upload(fileUri.content)
        let skillsArray
        if(skills) {
            skillsArray=skills.split(",")
        } 
        const userId=req.userId
        let user =await User.findById(userId)
        if(!user){
            return res.status(400).json({
                message:"User cannot be found",
                success:false
            })
        }

        if(fullName) user.fullName=fullName
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills=skillsArray
        if(email) user.email=email
        if(phoneNumber) user.phoneNumber=phoneNumber

        if(cloudResponse){
            user.profile.resume=cloudResponse.secure_url
            user.profile.resumeOriginalName=file.originalname
        }

        await user.save()
        user={
        userId:user._id,
        fullName:user.fullName,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        })

    } catch (error) {
        
    }
}