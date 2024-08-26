import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/store/applicationSlice'
import { useParams } from 'react-router-dom'

function Applicants() {
    const {id}=useParams()
    const dispatch=useDispatch()
    const {applicants}=useSelector((store)=>store.applications)
    useEffect(()=>{
        const fetchData =async()=>{
        try {

                const res=await axios.get(`${APPLICATION_API_ENDPOINT}/${id}/applicants`,{
                    withCredentials:true
                })
                    dispatch(setApplicants(res.data.job.applications))
                    console.log(res.data.job.applications)
            
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }
        fetchData()
    },[id,dispatch])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants({applicants?.length})</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants