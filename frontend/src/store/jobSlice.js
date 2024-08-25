import { createSlice } from "@reduxjs/toolkit"

const jobSlice=createSlice({
    name:"jobs",
    initialState:{
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],
        searchJobsByText:""
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload
        },
        setsearchJobsByText:(state,action)=>{
            state.searchJobsByText=action.payload
        }
    }
})

export const {setAllJobs,setSingleJob,setAllAdminJobs,setsearchJobsByText}=jobSlice.actions
export default jobSlice.reducer