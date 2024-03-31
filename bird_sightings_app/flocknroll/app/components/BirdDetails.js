import React, { useState, useEffect } from 'react';
import { getImage } from '@/app/api/request';
import Comment from "@/app/components/Comment";

const BirdDetails = ({ bird }) => {

  if (!bird) return null; // Handle case where no bird is provided

  const [imageSrc, setImageSrc] = useState(null);
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageData = await getImage(bird.american_english_name);

        if (imageData == "Image not found!") {
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
      <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#" className="flex justify-center items-center">
          {imageSrc ? (
            <img src={imageSrc} alt={`Image of ${bird.american_english_name}`} style={{ width: '300px', height: '250px', marginTop: '25px', borderRadius: '0.5rem' }} />
          ) : (
            <img src='/images/defaultbird.jpg' alt={`Image Unavailable`} style={{ width: '300px', height: '250px', marginTop: '25px', borderRadius: '0.5rem' }} />
          )}
        </a>
        <div class="p-5">
          <a href="#" className="text-center">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{bird.american_english_name}</h5>
            <h4 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">({bird.scientific_name})</h4>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 max-h-32 overflow-y-auto text-justify px-4 py-2">
            {bird.bird_description}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <div style={{ width: '700px' }}>
          <Comment
            user={userName}
            species_code={bird.species_code}
          />
        </div>
      </div>
    </div>
  );
};

export default BirdDetails;
