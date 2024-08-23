import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "./constants/constants";
import { toast } from "sonner";
import { setLoading, setUser } from "@/store/authSlice";
import { Loader2 } from "lucide-react";

function ProfileEditDialog({ open, setOpen }) {
  const { user } = useSelector((store) => store.auth);
  const {loading}=useSelector((store)=>store.auth)
  const dispatch=useDispatch()
  const [input, setInput] = useState({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    skills: user?.profile?.skills,
    bio: user?.profile?.bio,
    file:user?.profile?.resume || ""
  });
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault()
    dispatch(setLoading(true))
    const formData= new FormData()
    formData.append("fullName",input.fullName)
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("skills",input.skills)
    formData.append("bio",input.bio)
    if(input.file){
      formData.append("file",input.file)
    }
    console.log(formData)
   try {
    console.log(FormData)
    const res= await axios.post(`${USER_API_ENDPOINT}/profile/updateProfile`,formData,{
            headers:{
                "Content-Type":"multipart/form-data",
            },
            withCredentials:true
    })
   if(res.data.success){
    toast.success(res.data.message)
    dispatch(setUser(res.data.user))
    setOpen(false);
   }
   } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
   }finally{
    dispatch(setLoading(false))
   }
  };
  const handleFileChange = (e) => {
    setInput({...input,file:e.target?.files?.[0]})
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Name</Label>
                <Input
                  type="text"
                  id="name"
                  onChange={changeHandler}
                  value={input.fullName}
                  name="fullName"
                  className="col-span-4"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>E-mail</Label>
                <Input
                  type="email"
                  onChange={changeHandler}
                  value={input.email}
                  id="name"
                  name="email"
                  className="col-span-4"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Phone Number</Label>
                <Input
                  type="text"
                  id="name"
                  onChange={changeHandler}
                  value={input.phoneNumber}
                  name="phoneNumber"
                  className="col-span-4"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Skills</Label>
                <Input
                  onChange={changeHandler}
                  type="text"
                  id="name"
                  value={input.skills}
                  name="skills"
                  className="col-span-4"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Bio</Label>
                <Input
                  type="text"
                  onChange={changeHandler}
                  value={input.bio}
                  id="name"
                  name="bio"
                  className="col-span-4"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Resume</Label>
                <Input
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  accept="application/pdf"
                  type="file"
                  className="col-span-4 cursor-pointer"
                />
              </div>
            </div>
            {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
            </Button>
          ) :
            <Button
              onClick={handleSubmit}
              type="submit"
              className="w-full py-2 mt-4 bg-gray-800 text-white hover:bg-gray-900"
            >
              Update
            </Button>}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProfileEditDialog;
