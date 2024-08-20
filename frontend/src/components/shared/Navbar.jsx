import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
    const user=false
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Career<span className="text-[#28A745]">Link</span>
          </h1>
        </div>
        <div>
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
            {
                !user ? (
                    <div className="flex items-center gap-2">
                        <Link to='/login'><Button variant="outline">Login</Button></Link>
                        <Link to='/signup'><Button className="bg-[#6A38C2] hover:bg-[#532B8B]">SignUp</Button></Link>
                    </div>) :
                               ( <Popover>
                                <PopoverTrigger asChild>
                                  <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                  </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                <div className="flex gap-4 space-y-2">
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                  </Avatar>
                                  <div>
                                  <h4 className="font medium">Rabeeh</h4>
                                  <p className="text-sm text-muted-foreground">lorem ipsum</p>
                                  </div>
                                </div>
                                <div className="flec flex-col my-2  gap-3 text-gray-600">
                                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                                  <User2/>
                                  <Button variant="link">View Profile</Button>
                                  </div>
                                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                                      <LogOut/>
                                  <Button variant="link">View Profile</Button>
                                  </div>
                                </div>
                                </PopoverContent>
                              </Popover>
  )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
