const SearchResults = ({ birds, onBirdClick }) => {
  return (
    <div className="h-1/3 overflow-y-auto bg-white shadow-md rounded-lg p-4">
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
    </div>
  );
};

export default SearchResults;
