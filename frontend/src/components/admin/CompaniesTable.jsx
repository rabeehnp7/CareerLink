import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar } from "@radix-ui/react-avatar";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { AvatarImage } from "../ui/avatar";
import useGetCompanies from "../hooks/useGetCompanies";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  useGetCompanies()
  const {searchCompanyByText}=useSelector((store)=>store.company)
  const {companies}=useSelector((store)=>store.company)
  const [filterSearch,setFilterSearch]=useState(companies)
  const navigate=useNavigate()
  useEffect(()=>{
    const filteredCompany=companies.length >= 0 && companies.filter((company)=>{
      if(!searchCompanyByText){
        return true
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterSearch(filteredCompany)
  },[searchCompanyByText,companies])
  return (
    <div>
      <Table className="w-full text-left">
        <TableCaption>A list of recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">Logo</TableHead>
            <TableHead className="w-5/12">Company Name</TableHead>
            <TableHead className="w-3/12">Date</TableHead>
            <TableHead className="w-3/12 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterSearch.length <= 0 ? <span>You have'nt registered any companies yet</span> :
            filterSearch.map((company)=>(
              <>
              <TableRow>
            <TableCell className="w-1/12">
              <Avatar className="w-14 h-14">
                <AvatarImage
                  src={company?.logo ? company.logo : "https://toppng.com/uploads/preview/company-address-comments-company-icon-png-white-11562970918zzhludknsl.png"}
                  alt="Company Logo"
                />
              </Avatar>
            </TableCell>
            <TableCell className="w-5/12">{company.name}</TableCell>
            <TableCell className="w-3/12">{new Date(company.createdAt).toLocaleDateString('en-US')}</TableCell>
            <TableCell className="w-3/12 text-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32 flex justify-center items-center">
                  <div onClick={()=>navigate(`/admin/company/${company._id}`)} className="bg-white shadow-md rounded-md p-2 flex items-center gap-2 cursor-pointer">
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
              </>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
