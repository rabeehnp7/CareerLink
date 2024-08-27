import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

function Job({job}) {
  let salary=(job.salary*12)/100000
  const dateAgo =Math.floor((new Date()-new Date(job.createdAt) ) / (24 * 60 * 60 * 1000)) 
  return (
    <div className="p-6 rounded-md shadow-lg bg-white border border-gray-200 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm">{dateAgo <=1 ?"Posted Today":`Posted ${dateAgo} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-14 h-14">
          <AvatarImage
            src="https://toppng.com/uploads/preview/company-address-comments-company-icon-png-white-11562970918zzhludknsl.png"
            alt="Company Logo"
          />
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold">{job.company.name}</h1>
          <p className="text-gray-600 text-sm">{job.location}</p>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl mb-2">{job.title}</h2>
        <p className="text-gray-700 text-sm">
          {job.description}
        </p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
              <Badge className='text-blue-700 font-bold' variant="ghost">{job.positions}</Badge>
              <Badge className='text-[#F83002] font-bold' variant="ghost">{job.jobType}</Badge>
              <Badge className='text-[#7209b7] font-bold' variant="ghost">{salary} LPA</Badge>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Button variant="outline"><Link to= {`/jobDetails/${job._id}`} >Details</Link></Button>
            <Button className="bg-[#4A90E2]">Save For Later</Button>
          </div>
    </div>
  );
}

export default Job;
