"use client";

// export default IndexPage;

import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import SearchResults from "../../components/SearchResults";
import BirdDetails from "../../components/BirdDetails";
import Map from "../../components/Map";
import Navbar from "@/app/navbar/page";
import Comment from "@/app/components/Comment";

const MyPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBird, setSelectedBird] = useState(null);
  const userName = localStorage.getItem('userName');
  // const [sightingBird, setSightingBird] = useState([]);

  const handleSearch = (data) => {
    setSearchResults(data);
    console.log("In Seacrh...")
    console.log(data)
  };

  const handleBirdClick = (bird) => {
    setSelectedBird(bird);
    // const response = await fetch(`/api/sightings?species_code=${bird.species_code}`);
    // const data = await response.json();
    // setSightingBird(bird);
  };

  return (
    <div>
      <Navbar />
      <div className="listMargin text-center mb-8">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
          Birds in&nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            USA!
          </span>
        </h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ marginRight: '50px' }}>
            {!selectedBird ? (
              <div className="flex justify-center">
                <div className="max-w-lg mx-auto p-6">
                  <SearchBar onSearch={handleSearch} />
                  {searchResults && <SearchResults birds={searchResults} onBirdClick={handleBirdClick} />}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center w-full p-6" style={{paddingLeft: '80px'}}>
                <div className="w-full md:w-1/2">
                  <div className="max-w-lg mx-auto p-6"> {/* Limited width container for SearchBar */}
                    <SearchBar onSearch={handleSearch} />
                  </div>
                  {searchResults && (
                    <SearchResults birds={searchResults} onBirdClick={handleBirdClick} />
                  )}
                  {selectedBird && <Map sightingBird={selectedBird} />}
                </div>
                <div className="w-full md:w-1/2 p-6">
                  <div style={{paddingLeft: '70px'}}>
                    {selectedBird && <BirdDetails bird={selectedBird} />}
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', minHeight: '100vh' }}>
        <div className="flex flex-wrap justify-center w-full p-6">
          <div className="w-full md:w-1/2">
            {selectedBird && <Map sightingBird={selectedBird} className="w-full h-full" />}
          </div>
        </div>
      </div> */}
    </div>
  );
};


export default MyPage;
