"use client";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Navbar from '../navbar/page';

export default function Main() {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/desktop/location`)
      }

    return (
        <div>
            <Navbar></Navbar>
            <div className="flex justify-center items-center h-screen">
                <div className="cards cardmargin max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-black dark:bg-gray-800 dark:border-gray-700 mb-8">
                    <a href="#">
                        <Image
                            className='border-gray-200 rounded-lg'
                            src="/images/birds.jpg"
                            width={500}
                            height={500}
                            alt="Picture of the author"
                        />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Seacrh By Bird</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You can find the Birds by providing their Names. You will get to see where the Birds were sighted and see their image and details.</p>
                        <a href="#" className="button-background-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Birds
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="cards hover:cursor-pointer cardmargin max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-black dark:bg-gray-800 dark:border-gray-700 mb-8">
                    <a onClick={() => handleClick()}>
                        <Image
                            className='border-gray-200 rounded-lg'
                            src="/images/locations.jpg"
                            width={500}
                            height={500}
                            alt="Picture of the author"
                        />
                        {/* <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" /> */}
                    </a>
                    <div className="p-5">
                        <a onClick={() => handleClick()}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Search By Location</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">You can find the Birds by providing the Location. You will get to see list of Birds sighted within that location. After selecting bird you can see bird image and details.</p>
                        <a onClick={() => handleClick()} className="button-background-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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