import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setsearchJobsByText } from '@/store/jobSlice';
import useGetAdminJobs from "../hooks/useGetAdminJobs";
import JobsTable from './JobsTable';
function AdminJobs() {
  useGetAdminJobs()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [input,setInput]=useState("")
  useEffect(()=>{
    dispatch(setsearchJobsByText(input))
  },[input])
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex items-center justify-between mb-6">
          <Input
            className="flex-grow mr-4" 
            placeholder="Filter by company name"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
          />
          <Button onClick={()=>navigate("/admin/jobs/create")} className="shrink-0">Create Jobs</Button>
        </div>
        <JobsTable />
      </div>
    </>
  );
}

export default AdminJobs
