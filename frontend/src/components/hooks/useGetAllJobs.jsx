import { setAllJobs } from '@/store/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_ENDPOINT } from '../constants/constants'

const useGetAllJobs = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchData =async ()=>{
           try {
            const res=await axios.get(`${JOB_API_ENDPOINT}/get`,{
              withCredentials:true
             })
             if(res.data){
              dispatch(setAllJobs(res.data.jobs))
             }
           } catch (error) {
            console.log(error)
           }
        }
        fetchData()
      },[])
}

export default useGetAllJobs