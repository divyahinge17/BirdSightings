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

  const defaultSearch =  async(value) => {
    const response = await getBirdsByName(value);
    onSearch(response);
  }

  useEffect(() => {
    console.log("Here")
    defaultSearch(""); // Fetch search results with empty query on page load
  }, []);

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    //className="absolute top-20 left-0 p-6"
    <div> 
      {/* <div className="text-center mb-8">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
          Birds in&nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            USA
          </span>
        </h1>
      </div> */}
      <div className="flex justify-center space-x-4 mb-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="searchByName"
            name="searchBy"
            value="name"
            checked={searchBy === 'name'}
            onChange={handleSearchByChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="searchByName" className="ml-1">Bird Name</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="searchByDescription"
            name="searchBy"
            value="description"
            checked={searchBy === 'description'}
            onChange={handleSearchByChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="searchByDescription" className="ml-1">Bird Details</label>
        </div>
      </div>
      <input
        className="searchBarSpace searchbar block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        placeholder="Search for birds..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
