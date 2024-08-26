import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/store/jobSlice";
import { useNavigate } from "react-router-dom";
const category = [
    "Data Science",
    "Graphic Designer",
    "Software Development",
    "Marketing",
    "Product Management",
    "Human Resources",
    "Sales",
    "Customer Support",
    "Content Writing",
    "Finance",
    "Cybersecurity",
    "UI/UX Design",
    "Project Management",
    "DevOps",
    "Healthcare",
    "Education & Training",
    "Consulting",
    "Legal",
    "Engineering",
    "Operations Management"
];

function CategoryCarousel() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleQuery=(query)=>{
    console.log(query)
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
            {
                category.map((category,index)=>(
                    
                    <CarouselItem key={index}  className="md:basis-1/2 lg-basis-1/3">
                        <Button onClick={()=>handleQuery(category)} variant="outline" className="rounded-full">{category}</Button>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselNext/>
        <CarouselPrevious/>
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
