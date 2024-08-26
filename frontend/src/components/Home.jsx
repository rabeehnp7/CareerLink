import React, { Fragment, useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from './hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CategoryCarousel from './CategoryCarousel'

function Home() {
  const {user}=useSelector((store)=>store.auth)
  const navigate=useNavigate()
  useEffect(()=>{
    if(user?.role==='recruiter'){
      navigate("/admin/company")
    }
  },[])
    useGetAllJobs()
  return (
    <Fragment>
        <Navbar/>
        <HeroSection/>
         <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </Fragment>
  )
}

export default Home