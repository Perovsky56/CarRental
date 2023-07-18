import PhotosUploader from "../PhotosUploader";
import Features from "../Features";
import { useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";

export default function CarsFormPage(){
    const [title, setTitle] = useState('');
    const [engineType, setEngineType] = useState('');
    const [gearBoxType, setGearBoxType] = useState('');
    const [prodYear, setProdYear] = useState('');
    const [seats, setSeats] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [kilLimit, setKilLimit] = useState('');
    const [redirect, setRedirect] = useState(false);

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

    async function addNewCar(ev) {
        ev.preventDefault();
        await axios.post('/cars', {
            title, engineType, gearBoxType, prodYear,
            seats, addedPhotos, description,
            features, extraInfo, kilLimit
        });
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to={'/account/cars'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={addNewCar}>
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
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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
    );
};