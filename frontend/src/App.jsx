import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import { Fragment } from "react";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import JobDetails from "./components/JobDetails";
import { Toaster } from "sonner";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import Company from "./components/admin/Company";
import CreateComapny from "./components/admin/CreateComapny";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import CreateJob from "./components/admin/CreateJob";
import AdminJobsEdit from "./components/admin/AdminJobsEdit";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/jobDetails/:id",
      element: <JobDetails />,
    },
    {
      path: "/admin/company",
      element: <ProtectedRoute><Company /></ProtectedRoute>,
    },
    {
      path: "/admin/company/create",
      element: <ProtectedRoute><CreateComapny /></ProtectedRoute>,
    },
    {
      path: "/admin/company/:id",
      element: <ProtectedRoute><CompanySetup/></ProtectedRoute>,
    },
    {
      path: "/admin/jobs",
      element: <ProtectedRoute><AdminJobs/></ProtectedRoute>,
    },
    {
      path: "/admin/jobs/create",
      element: <ProtectedRoute><CreateJob/></ProtectedRoute>,
    },
    {
      path: "/admin/jobs/:id",
      element: <ProtectedRoute><AdminJobsEdit/></ProtectedRoute>,
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: <ProtectedRoute><Applicants/></ProtectedRoute>,
    },
  ]);
  return (
    <Fragment>
      <RouterProvider router={appRouter} />
      <Toaster />
    </Fragment>
  );
}

export default App;
