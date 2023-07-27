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
                    <h1 className="text-3xl mb-8"><span className="font-semibold">Samochód: </span>{rental.car.title}</h1>
                </div>
                <Link to={'/account/rentals'} className="inline-block relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 transform transition-transform duration-200 ease hover:-translate-x-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </Link>
            </div>
            <div className="bg-gray-200 p-6 mb-8 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-6">Informacje o twoim wynajmie:</h2>
                    <RentalDays rental={rental} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Szacowana cena:</div>
                    <div className="text-3xl">{rental.price} PLN</div>
                </div>
            </div>
            <CarGallery car={rental.car} />
        </div>
    );
}