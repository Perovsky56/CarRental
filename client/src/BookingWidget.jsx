import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function BookingWidget({car}){
    const [collectCar, setCollectCar] = useState('');
    const [returnCar, setReturnCar] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        setName(user.name);
    }, [user]);

    let numberOfDays = 0;
    if (collectCar && returnCar) {
        numberOfDays = differenceInCalendarDays(new Date(returnCar), new Date(collectCar)) + 1;
    };

    async function rentThisCar() {
        const response = await axios.post('/rentals', {
            collectCar, returnCar, name, mobile,
            car:car._id,
            price:numberOfDays * car.price,
        });
        const rentalId = response.data._id;
        setRedirect(`/account/rentals/${rentalId}`);
    };

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Cena bazowa: {car.price}PLN / za dzień
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="py-3 px-4">
                    <label>Odbiór: </label>
                    <input type="date"
                    value={collectCar}
                    onChange={ev => setCollectCar(ev.target.value)} />
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Zwrot: </label>
                    <input type="date"
                    value={returnCar}
                    onChange={ev => setReturnCar(ev.target.value)}/>
                </div>
                {numberOfDays > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Twoje imię oraz nazwisko:</label>
                        <input type="text"
                        placeholder="Jan Kowalski"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                        <label>Numer telefonu kontaktowego:</label>
                        <input type="tel"
                        placeholder="123456789"
                        value={mobile}
                        onChange={ev => setMobile(ev.target.value)} />
                    </div>
                )}
            </div>
            <button onClick={rentThisCar} className="primary mt-4">
                Wynamij ten pojazd
                {numberOfDays > 0 && (
                    <span> [{numberOfDays * car.price} PLN]</span>
                )}
            </button>
        </div>
    )
}