import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../constants/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function CreateJob() {
    const {companies}=useSelector((store)=>store.company)
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const [input,setInput]=useState({
        title: "",
        description: "",
        salary: "",
        requirements: "",
        experience: "",
        positions: 0,
        jobType: "",
        location:"" ,
        companyId:""
    })
    const changeEventHandler =(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const submitHandler=async(e)=>{
        e.preventDefault()
        setLoading(true)
        const formData=new FormData()
        formData.append("title",input?.title)
        formData.append("description",input?.description)
        formData.append("salary",input?.salary)
        formData.append("requirements",input?.requirements)
        formData.append("experience",input?.experience)
        formData.append("positions",input?.positions)
        formData.append("jobType",input?.jobType)
        formData.append("location",input?.location)
        formData.append("companyId",input?.companyId)
        try {
            const res=await axios.post(`${JOB_API_ENDPOINT}/postJob`,formData,{
                headers:{
                    "Content-Type":"application/json",
                },
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data?.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div>
    <Navbar />
    <div className="flex items-center justify-center w-screen my-5">
      <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Post New Job</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Salary</Label>
            <Input
              type="text"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Experience Level</Label>
            <Input
              type="text"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Positions</Label>
            <Input
              type="number"
              name="positions"
              value={input.positions}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>
          {companies.length > 0 && (
            <div className="col-span-2">
              <Label>Company</Label>
              <Select onValueChange={(value) => setInput({...input, companyId: value})} className="w-full">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company._id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          {loading ? (
            <Button className="w-full mt-4 col-span-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
            </Button>
          ):
          <Button className="w-full mt-4 col-span-2" type="submit">Submit</Button>}
          {companies.length === 0 && (
            <p className="text-sm text-red-600 font-bold text-center my-3 col-span-2">
              You have to register a company to post the job
            </p>
          )}
        </div>
      </form>
    </div>
  </div>
  );
}

export default CreateJob;
