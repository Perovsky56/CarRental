import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CarGallery from "../CarGallery";
import RentalDays from "../RentalDays";

export default function RentalPage(){
    const {id} = useParams();
    const [rental, setRental] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/rentals').then(response => {
                const foundRental = response.data.find(({_id}) => _id === id);
                if (foundRental) {
                    setRental(foundRental);
                }
            });
        }
    }, [id]);

    if (!rental) {
        return '';
    }

    return (
        <div className="my-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg md:text-3xl mb-8"><span className="font-semibold">Samochód: </span>{rental.car.title}</h1>
                </div>
                <Link to={'/account/rentals'} className="inline-block relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 transform transition-transform duration-200 ease hover:-translate-x-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </Link>
            </div>
            <div className="bg-gray-200 p-6 mb-8 rounded-2xl xl:flex items-center justify-between">
                <div className="w-full lg:w-auto">
                    <h2 className="text-2xl mb-6">Informacje o twoim wynajmie:</h2>
                    <RentalDays rental={rental} />
                </div>
                {rental.withTransport && (
                    <div className="flex flex-col md:flex-row p-5 xl:p-0 gap-4">
                        <div className="shrink flex justify-center lg:w-48">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://maps.google.com?q=${rental.pickupCoordinates}`}
                                className="py-2 px-4 bg-gray-300 rounded-md shadow shadow-gray-400 hover:bg-gray-500 hover:text-white transition duration-300 block text-center flex items-center justify-center"
                            >
                                Wybrane miejsce ODBIORU
                            </a>
                        </div>
                        <div className="shrink flex justify-center lg:w-48">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://maps.google.com?q=${rental.returnCoordinates}`}
                                className="py-2 px-4 bg-gray-300 rounded-md shadow shadow-gray-400 hover:bg-gray-500 hover:text-white transition duration-300 block text-center flex items-center justify-center"
                            >
                                Wybrane miejsce ZWROTU
                            </a>
                        </div>
                    </div>
                )}
                <div className="bg-primary p-6 text-white rounded-2xl text-center">
                    <div>Szacowana cena:</div>
                    <div className="text-3xl">{(rental.price).toFixed(2)} PLN</div>
                </div>
            </div>
            <CarGallery car={rental.car} />
        </div>
    );
}