import React, { useEffect } from 'react';
import Job from './Job';
import Navbar from './shared/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/store/jobSlice';
import useGetAllJobs from './hooks/useGetAllJobs';

function Browse() {
  useGetAllJobs()
  const {allJobs}=useSelector((store)=>store.jobs)
  const dispatch=useDispatch()
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchQuery(""))
    }
  },[allJobs])
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-4 rounded-md shadow-md mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {allJobs.length} Jobs Found
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allJobs.map((item, index) => (
            <Job key={index} job={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Browse;
