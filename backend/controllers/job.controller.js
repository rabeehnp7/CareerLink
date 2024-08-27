import { Application } from "../models/application.model.js"
import { Jobs } from "../models/job.model.js"

export const postJob = async (req,res) =>{
    try {
        const {title,description,salary,requirements,experience,positions,jobType,location,companyId}=req.body
        if( !title || !description || !salary || !requirements || !experience || !positions || !jobType || !location || !companyId){
            res.status(400).json({
                message:"Fill out the fields",
                success:false
            })
        }
        const userId=req.userId
        const job=await Jobs.create({
            title,
            description,
            salary:Number(salary),
            experience,
            requirements:requirements.split(","),
            positions,
            jobType,
            location,
            company:companyId,
            createdBy:userId
        })
        return res.status(201).json({
            message:"Job created",
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
export const updateJob=async (req,res)=>{
    try {
        const {title,description,salary,requirements,experience,positions,jobType,location,companyId}=req.body
        if( !title || !description || !salary || !requirements || !experience || !positions || !jobType || !location || !companyId){
            res.status(400).json({
                message:"Fill out the fields",
                success:false
            })
        }
        const jobId=req.params.id
        const userId=req.userId
        if(!jobId){
            res.status(404).json({
                message:"Job Id  required",
                success:false
            })
        }
        const updatedJob={
            title,
            description,
            salary:Number(salary),
            experience,
            requirements:requirements.split(","),
            positions,
            jobType,
            location,
            company:companyId,
            createdBy:userId
        }
        const job=await Jobs.findById(jobId)
        if(!job){
            res.status(404).json({
                message:"Job could'nt find",
                success:false
            })
        }
        await Jobs.findByIdAndUpdate(jobId,updatedJob,{ new: true })
        return res.status(200).json({
            message:"Job data updated",
            success:true
        })
    } catch (error) {
        
    }
}
export const getAllJobs = async (req,res) =>{
    try {
        const keyword=req.query.keyword || ""
         const query={
            $or:[
                {title:{$regex:keyword ,$options: "i"}},
                {description:{$regex:keyword ,$options: "i"}},
            ]
         }
         const jobs=await Jobs.find(query).populate({
            path:"company"
         }).sort({createdAt: -1})
         if(jobs.length === 0){
            return res.status(404).json({
                message:"No job matches found",
                success:false
            })
         }
         return res.status(200).json({
            jobs,
            success:true
         })
    } catch (error) {
        
    }
}
export const getJobById = async (req,res) =>{
    try {
        const jobId=req.params.id
        const job=await Jobs.findById(jobId).populate({
            path:'company'
        }).sort({createdBy:-1}).populate({
            path:"applications"
        })
        if(!job){
            res.status(404).json({
                message:"No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAdminjobs =async(req,res) =>{
    try {
        const adminId=req.userId
        const jobs =await Jobs.find({createdBy:adminId}).populate({
            path:"company"
        })
        if(!jobs){
            res.status(404).json({
                message:"No Jobs posted as of now",
                success:false
            })
        }
  
        return res.status(201).json({
            jobs,
            success:true
        })
    } catch (error) {
        
    }
}
export const deleteJob=async(req,res)=>{
    try {
        const jobId=req.params.id
        if(!jobId){
            res.status(400).json({
                message:"Job id required",
                success:false
            })
        }
        let response
        const {applications}=await Jobs.findById(jobId).select("applications")
        if(applications.length==0){
            response= await Jobs.findByIdAndDelete(jobId)
            if(response){
                return res.status(200).json({
                    message:"Job deleted successfully",
                    success:true
                })
            }
        }else{
            for(const applicationId of applications){
                await Application.findByIdAndDelete(applicationId)
            }
            response= await Jobs.findByIdAndDelete(jobId)
            if(response){
                return res.status(200).json({
                    message:"Job deleted successfully",
                    success:true
                })
            }
        }
        
    } catch (error) {
        
    }
}