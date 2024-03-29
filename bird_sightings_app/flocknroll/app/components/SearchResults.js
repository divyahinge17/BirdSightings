import { getBirdsByName, getBirdsByDescription } from "../api/request";
import { useState, useEffect } from "react";

const SearchResults = ({ birds, onBirdClick }) => {  
  return (
    <div className="max-h-96 overflow-y-auto">
      {/* <div className="border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-200 transition duration-300 ">
        {birds.map((bird) => (
          <div
            key={bird.species_code}
            className="mb-4 bg-gray-100 hover:bg-gray-200 shadow-sm rounded-md p-2 cursor-pointer"
            onClick={() => {
              onBirdClick(bird);
              console.log(`Bird clicked: ${bird.species_code}`);
            }}
          >
            <p className="text-gray-700 font-bold">
              {bird.american_english_name}
            </p>
          </div>
        ))}
      </div> */}
      <ul >
      {birds.map((bird) => (
          <li
            key={bird.species_code}
            className="py-2 px-4 border rounded-lg mb-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-200 transition duration-300"
            onClick={() => {
              onBirdClick(bird);
              console.log(`Bird clicked: ${bird.species_code}`);
            }}
          >
            <p className="text-gray-700 font-bold">
              {bird.american_english_name}
            </p>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default SearchResults;
