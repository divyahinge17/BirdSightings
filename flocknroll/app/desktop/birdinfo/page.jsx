"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/app/navbar/page";
import { getImage } from "@/app/api/request";
import StateMap from "@/app/components/Statemap";
import Comment from "@/app/components/Comment";
import { getBirdById } from "@/app/api/request";

export default function BirdInfo() {
  const searchParams = useSearchParams();
  const [imageSrc, setImageSrc] = useState(null);
  const [birdDetails, setbirdDetails] = useState("");
  const speciesCode = searchParams.get("speciesCode");
  const birdName = searchParams.get("birdName");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageData = await getImage(birdName);
        if (imageData == "Image not found!") {
        } else {
          setImageSrc(URL.createObjectURL(imageData));
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getBirdDetails = async () => {
      try {
        const bird_details = await getBirdById(speciesCode);
        setbirdDetails(bird_details);
      } catch (error) {
        console.log(error);
      }
    };

    if (birdName && speciesCode) {
      getBirdDetails();
      fetchImage();
    }
  }, [birdName, speciesCode]);

  return (
    <div>
      <Navbar />
      <div className="listMargin text-center mb-8">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
          Bird&nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Sightings!
          </span>
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#" className="flex justify-center items-center">
              <div>
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={`Image of ${birdName}`}
                    style={{
                      width: "300px",
                      height: "250px",
                      marginTop: "25px",
                      borderRadius: "0.5rem",
                    }}
                  />
                ) : (
                  <img
                    src="/images/defaultbird.jpg"
                    alt={`Image Unavailable`}
                    style={{
                      width: "300px",
                      height: "250px",
                      marginTop: "25px",
                      borderRadius: "0.5rem",
                    }}
                  />
                )}
              </div>
            </a>
            <div className="p-5">
              <a className="text-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {birdName}
                </h5>
                <h4 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  ({birdDetails.scientific_name})
                </h4>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-h-32 overflow-y-auto text-justify px-4 py-2">
                {birdDetails.bird_description}
              </p>
            </div>
          </div>

          <div
            style={{
              width: "600px",
              height: "533px",
              border: "1px solid black",
              marginLeft: "100px",
              boxShadow: "0 8px 8px rgba(0, 0, 0, 0.5)",
            }}
          >
            <StateMap style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "700px" }}>
          <Comment user={userName} species_code={speciesCode} />
        </div>
      </div>
    </div>
  );
}
