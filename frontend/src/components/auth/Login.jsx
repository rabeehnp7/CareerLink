import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/store/authSlice";
import { Loader2 } from "lucide-react";


function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student"
  });
  const navigate=useNavigate()
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const {loading}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const submitHandler =async (e)=>{
    e.preventDefault()
    try {
        dispatch(setLoading(true))
        const res=await axios.post(`${USER_API_ENDPOINT}/login`,input,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
        console.log(res)
        if(res.data.success){
          dispatch(setUser(res.data.user))
            navigate("/")
            toast.success(res.data.message)
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message
        toast.error(errorMessage)
    }finally{
        dispatch(setLoading(false))
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md border border-gray-200 rounded-md p-6 my-10 shadow-lg"
        >
          <h1 className="font-bold text-2xl mb-6">Login</h1>
          <div className="mb-4">
            <Label htmlFor="email" className="block text-left mb-1">E-mail</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Joe@gmail.com"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" className="block text-left mb-1">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>
          <div className="mb-4">
            <Label className="block text-left mb-1">Role</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-2 mt-4 bg-gray-800 text-white hover:bg-gray-900">
              Login
            </Button>
          )}

          <div className="text-sm mt-4 text-center">
            Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
