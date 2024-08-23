import React, { useState } from "react";
import { Edit2, Mail, Phone } from "lucide-react";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import AppliedJobs from "./AppliedJobs";
import Footer from "./shared/Footer";
import { Toaster } from "sonner";
import ProfileEditDialog from "./ProfileEditDialog";

function Profile() {
  const { user } = useSelector((store) => store.auth);
  const [open,setOpen]=useState(false)
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-8">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col items-center justify-center flex-grow">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user.profile.profilePhoto ? user.profile.profilePhoto : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"} alt="User Avatar" />
              </Avatar>
              <h1 className="text-3xl font-bold text-gray-800 text-center">
                {user.fullName}
              </h1>
            </div>
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none self-start">
              <Edit2 onClick={()=>setOpen(true)} size={20} />
            </button>
          </div>

          {user.profile.bio ? (
            <p className="text-gray-600 mb-6">
              Experienced web developer with a strong background in front-end
              technologies and a passion for building user-friendly
              applications.
            </p>
          ) : (
            <p className="text-gray-600 mb-6">Add your bio</p>
          )}

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-center text-gray-600">
              <Mail size={18} className="mr-2" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone size={18} className="mr-2" />
              <span>{user.phoneNumber}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => {
                  return (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  );
                })
              ) : (
                <p className="flex items-center text-gray-600">Add your skills</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Resume</h2>
            <a href={user?.profile?.resume} className="text-blue-600 hover:underline">
              {user?.profile?.resumeOriginalName}
            </a>
          </div>
        </div>
      </div>
      <AppliedJobs/>
      <ProfileEditDialog open={open} setOpen={setOpen}/>
      <Footer/>
      <Toaster/>
    </>
  );
}

export default Profile;
