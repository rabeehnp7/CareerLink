import { Badge } from "@/components/ui/badge"
import React from 'react'

function LatestJobCards() {
    return (
      <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
          <div className='text-left'>
              <h1 className='font-medium text-lg'>Company Name</h1>
              <p className='text-sm text-gray-500'>India</p>
          </div>
          <div className='text-left'>
              <h1 className='font-bold text-lg my-2'>Job Title</h1>
              <p className='text-sm text-gray-600'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a </p>
          </div>
          <div className='flex items-center gap-2 mt-4'>
              <Badge className='text-blue-700 font-bold' variant="ghost">12 Positions</Badge>
              <Badge className='text-[#F83002] font-bold' variant="ghost">Part time</Badge>
              <Badge className='text-[#7209b7] font-bold' variant="ghost">24LPA</Badge>
          </div>
      </div>
    )
  }

export default LatestJobCards