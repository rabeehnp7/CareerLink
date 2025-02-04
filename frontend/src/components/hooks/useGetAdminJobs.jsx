import { setAllAdminJobs } from '@/store/jobSlice'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_ENDPOINT } from '../constants/constants'

const useGetAdminJobs = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchData =async ()=>{
           try {
            const res=await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`,{
              withCredentials:true
             })
             if(res.data.success){
              dispatch(setAllAdminJobs(res.data.jobs))
             }
           } catch (error) {
            console.log(error?.response?.data?.message)
           }
        }
        fetchData()
      },[dispatch])
}

export default useGetAdminJobs