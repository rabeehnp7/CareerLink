import { setAllJobs } from '@/store/jobSlice'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { JOB_API_ENDPOINT } from '../constants/constants'

const useGetAllJobs = () => {
    const dispatch=useDispatch()
    const {searchQuery}=useSelector((store)=>store.jobs)
    useEffect(()=>{
        const fetchData =async ()=>{
           try {
            const res=await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`,{
              withCredentials:true
             })
             if(res.data){
              dispatch(setAllJobs(res.data.jobs))
             }
           } catch (error) {
            if(error.response && error.response.status=== 404){
              dispatch(setAllJobs([]))
            }else{
              console.log(error?.response?.data?.message)
            }
           }
        }
        fetchData()
      },[dispatch,searchQuery])
}

export default useGetAllJobs