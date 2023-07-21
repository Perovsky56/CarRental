import {Link, useParams} from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CarsPage(){
    const [cars, setCars] = useState([]);
    useEffect(() => {
        axios.get('/user-cars').then(({data}) => {
            setCars(data);
        });
    }, []);
    return (   
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/cars/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Dodaj nowy samochód
                </Link>
            </div>
            <div className="mt-4">
                {cars.length > 0 && cars.map(car => (
                    <Link key={car._id} to={'/account/cars/'+car._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                            {car.photos.length > 0 && (
                                <img className="object-cover" src={'http://localhost:4000/uploads/'+car.photos[0]} alt="" />
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{car.title}</h2>
                            <p className="text-sm mt-2">{car.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}