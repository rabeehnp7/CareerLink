import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/shared/Navbar'
import { Fragment } from 'react';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import JobDetails from './components/JobDetails';
import { Toaster } from 'sonner';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
function App() {
  const appRouter=createBrowserRouter([
    {
      path:"/",
    element:<Home/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"signup",
      element:<Signup/>
    },
    {
      path:"/jobs",
      element:<Jobs/>
    },
    {
      path:"/browse",
      element:<Browse/>
    },
    {
      path:"/profile",
      element:<Profile/>
    },
    {
      path:"/jobDetails/:id",
      element:<JobDetails/>
    }
  ])
  return (
    <Fragment>
          <RouterProvider router={appRouter}/>
          <Toaster/>
    </Fragment>
  )
}

export default App
