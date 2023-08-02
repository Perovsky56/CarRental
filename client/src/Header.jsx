import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){

    const {user} = useContext(UserContext);
    return (
        <header className='inline-block md:flex justify-between pb-4'>
            <Link to={'/'} href="" className="flex items-center gap-1 border border-gray-300 rounded-2xl px-4 h-16 hover:shadow hover:shadow-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>

                <span className='font-bold text-xl'>carRental.</span>
            </Link>
            <br/>
            {/* <div className='items-center flex gap-3 border border-gray-300 rounded-md py-2 px-4 shadow-md shadow-gray-300'>
                {<div className="border-l border-gray-300"></div>}
                <div className="uppercase font-semimedium">Wyszukaj pojazd</div>
                <button className='bg-primary text-white p-1 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div> */}
            <Link to={user?'/account':'/login'} className='flex items-center gap-4 border border-gray-300 rounded-2xl py-2 px-8 hover:shadow hover:shadow-gray-200'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 relative top-1 ">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                 </div>
                 {!!user && (
                    <div>
                        {user.name}
                    </div>
                 )}
            </Link>
        </header>
    );
}