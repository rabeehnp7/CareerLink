import { Badge } from "@/components/ui/badge"
import React from 'react'

function LatestJobCards({job}) {
    let salary=(job.salary*12)/100000
    return (
      <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
          <div className='text-left'>
              <h1 className='font-medium text-lg'>{job.company.name}</h1>
              <p className='text-sm text-gray-500'>{job.location}</p>
          </div>
          <div className='text-left'>
              <h1 className='font-bold text-lg my-2'>{job.title}</h1>
              <p className='text-sm text-gray-600'>{job.description} </p>
          </div>
          <div className='flex items-center gap-2 mt-4'>
              <Badge className='text-blue-700 font-bold' variant="ghost">{job.positions}</Badge>
              <Badge className='text-[#F83002] font-bold' variant="ghost">{job.jobType}</Badge>
              <Badge className='text-[#7209b7] font-bold' variant="ghost">{salary} LPA</Badge>
          </div>
      </div>
    )
  }

export default LatestJobCards