"use client";

// function MyPage() {
//   return (
//     <div>
//       <h1>USA Map States</h1>
//       <div id="map" ></div> {/* Map container */}
//       <Map />
//     </div>
//   );
// }

// export default MyPage;

// import React, { useState, useEffect } from "react";
// import SearchBar from "../../components/SearchBar";
// import SearchResults from "../../components/SearchResults";

// const IndexPage = () => {
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = (data) => {
//     setSearchResults(data);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-4">Bird Search</h1>
//       <SearchBar onSearch={handleSearch} />
//       {searchResults.length > 0 && <SearchResults birds={searchResults} />}
//     </div>
//   );
// };

// export default IndexPage;

import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import SearchResults from "../../components/SearchResults";
import BirdDetails from "../../components/BirdDetails";
import Map from "../../components/Map";

const MyPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBird, setSelectedBird] = useState(null);

  const handleSearch = (data) => {
    setSearchResults(data);
  };

  const handleBirdClick = (bird) => {
    setSelectedBird(bird);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white shadow-md rounded-lg p-4">
        <Map />
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
