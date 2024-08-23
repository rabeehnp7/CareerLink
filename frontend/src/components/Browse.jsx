import React from 'react';
import Job from './Job';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';

function Browse() {
  const {allJobs}=useSelector((store)=>store.jobs)
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
