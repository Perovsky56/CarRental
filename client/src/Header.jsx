import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import CarRentalLogo from "./CarRentalLogo";

export default function Header(){

    const {user} = useContext(UserContext);
    return (
        <header className='flex justify-between mt-1 sm:mt-4 pb-4 gap-2'>
            <Link to={'/'} href="" className="items-center flex border border-gray-300 px-2 py-2 sm:px-8 sm:py-4 w-32 sm:w-48 md:w-60 hover:shadow hover:shadow-gray-300 transition duration-200">
                <CarRentalLogo/>
            </Link>
            <br/>
            <Link to={user?'/account':'/login'} className='flex items-center gap-2 md:gap-4 border border-gray-300 py-2 px-4 md:px-8 hover:shadow hover:shadow-gray-300 transition duration-200'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-10 md:h-10 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-10 md:h-10 relative top-1 ">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                 </div>
                 {!!user && (
                    <div className="hidden sm:block text-xs sm:text-sm md:text-lg">
                        {user.name}
                    </div>
                 )}
            </Link>
        </header>
    );
}