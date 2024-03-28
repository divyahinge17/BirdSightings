"use client";

// export default IndexPage;

import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import SearchResults from "../../components/SearchResults";
import BirdDetails from "../../components/BirdDetails";
import Map from "../../components/Map";

const MyPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBird, setSelectedBird] = useState(null);
  // const [sightingBird, setSightingBird] = useState([]);

  const handleSearch = (data) => {
    setSearchResults(data);
  };

  const handleBirdClick = (bird) => {
    setSelectedBird(bird);
    // const response = await fetch(`/api/sightings?species_code=${bird.species_code}`);
    // const data = await response.json();
    // setSightingBird(bird);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100 shadow-md rounded-lg p-4">
        <Map sightingBird={selectedBird} />
      </div>
      <div className="w-1/2 bg-gray-100 shadow-md rounded-lg p-4">
        <h1 className="text-3xl font-bold mb-4">Bird Search</h1>
        <SearchBar onSearch={handleSearch} />
        {searchResults && (
          <SearchResults birds={searchResults} onBirdClick={handleBirdClick} />
        )}
        {selectedBird && <BirdDetails bird={selectedBird} />}
      </div>
    </div>
  );
};

export default MyPage;
