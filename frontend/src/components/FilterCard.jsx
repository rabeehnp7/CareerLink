import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
const filterData = [
  {
    filterType: "Location",
    array: ["Delhi","Bangalore","Hyderabad","Pune","Mumbai","Chennai","Kolkata",],
  },
  {
    filterType: "Job Role",
    array: ["Frontend Developer","Backend Developer","Full Stack Developer","UX/UI Designer","Data Scientist","Product Manager","DevOps Engineer",],
  },
  {
    filterType: "Salary",
    array: ["10-40k","40k-1Lakh","1-2Lakh","2-4Lakh","4-6Lakh","6-10Lakh","10Lakh+",],
  },
];

function FilterCard() {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200 max-w-md">
      <h1 className="text-xl font-semibold mb-4 text-left">Filter Jobs</h1>
      <div className="space-y-4">
        {filterData.map((data, index) => (
          <div key={index} className="text-left">
            <h2 className="text-lg font-medium mb-2">{data.filterType}</h2>
            <RadioGroup className="space-y-2">
              {data.array.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem
                    id={item}
                    value={item}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                  />
                  <Label htmlFor={item} className="text-gray-700">
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCard;