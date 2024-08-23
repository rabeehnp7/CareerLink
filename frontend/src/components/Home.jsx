import React, { Fragment, useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CatrgoryCarousel from './CatrgoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from './hooks/useGetAllJobs'

function Home() {
    useGetAllJobs()
  return (
    <Fragment>
        <Navbar/>
        <HeroSection/>
         <CatrgoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </Fragment>
  )
}

export default Home