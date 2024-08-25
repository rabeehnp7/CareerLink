import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { COMPANY_API_ENDPOINT } from '../constants/constants'
import { setCompanies } from '@/store/companySlice'

const useGetCompanies = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchData =async ()=>{
           try {
            const res=await axios.get(`${COMPANY_API_ENDPOINT}/get`,{
              withCredentials:true
             })
             if(res.data){
              dispatch(setCompanies(res.data.company))
             }
           } catch (error) {
            console.log(error)
           }
        }
        fetchData()
      },[dispatch])
}

export default useGetCompanies