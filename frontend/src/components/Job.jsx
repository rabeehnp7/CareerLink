import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

function Job() {
  return (
    <div className="p-6 rounded-md shadow-lg bg-white border border-gray-200 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-14 h-14">
          <AvatarImage
            src="https://plus.unsplash.com/premium_photo-1677653126872-01fea994982b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFkZHJlc3N8ZW58MHx8MHx8fDA%3D"
            alt="Company Logo"
          />
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold">Company Name</h1>
          <p className="text-gray-600 text-sm">India</p>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl mb-2">Job Title</h2>
        <p className="text-gray-700 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
              <Badge className='text-blue-700 font-bold' variant="ghost">12 Positions</Badge>
              <Badge className='text-[#F83002] font-bold' variant="ghost">Part time</Badge>
              <Badge className='text-[#7209b7] font-bold' variant="ghost">24LPA</Badge>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Button variant="outline">Details</Button>
            <Button className="bg-[#4A90E2]">Save For Later</Button>
          </div>
    </div>
  );
}

export default Job;
