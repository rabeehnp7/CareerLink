import { createSlice } from "@reduxjs/toolkit"

const jobSlice=createSlice({
    name:"jobs",
    initialState:{
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],
        searchJobsByText:"",
        searchQuery:""
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
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery=action.payload
        }
    }
})

export const {setAllJobs,setSingleJob,setAllAdminJobs,setsearchJobsByText,setSearchQuery}=jobSlice.actions
export default jobSlice.reducer