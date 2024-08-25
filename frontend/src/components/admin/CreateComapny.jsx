import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_ENDPOINT } from '../constants/constants'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/store/companySlice'
import { toast } from 'sonner'

function CreateComapny() {
    const [name,setName]=useState(null)
    const navigate=useNavigate()
    const dispatch=useDispatch()
        const CreateComapny=async()=>{
            try {
                const res=await axios.post(`${COMPANY_API_ENDPOINT}/register`,{companyName:name},{
                    headers:{
                        "Content-Type":"application/json",
                    },
                    withCredentials:true
                })
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company))
                    navigate(`/admin/company/${res?.data?.company?._id}`)
                    toast.success(res.data.message)
                }
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
  return (
    <>
    <Navbar/>
    <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
        <h1 className='font-bold text-2xl'>Your Company Name</h1>
        <p className='text-gray-500'>Your Company can be changed later</p>
        </div>
        <Label>Company Name</Label>
        <Input
        type="text"
        className="my-2"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder="Google.inc,Mincrosoft..."
        />
        <div className='flex items-center gap-2 my-10'>
            <Button onClick={()=>navigate("/admin/company")} variant="outline">Cancel</Button>
            <Button onClick={CreateComapny}>Continue</Button>
        </div>
    </div>
    </>
  )
}

export default CreateComapny