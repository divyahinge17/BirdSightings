const BirdDetails = ({ bird }) => {
  if (!bird) return null; // Handle case where no bird is provided

  return (
    <div className="mt-4 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-2">Bird Details</h2>
      <ul className="list-disc space-y-2">
        <li>American English Name: {bird.bird_american_english_name}</li>
        <li>Scientific Name: {bird.scientific_name}</li>
        <li>Description: {bird.bird_description}</li>
      </ul>
    </div>
  );
};

export default BirdDetails;
