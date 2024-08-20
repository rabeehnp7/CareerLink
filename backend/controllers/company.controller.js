import { Company } from "../models/company.model.js"

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
    const company= await Company.findOne({userId})
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
        status:true
    })
}
export const updateCompany = async (req,res) =>{
    const {name,description,website,location}=req.body
    const file =req.file
    //cloudinary
    const companyId = req.params.id
    const companyData={name,description,website,location}
    const company = await Company.findByIdAndUpdate(companyId,companyData,{new:true})
    if(!company){
        return res.status(401).json({
            message:"No companies found",
            success:false
        })
    }
    return res.status(200).json({
        message:"company data updated",
        success:true
    })
}