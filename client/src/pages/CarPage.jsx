import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CarPage(){
    const {id} = useParams();
    const [car, setCar] = useState(null);
    const [showAllImages, setShowAllImages] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/cars/${id}`).then(response => {
            setCar(response.data);
        });
    }, [id]);

    if (!car) return '';

    if(showAllImages) {
        window.scrollTo(0, 0);
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mb-4">Galeria zdjęć samochodu: {car.title}</h2>
                        <button onClick={() => {
                            const closeButton = document.getElementById("close-button");
                            setShowAllImages(false);
                            if (closeButton){
                                window.scroll(0, closeButton.offsetTop);
                            };
                        }} className="fixed right-12 top-8 hover:text-gray-500 flex gap-2 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            Zamknij galerię
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    {car?.photos?.length > 0 && car.photos.map(photo => (
                        <div key={photo}>
                            <img className="w-full" src={'http://localhost:4000/uploads/'+photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl"><span className="font-semibold">Samochód: </span>{car.title}</h1>
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

            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr]">
                    <div>
                        {car.photos?.[0] && (
                            <div>
                                <img className="w-full aspect-square object-cover" src={'http://localhost:4000/uploads/'+car.photos[0]} alt="" />
                            </div>       
                        )}
                    </div>
                    <div className="grid">
                        {car.photos?.[1] && (
                            <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/'+car.photos[1]} alt="" />
                        )}
                        <div className="overflow-hidden">
                            {car.photos?.[2] && (
                                <img className="aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads/'+car.photos[2]} alt="" />
                            )}
                        </div>
                    </div>
                </div>
                <button id="close-button" onClick={() => setShowAllImages(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                    </svg>
                    Pokaż więcej zdjęć
                </button>
            </div>
            <div className="my-4 grid gap-4 border border-gray-300 px-8 py-2">
                <h2 className="text-2xl">Opis:</h2>
                <p className="">{car.description}</p>
            </div>
        </div>
    );
}