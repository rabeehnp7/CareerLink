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
import { Toaster } from 'sonner';
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
