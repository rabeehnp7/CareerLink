import React from "react";

function AppliedJobs() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
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
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4">Front-end Developer</td>
              <td className="py-3 px-4">Acme Inc.</td>
              <td className="py-3 px-4">Pending</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4">Web Developer</td>
              <td className="py-3 px-4">Globex Corp.</td>
              <td className="py-3 px-4">Accepted</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4">UI/UX Designer</td>
              <td className="py-3 px-4">Stark Industries</td>
              <td className="py-3 px-4">Rejected</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppliedJobs;
