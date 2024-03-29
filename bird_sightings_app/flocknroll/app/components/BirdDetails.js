import { Image } from "next/image";
import React, { useState, useEffect } from 'react';
import { getImage } from '@/app/api/request';

const BirdDetails = ({ bird }) => {

  if (!bird) return null; // Handle case where no bird is provided

  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
        try {
            console.log(bird.american_english_name)
            const imageData = await getImage(bird.american_english_name);
            console.log(imageData)

            if (imageData == "Image not found!") {
                console.log("Here")
                console.log(imageData)
                setImageSrc(null);
            } else {
                setImageSrc(URL.createObjectURL(imageData));
            }
        } catch (error) {
            console.log(error)
            setImageSrc(null);
        }

    };

    if (bird.american_english_name) {
        fetchImage();
    }
}, [bird.american_english_name]);

return (
  <div>
    <div className="flex flex-wrap justify-center w-full birdinfomargin">
      <div className="hover:cursor-pointer cardmargin max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-black dark:bg-gray-800 dark:border-gray-700">
        <a className="flex justify-center items-center">
          {imageSrc ? (
            <img src={imageSrc} alt={`Image of ${bird.american_english_name}`} style={{ width: '300px', height: '250px', boxShadow: '0 8px 8px rgba(0, 0, 0, 0.5)' }} />
          ) : (
            <img src='/images/defaultbird.jpg' alt={`Image Unavailable`} style={{ width: '300px', height: '250px', boxShadow: '0 8px 8px rgba(0, 0, 0, 0.5)' }} />
          )}
        </a>
        <div className="p-5 justify-center items-center">
          <a className="text-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white justify-center items-center">
              {bird.american_english_name}
            </h5>
            <h4 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">({bird.scientific_name})</h4>
          </a>
          <div className="max-h-32 overflow-y-auto">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words">
            {bird.bird_description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default BirdDetails;
