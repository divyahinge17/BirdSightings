"use client";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/app/navbar/page';
import { getImage } from '@/app/api/request';
import StateMap from '@/app/components/Statemap';
import Comment from '@/app/components/Comment';


export default function BirdInfo() {


    const searchParams = useSearchParams();
    const [imageSrc, setImageSrc] = useState(null);
    const speciesCode = searchParams.get('speciesCode');
    const birdName = searchParams.get('birdName');
    const sciName = searchParams.get('sciName');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageData = await getImage(birdName);
                console.log(imageData)

                if (imageData == "Image not found!") {
                    console.log(imageData)
                } else {
                    setImageSrc(URL.createObjectURL(imageData));
                }

            } catch (error) {
                console.log(error)
            }

        };

        if (birdName) {
            fetchImage();
        }
    }, [birdName]);



    return (

        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Navbar />
                <div className='cardmargin' style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <div>
                                {imageSrc ? (
                                    <img src={imageSrc} alt={`Image of ${birdName}`} style={{ width: '382px', height: '280px'}} />
                                ) : (
                                    <img src='/images/defaultbird.jpg' alt={`Image Unavailable`} style={{ width: '382px', height: '280px'}}/>
                                )}
                            </div>
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{birdName}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Scientific Name - {sciName}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Description</p>
                        </div>
                    </div>

                    <div style={{ width: '500px', height: '500px', marginLeft: '150px' }}>
                        <StateMap style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>


            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                <Comment
                    user={userName}
                    species_code={speciesCode} />
            </div>
        </div>
    );
}