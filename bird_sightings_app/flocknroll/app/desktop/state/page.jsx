"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getBirdsByLocation } from "@/app/api/request";
import { useState, useEffect } from "react";
import Navbar from "@/app/navbar/page";

export default function StatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [birds, setBirds] = useState([]);
  const [filteredBirds, setFilteredBirds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const stateId = searchParams.get("stateId");
  const stateName = searchParams.get("stateName");

  useEffect(() => {
    // Function to fetch birds data when component mounts
    const fetchData = async () => {
      try {
        if (!birds.length == 0) {
          setBirds(birds); // Update birds state with fetched data
          setFilteredBirds(birds); // Initialize filtered birds with all birds data
        } else {
          const birdsData = await getBirdsByLocation(stateId);
          setBirds(birdsData); // Update birds state with fetched data
          setFilteredBirds(birdsData); // Initialize filtered birds with all birds data
        }
      } catch (error) {
        console.error("Error fetching birds data:", error);
        // Handle error if necessary
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes or error occurs
      }
    };

    fetchData(); // Call the fetchData function when component mounts
  }, [stateId]);

  const handleSearch = (searchText) => {
    // Filter birds based on search text
    const filtered = birds.filter((bird) =>
      bird.american_english_name
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredBirds(filtered);
  };

  const handleBirds = (bird) => {
    router.push(
      `/desktop/birdinfo?speciesCode=${bird.species_code}&birdName=${bird.american_english_name}&sciName=${bird.scientific_name}&stateId=${stateId}`
    );
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="listMargin">
        <div className="text-center mb-8">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
            Birds in&nbsp;
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              {stateName}!
            </span>
          </h1>
        </div>
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            id="default-search"
            className="searchBarSpace searchbar block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Search Birds in ${stateName}...`}
            onChange={(e) => handleSearch(e.target.value)}
            required
          />

          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center">
                <img
                  src="/gif/loading.gif"
                  alt="Loading..."
                  className="loading-gif"
                />
              </div>
            ) : (
              <ul>
                {filteredBirds.map((bird) => (
                  <li
                    key={bird.species_code}
                    className="py-2 px-4 border rounded-lg mb-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-200 transition duration-300"
                    onClick={() => handleBirds(bird)}
                  >
                    {bird.american_english_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
