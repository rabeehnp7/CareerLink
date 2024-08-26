import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/store/jobSlice";
import { Navigate, useNavigate } from "react-router-dom";

function HeroSection() {
  const [query,setQuery]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleQuery=()=>{
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search ,Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Job</span>
        </h1>
        <p>lorrem ipsum </p>
        <div className="flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto outline-none">
          <Input
            type="text"
            placeholder="Find your dream jobs"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            className="border-none w-full focus:outline-none"
          />

          <Button onClick={handleQuery} className="rounded-r-full bg-[#6A38C2]">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
