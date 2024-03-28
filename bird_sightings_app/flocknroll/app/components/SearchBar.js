import { useState, useEffect } from "react";
import { getBirdsByName, getBirdsByDescription } from "../api/request"; // Assuming separate API functions

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name"); // Default search by name

  const handleSearch = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (searchBy === "name") {
      const response = await getBirdsByName(newQuery);
      onSearch(response);
    } else {
      const response = await getBirdsByDescription(newQuery);
      onSearch(response);
    }
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <div className="flex w-full mb-4">
      <div className="flex items-center mr-4">
        <span className="mr-2"></span>
        <div className="flex items-center">
          <input
            type="radio"
            id="searchByName"
            name="searchBy"
            value="name"
            checked={searchBy === "name"}
            onChange={handleSearchByChange}
            className="mr-2"
          />
          <label htmlFor="searchByName">Bird Name</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="searchByDescription"
            name="searchBy"
            value="description"
            checked={searchBy === "description"}
            onChange={handleSearchByChange}
            className="mr-2"
          />
          <label htmlFor="searchByDescription">Bird Details</label>
        </div>
      </div>
      <input
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        type="text"
        placeholder="Search for birds..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
