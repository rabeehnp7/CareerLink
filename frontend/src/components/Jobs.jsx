import React, { useState,useEffect } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import axios from 'axios'
import { JOB_API_ENDPOINT } from "./constants/constants";
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/store/jobSlice'
function Jobs() {
    const [data,setData]=useState([])
    const {searchQuery}=useSelector((store)=>store.jobs)
    const [filteredJobs,setFilteredJobs]=useState([])
    const dispatch=useDispatch()
  useEffect(()=>{
    const fetchData =async ()=>{
       try {
        const res=await axios.get(`${JOB_API_ENDPOINT}/get`,{
          withCredentials:true
         })
         if(res.data.success){
          setData(res.data.jobs)
         }
       } catch (error) {
        console.log(error)
       }
    }
    fetchData()
  },[])
  useEffect(()=>{
        if(searchQuery){
            const filteredData= data.filter((job)=>{
              return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             job.location.toLowerCase().includes(searchQuery.toLowerCase())
            })
            setFilteredJobs(filteredData)
        }else{
            setFilteredJobs(data)
        }
        
  },[searchQuery,data])
  useEffect(()=>{
    return () => {
        dispatch(setSearchQuery(""))
    }
  },[dispatch])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto mt-5'>
            <div className='flex gap-5'>
                <div className='w-20%'>
                    <FilterCard/>
                </div>
                {
                    filteredJobs.length <= 0 ?(<span>Job Not Found</span>)  : (
                       <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        <div className='grid grid-cols-3 gap-4'>
                            {
                                filteredJobs.map((item,index)=>(
                                    <Job job={item} key={index}/>
                                ))
                            }
                        </div>
                       </div> 
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Jobs