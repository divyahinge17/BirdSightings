import { Image } from "next/image";

const BirdDetails = ({ bird }) => {
  if (!bird) return null; // Handle case where no bird is provided

  return (
    <div className="flex flex-col md:flex-row md:items-center mt-4 bg-white shadow-md rounded-lg p-4">
      {/* Image container */}
      <div className="w-full md:w-1/2 mr-4 md:mr-8">
        {bird.image_url ? (
          <Image
            src={bird.image_url}
            alt={bird.american_english_name}
            width={300}
            height={200} // Adjust as needed
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="bg-gray-200 rounded-lg h-full flex items-center justify-center">
            {/* Placeholder content */}
            <p className="text-gray-500">Bird Image</p>
          </div>
        )}
      </div>

      {/* Bird details */}
      <div className="flex-grow">
        <h2 className="text-2xl font-bold mb-2">Bird Details</h2>
        <ul className="list-disc space-y-2">
          <li>American English Name: {bird.american_english_name}</li>
          <li>Scientific Name: {bird.scientific_name}</li>
          <li>Description: {bird.bird_description}</li>
        </ul>
      </div>
    </div>
  );
};

export default BirdDetails;
