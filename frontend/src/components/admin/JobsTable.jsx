import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Delete, Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../constants/constants";
import { toast } from "sonner";
function JobsTable() {
  const { searchJobsByText } = useSelector((store) => store.jobs);
  const { allAdminJobs } = useSelector((store) => store.jobs);
  const [filterSearch, setFilterSearch] = useState(allAdminJobs);
  const navigate = useNavigate();
  const HandleDelete=async(jobId)=>{
    try {
      const res=await axios.post(`${JOB_API_ENDPOINT}/${jobId}/delete`,{},{
        withCredentials:true
       })
       if(res.data.success){
        window.location.reload()
        toast.success(res.data.message)
       }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  useEffect(() => {
    const filteredJobs =
      allAdminJobs?.length >= 0 &&
      allAdminJobs?.filter((job) => {
        if (!searchJobsByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobsByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobsByText.toLowerCase())
        );
      });
    setFilterSearch(filteredJobs);
  }, [searchJobsByText, allAdminJobs]);
 
  return (
    <div>
      <Table className="w-full text-left">
        <TableCaption>A list of recent Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">Company Name</TableHead>
            <TableHead className="w-5/12">Role</TableHead>
            <TableHead className="w-3/12">Date</TableHead>
            <TableHead className="w-3/12 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterSearch.length <= 0 ? (
            <span>No Jobs available</span>
          ) : (
            filterSearch.map((job) => (
              <>
                <TableRow>
                  <TableCell className="w-1/12">{job.company.name}</TableCell>
                  <TableCell className="w-5/12">{job.title}</TableCell>
                  <TableCell className="w-3/12">
                    {new Date(job.createdAt).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell className="w-3/12 text-right">
                    <Popover >
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 flex flex-col justify-center items-center bg-white shadow-md rounded-md">
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}`)}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md w-full"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md w-full"
                        >
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                        <div
                          onClick={() =>HandleDelete(job._id)
                          }
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md w-full"
                        >
                          <Delete className="w-4" />
                          <span>Delete</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              </>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default JobsTable;
