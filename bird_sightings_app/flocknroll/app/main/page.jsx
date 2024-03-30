"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Navbar from '../navbar/page';

export default function Main() {
    const router = useRouter();

    const handleClickLocation = () => {
        router.push(`/desktop/location`)
      }

    const handleClickBirds = () => {
        router.push(`/desktop/birds`)
      }

    return (
        <div>
            <Navbar></Navbar>
            <div className="flex justify-center items-center h-screen">
                <div className="cards hover:cursor-pointer cardmargin max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-black dark:bg-gray-800 dark:border-gray-700 mb-8">
                    <a onClick={() => handleClickBirds()}>
                        <Image
                            className='border-gray-200 rounded-lg'
                            src="/images/birds.jpg"
                            width={500}
                            height={500}
                            alt="Picture of the author"
                        />
                    </a>
                    <div className="p-5" onClick={() => handleClickBirds()}>
                        <a onClick={() => handleClickBirds()}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Search By Bird</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You can find the Birds by providing their Names. You will get to see where the Birds were sighted and see their image and details.</p>
                        <a onClick={() => handleClickBirds()} className="button-background-2 inline-flex items-center px-3 py-2 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm">
                            Birds
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="cards hover:cursor-pointer cardmargin max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-black dark:bg-gray-800 dark:border-gray-700 mb-8">
                    <a onClick={() => handleClickLocation()}>
                        <Image
                            className='border-gray-200 rounded-lg'
                            src="/images/locations.jpg"
                            width={500}
                            height={500}
                            alt="Picture of the author"
                        />
                        {/* <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" /> */}
                    </a>
                    <div className="p-5" onClick={() => handleClickLocation()}>
                        <a onClick={() => handleClickLocation()}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Search By Location</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You can find the Birds by providing the Location. You will get to see list of Birds sighted within that location. After selecting bird you can see bird image and details.</p>
                        <a onClick={() => handleClickLocation()} className="button-background-2 inline-flex items-center px-3 py-2 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm">
                            Locations
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}