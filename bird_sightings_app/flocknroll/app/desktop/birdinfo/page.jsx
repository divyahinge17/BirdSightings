"use client";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/app/navbar/page';
import { getImage } from '@/app/api/request';
import StateMap from '@/app/components/Statemap';

export default function BirdInfo() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [imageSrc, setImageSrc] = useState(null);
    const speciesCode = searchParams.get('speciesCode');
    const birdName = searchParams.get('birdName');
    const sciName = searchParams.get('sciName');
    const stateId = searchParams.get('stateId');

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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Navbar />
            <div className='cardmargin' style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ marginRight: '50px' }}>
                    {imageSrc ? (
                        <img src={imageSrc} alt={`Image of ${birdName}`} style={{ width: '300px', height: '250px', boxShadow: '0 8px 8px rgba(0, 0, 0, 0.5)' }} />
                    ) : (
                        <img src='/images/defaultbird.jpg' alt={`Image Unavailable`} style={{ width: '300px', height: '250px', boxShadow: '0 8px 8px rgba(0, 0, 0, 0.5)' }} />
                    )}
                </div>

                <div style={{ marginRight: '40px' }}>
                    <h1 className="text-3xl font-bold dark:text-black">{birdName}</h1>
                    <br />
                    <p> Scientific Name - {sciName}</p>
                    {/* <p> Species Code - {speciesCode}</p> */}
                    <p> Description </p>
                </div>

                <div style={{ width: '500px', height: '500px', border: '1px solid black', boxShadow: '0 8px 8px rgba(0, 0, 0, 0.5)' }}>
                    <StateMap style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </div>
    );
}