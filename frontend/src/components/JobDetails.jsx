import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "./constants/constants";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/store/jobSlice";
import Navbar from "./shared/Navbar";
import { toast } from "sonner";
function JobDetails() {
  const [isApplied,setIsApplied]=useState(null)
  let { id } = useParams();
  const {singleJob}=useSelector((store)=>store.jobs)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {user}=useSelector((store)=>store.auth)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some((app) => app.applicant === user?._id));
        }
      } catch (error) {
        console.log(error?.respomse?.data?.message);
      }
    };
    fetchData();
  }, [id,dispatch]);
  let salary=(singleJob.salary*12)/100000
  const applyHandler= async ()=>{
    if(!user){
      navigate('/login')
    }else{
      try {
        const res=await axios.post(`${APPLICATION_API_ENDPOINT}/apply/${id}`,{},{
          withCredentials: true,
        })
        if(res.data.success){
          toast.success(res.data.message)
          setIsApplied(true)
          const upadtedApplication={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
          dispatch(setSingleJob(upadtedApplication))
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
    }
  }

  if (!singleJob) return <div>Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto my-10">
  <div className="flex justify-between items-center">
    <div className="flex flex-col">
      <h1 className="font-bold text-2xl md:text-3xl">{singleJob.title}</h1>
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob.positions} positions</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob.jobType}</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">{salary} LPA</Badge>
      </div>
    </div>
     <Button
    onClick={applyHandler}
      disabled={isApplied}
      className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5d058f]'}`}
    >
      {isApplied ? 'Already Applied' : 'Apply Now'}
    </Button>
  </div>

  <div className="flex justify-start bg-gray-100 border border-gray-300 rounded-md p-6 mt-4">
    <div className="">
      <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob.location}</span></h1>
      <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob.experience}</span></h1>
      <h1 className="font-bold my-1">Requiremnts: <span className="pl-4 font-normal text-gray-800">{singleJob.requirements.join(",")}</span></h1>
      <h1 className="font-bold my-1">Company: <span className="pl-4 font-normal text-gray-800">{singleJob.company.name}</span></h1>
      <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob.applications.length}</span></h1>
      <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">17-07-2024</span></h1>
      <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob.description}</span></h1>
    </div>
  </div>
</div>
</>

  );
}

export default JobDetails;
