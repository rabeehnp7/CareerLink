import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { PopoverContent, PopoverTrigger } from '../ui/popover'
import { Popover } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '../constants/constants'
import { toast } from 'sonner'
import { redirect, useNavigate } from 'react-router-dom'

function ApplicantsTable() {
    const shortList = ["Accept", "Reject"]
    const {applicants}=useSelector((store)=>store.applications)
    // const navigate=useNavigate()
    const statusHandler =async (statusRaw,id)=>{
        const status=statusRaw=="Accept"?"accepted":statusRaw=="Reject"?"rejected" :"pending"
        try {
            const res=await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`,{status},{
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res?.data?.message)
                redirect('/admin/jobs/:id/applicants')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableCaption className="text-center font-medium">A list of applicants for this job</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Full Name</TableHead>
                        <TableHead className="text-left">Email</TableHead>
                        <TableHead className="text-left">Contact</TableHead>
                        <TableHead className="text-left">Resume</TableHead>
                        <TableHead className="text-left">Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { applicants?.length !== 0 &&
                        applicants?.map((application)=>(
                            <TableRow key={application._id}>
                        <TableCell className="py-2 px-4 text-left">{application?.applicant?.fullName}</TableCell>
                        <TableCell className="py-2 px-4 text-left">{application?.applicant?.email}</TableCell>
                        <TableCell className="py-2 px-4 text-left">{application?.applicant?.phoneNumber}</TableCell>
                        <TableCell className="py-2 px-4 text-left">
                            <a href={application?.applicant?.profile?.resume} className="text-blue-600 underline">{application.applicant?.profile?.resumeOriginalName}</a>
                        </TableCell>
                        <TableCell className="py-2 px-4 text-left">{new Date(application.createdAt).toLocaleDateString("en-US")}</TableCell>
                        <TableCell className="text-right py-2 px-4 cursor-pointer">
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className="w-32 bg-white shadow-md rounded-md p-2">
                                    {shortList.map((status, index) => (
                                        <div
                                            key={index}
                                            className='flex items-center justify-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer'>
                                            <span onClick={()=>statusHandler(status,application._id)} className="text-sm font-medium">{status}</span>
                                        </div>
                                    ))}
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            { applicants?.length == 0 && 
            (
                <div className='flex items-center justify-center'>
                    <span className='text-4xl font-bold'>No Applicants found !</span>
                </div>
            )
            }
        </div>
    )
}

export default ApplicantsTable
