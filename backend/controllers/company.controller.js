import { Company } from "../models/company.model.js"
import cloudinary from "../utils/cloudinary.js"
import getDataUri from "../utils/datauri.js"

export const registerCompany = async (req,res)=>{
    try {
        const {companyName}=req.body
        if(!companyName){
            return res.status(400).json({
                message:"Enter company name",
                success:false
            })
        }
        const isCompanyName= await Company.findOne({name:companyName})
        if(isCompanyName){
            return res.status(400).json({
                message:"Company already exists in this name",
                success:false
            })
        }
        const company=await Company.create({
            name:companyName,  
            userId:req.userId        
        })
        return res.status(201).json({
            message:"Your company registered successfully",
            company,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
export const getCompany = async (req,res) => {
    const userId=req.userId
    const company= await Company.find({userId})
    if(!company){
        return res.status(404).json({
            message:"No companies found",
            success:false
        })
    }
    return res.status(200).json({
        company,
        success:true
    })
}

export const getCompanyById = async (req,res)=>{
    try {
        const companyId=req.params.id
        const company=await Company.findById(companyId)
        if(!company){
            return res.status(401).json({
                message:"No companies found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        }) 
    } catch (error) {
        console.log(error)
    }
}
export const updateCompany = async (req,res) =>{
    try {
        const {name,description,website,location}=req.body
    const file=req.file
    if(req.file){
    const fileUri=getDataUri(file)
    const cloudResponse =await cloudinary.uploader.upload(fileUri.content)
    }
    const companyId = req.params.id
    const companyData={name,description,website,location}
    if(req.file && cloudResponse){
        companyData.logo=cloudResponse.secure_url
    }
    const company = await Company.findByIdAndUpdate(companyId,companyData,{new:true})
    if(!company){
        return res.status(401).json({
            message:"company could'nt found",
            company,
            success:false
        })
    }
    return res.status(200).json({
        message:"company data updated",
        success:true
    })
    } catch (error) {
        console.log(error)
    }
}