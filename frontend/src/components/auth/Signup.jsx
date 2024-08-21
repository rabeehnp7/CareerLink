import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "../constants/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/authSlice";
import { Loader2 } from "lucide-react";

function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const formData = new FormData();
  formData.append("fullName", input.fullName);
  formData.append("email", input.email);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("password", input.password);
  formData.append("role", input.role);
  if (input.file) {
    formData.append("file", input.file);
  }
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md border border-gray-200 rounded-md p-6 my-10 shadow-lg"
        >
          <h1 className="font-bold text-2xl mb-6">Sign Up</h1>

          <div className="mb-4">
            <Label htmlFor="full-name" className="block text-left mb-1">
              Full Name
            </Label>
            <Input
              id="full-name"
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              placeholder="Joe"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email" className="block text-left mb-1">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Joe@gmail.com"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="phone-number" className="block text-left mb-1">
              Phone Number
            </Label>
            <Input
              id="phone-number"
              type="tel"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="1+91 12345 67890"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password" className="block text-left mb-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
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

          <div className="mb-4 flex items-center">
            <Label
              htmlFor="profile-picture"
              className="block text-left mb-1 mr-2"
            >
              Profile Picture
            </Label>
            <Input
              id="profile-picture"
              accept="image/*"
              type="file"
              className="cursor-pointer"
              onChange={fileHandler}
            />
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-2 mt-4 bg-gray-800 text-white hover:bg-gray-900"
            >
              Sign Up
            </Button>
          )}

          <div className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
