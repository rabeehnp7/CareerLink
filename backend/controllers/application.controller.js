import { Application } from "../models/application.model.js"
import { Jobs } from "../models/job.model.js"

export const applyJob = async (req,res) =>{
    try {
        const userId=req.userId
        const jobId=req.params.id
        if(!jobId){
            res.status(400).json({
                message:"Job id is required",
                success:false
            })
        }
        const job = await Jobs.findById(jobId)
        if(!job){
            res.status(400).json({
                message:"Job not found",
                success:false
            })
        }
        const applicationsExists =await Application.findOne({applicant:userId,job:jobId})
        if(applicationsExists){
            res.status(400).json({
                message:"Already applied for this job",
                success:false
            })
        }
        const apply = await Application.create({
            job:jobId,
            applicant:userId
        })
        job.applications.push(apply._id)
        await job.save()
        return res.status(200).json({
            message:"Applied for the job successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const getAppliedJobs = async (req,res) => {
    try {
        const userId=req.userId
        const appliedJobs = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job', 
                options: { sort: { createdAt: -1 } },     
            populate:{
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }});

    return res.status(200).json({
        appliedJobs,
        success:true
    })
    } catch (error) {
        console.log(error);  
    }
}
export const getApplicants =async (req,res) => {
    try {
        const jobId=req.params.id
        const job =await Jobs.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}}
        ,
            populate:{path:'applicant'}
        })
        if(!job){
            res.status(404).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) =>{
    try {
        const {status} =req.body
        if(!status){
            res.status(400).json({
                message:"status required to update",
                success:true
            })
        }
        const applicationId=req.params.id
        const application= await Application.findOne({_id:applicationId})
        if(!application){
            res.status(404).json({
                message:"application could'nt find",
                success:false
            })
        }
        application.status=status.toLowerCase()
        await application.save()
        return res.status(200).json({
            message:"status upadted",
            success:true
        })
    } catch (error) {
        
    }
}