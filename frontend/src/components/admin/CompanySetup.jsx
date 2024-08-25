import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '../constants/constants'
import { useNavigate, useParams } from 'react-router-dom'
import { setSingleCompany } from '@/store/companySlice'
import { toast } from 'sonner'
import useGetCompanyById from '../hooks/useGetCompanyById'

function CompanySetup() {
    const [loading,setLoading]=useState(false)
    const {id}=useParams()
    useGetCompanyById(id)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {singleCompany}=useSelector((store)=>store.company)
    const [input,setInput]=useState({
        name: "",
        description:"",
        website: "",
        location: "",
        file: null
    })
    useEffect(()=>{
        setInput({
        name:singleCompany?.name || "",
        description:singleCompany?.description || "",
        website:  singleCompany?.website || "",
        location:singleCompany?.location || "",
        file:singleCompany?.file || null
        })
    },[singleCompany])
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const fileChangeHandler =(e)=>{
        const file=e.target.files?.[0]
        setInput({...input,file})
    }
    const submitHandler=async(e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append("name",input.name)
        formData.append("description",input.description)
        formData.append("website",input.website)
        formData.append("location",input.location)
        if(input.file){
            formData.append("file",input.file)
        }
        try {
        setLoading(true)
        const res=await axios.put(`${COMPANY_API_ENDPOINT}/update/${id}`,formData,{
            headers:{
                "Content-Type":"appliaction/json"
            },
            withCredentials:true
        })
        if(res.data.success){
            dispatch(setSingleCompany(res.data.company))
            toast.success(res.data.message)
            navigate("/admin/company")
        }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)
    }
  return (
    <>
     <Navbar/>
     <div className='max-w-xl mx-auto my-10'>
        <form action="" onSubmit={submitHandler}>
            <div className='flex items-center gap-5 p-8'>
            <Button onClick={()=>navigate("/admin/company")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold"><ArrowLeft/>
            <span>Back</span>
            </Button>
            <h1 className='font-bold text-xl'>Company Setup</h1>
            </div>
            <div className='grid grid-cols-2 gap-4'>
            <div>
            <Label>Company Name</Label>
            <Input
            value={input.name}
            onChange={changeEventHandler}
            type="text"
            name="name"
            />
            </div>
            <div>
            <Label>Description</Label>
            <Input
            value={input.description}
            onChange={changeEventHandler}
            type="text"
            name="description"
            />
            </div>
            <div>
            <Label>Website</Label>
            <Input
            value={input.website}
            onChange={changeEventHandler}
            type="text"
            name="website"
            placeholder="www.comapnydomain.com/"
            />
            </div>
            <div>
            <Label>Location</Label>
            <Input
            value={input.location}
            onChange={changeEventHandler}
            type="text"
            name="location"
            />
            </div>
            <div>
            <Label>Company Logo</Label>
            <Input
            onChange={fileChangeHandler}
            type="file"
            accept="image/*"
            />
            </div>
            </div>
            {loading ? (
            <Button className="w-full mt-8">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
            </Button>
          ):
            <Button type="submit" className="w-full mt-8">Update</Button>}
        </form>
     </div>
    </>
  )
}

export default CompanySetup