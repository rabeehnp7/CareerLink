import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
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

function CatrgoryCarousel() {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
            {
                category.map((category,key)=>(
                    
                    <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                        <Button variant="outline" className="rounded-full">{category}</Button>
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

export default CatrgoryCarousel;
