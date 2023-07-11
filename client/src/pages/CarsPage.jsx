import { useState } from "react";
import {Link, useParams} from "react-router-dom";
import Features from "../Features";

export default function CarsPage(){
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [engineType, setEngineType] = useState('');
    const [gearBoxType, setGearBoxType] = useState('');
    const [prodYear, setProdYear] = useState('');
    const [seats, setSeats] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [kilLimit, setKilLimit] = useState('');

    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    };

    function inputDiscription(text){
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    };

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDiscription(description)}
            </>
        );
    };

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/cars/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Dodaj nowy samochód
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Nazwa samochodu', 'Pole to powinno przedstawić markę, model oraz generację samochodu.')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="np.: Volkswagen Golf 4"/>

                        {preInput('Silnik', 'Rodzaj silnika, pojemność oraz moc wyrażaną w kW.')}
                        <input type="text" value={engineType} onChange={ev => setEngineType(ev.target.value)} placeholder="np.: Benzynowy 1.4 55kW"/>

                        {preInput('Skrzynia biegów', 'Rodzaj skrzyni biegów, opcjonalnie: ilość biegów.')}
                        <input type="text" value={gearBoxType} onChange={ev => setGearBoxType(ev.target.value)} placeholder="np.: Manualna 5-biegowa"/>

                        {preInput('Rocznik', 'Rok produkcji samochodu.')}
                        <input type="number" value={prodYear} onChange={ev => setProdYear(ev.target.value)} max="2023" min="1980" placeholder="np.: 2020"/>

                        {preInput('Liczba siedzeń', 'Maksymalna ilość miejsc w samochodzie.')}
                        <input type="number" value={seats} onChange={ev => setSeats(ev.target.value)} max="9" min="1" placeholder="np.: 5"/>

                        {preInput('Zdjęcia', 'Im więcej, tym lepiej.')}
                        <div className="flex gap-2">
                            <input 
                                value={photoLink}
                                onChange={ev => setPhotoLink(ev.target.value)}
                                type="text" placeholder={'Dodaj używając URL ... .jpg'}/>
                            <button className="bg-gray-200 px-4 rounded-2xl">Dodaj&nbsp;zdjęcie</button>
                        </div>
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <button className="flex gap-2 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                Dodaj z dysku...
                            </button>    
                        </div>

                        {preInput('Opis', 'Opcjonalny opis samochodu.')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                        {preInput('Wyposażenie', 'Zaznacz wszystkie elementy wyposażenia.')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Features selected={features} onChange={setFeatures}/>
                        </div>

                        {preInput('Informacje dodatkowe', 'Dodatkowe informacje dotyczące tego pojazdu.')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} placeholder="np.: Pojazd przystosowany do przewozu osób niepełnosprawnych."/>

                        {preInput('Dzienny limit kilometrów', 'Maksymalna dzienna ilość kilometrów zwolnionych z dodatkowych opłat.')}
                        <input type="number" value={kilLimit} onChange={ev => setKilLimit(ev.target.value)} max="9999" min="1" placeholder="np.: 500"/>

                        <button className="primary my-4">Zapisz i dodaj</button>
                    </form>
                </div>
            )}
        </div>
    );
}