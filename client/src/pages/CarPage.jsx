import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import CarGallery from "../CarGallery";
import { Link } from "react-router-dom";

export default function CarPage(){
    const {id} = useParams();
    const [car, setCar] = useState(null);


    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/cars/${id}`).then(response => {
            setCar(response.data);
        });
    }, [id]);

    if (!car) return '';

    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <div className="flex justify-between">
                <h1 className="text-3xl"><span className="font-semibold">Samochód: </span>{car.title}</h1>
                <Link to={'/'} className="inline-block relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 transform transition-transform duration-200 ease hover:-translate-x-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </Link>
            </div>
            <div className="mt-8 grid gap-2 grid-cols-2 my-4 border border-gray-300 px-8 py-2">
                <div>
                    <h2 className="my-2 block underline">Silnik: {car.engineType}</h2>
                    <h2 className="my-2">Skrzynia biegów: {car.gearBoxType}</h2>
                </div>
                <div>
                    <div className="my-2 flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                        <h2 className="">Rok produkcji: {car.prodYear}</h2>
                    </div>
                    <div className="my-2 flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <h2 className="">Ilość miejsc: {car.seats}</h2>
                    </div>
                </div>
            </div>

            <CarGallery car={car}/>
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="mt-4 mb-8">
                        <h2 className="text-2xl font-semibold mb-2">Opis</h2>
                        {car.description}
                    </div>
                    <div className="text-xl">
                        <span className="font-semibold">Dzienny limit kilometrów:</span> {car.kilLimit}
                    </div>
                </div>
                <div>
                    <BookingWidget car={car}/>
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Informacje dodatkowe</h2>
                </div>
                <div className="mt-2 mb-4 text-sm text-gray-700 leading-5">
                    {car.extraInfo}
                </div>
            </div>
        </div>
    );
}