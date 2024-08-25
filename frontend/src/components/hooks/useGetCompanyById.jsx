import { setSingleCompany } from '@/store/companySlice'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '../constants/constants'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
const useGetCompanyById = (id) => {
    const dispatch=useDispatch()
  useEffect(()=>{
        const fetchCompanyData=async()=>{
            try {
                const res=await axios.get(`${COMPANY_API_ENDPOINT}/get/${id}`,{
                    withCredentials:true
                })
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
        fetchCompanyData()
    },[id,dispatch])
}

export default useGetCompanyById