import axios from "axios";
import React, { useEffect,useState } from "react";
import { APPLICATION_API_ENDPOINT } from "./constants/constants";
import { toast } from "sonner";

function AppliedJobs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${APPLICATION_API_ENDPOINT}/get`,
          {withCredentials:true}
        );
        setData(data.appliedJobs);
        console.log(data.appliedJobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="max-w-3xl mx-auto mt-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Applied Jobs</h2>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
          <tr className="bg-gray-200 text-gray-800">
              <th className="py-3 px-4 text-left">Job Title</th>
              <th className="py-3 px-4 text-left">Company</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 ?
              data.map((application,index)=>(
                <tr key={index} className="border-t text-gray-700 hover:bg-gray-100">
                <td className="py-3 px-4 text-left">{application.job.title}</td>
                <td className="py-3 px-4 text-left">{application.job.company.name}</td>
                <td className="py-3 px-4 text-left">{application.status}</td>
              </tr>

              )) :
              <tr>
                <td colSpan="3" className="py-3 px-4 text-center font-bold">
                  No applied jobs found.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppliedJobs;
