import React, { useState,useEffect } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import axios from 'axios'
import { JOB_API_ENDPOINT } from "./constants/constants";
function Jobs() {
    const [data,setData]=useState([])
  useEffect(()=>{
    const fetchData =async ()=>{
       try {
        const res=await axios.get(`${JOB_API_ENDPOINT}/get`,{
          withCredentials:true
         })
         if(res.data){
          setData(res.data.jobs)
          console.log(res.data.jobs);
         }
       } catch (error) {
        console.log(error)
       }
    }
    fetchData()
  },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto mt-5'>
            <div className='flex gap-5'>
                <div className='w-20%'>
                    <FilterCard/>
                </div>
                {
                    data.length <= 0 ?(<span>Job Not Found</span>)  : (
                       <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        <div className='grid grid-cols-3 gap-4'>
                            {
                                data.map((item,index)=>(
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