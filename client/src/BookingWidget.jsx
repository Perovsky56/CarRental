import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import BookingMap from "./BookingMap";
import { toast } from 'react-toastify';

export default function BookingWidget({car}){
    const [collectCar, setCollectCar] = useState('');
    const [returnCar, setReturnCar] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);
    const [isFormComplete, setIsFormComplete] = useState(true);
    const [bookingInfo, setBookingInfo] = useState({
        pickupCoordinates: null,
        returnCoordinates: null,
        totalDistance: 0,
        totalPrice: 0,
    });
    const [pickupCoordinates, setPickupCoordinates] = useState("");
    const [returnCoordinates, setReturnCoordinates] = useState("");

    useEffect(() => {
        if (user && user.name) {
            setName(user.name);
        }
    }, [user]);

    useEffect(() => {
        if ((collectCar > 0 && returnCar > 0) && (!name || !mobile)){
            setIsFormComplete(false);
        } else {
            setIsFormComplete(true);
        }
    }, [name, mobile])

    let numberOfDays = 0;
    if (collectCar && returnCar) {
        numberOfDays = differenceInCalendarDays(new Date(returnCar), new Date(collectCar)) + 1;
    };

    const handleUpdateBookingInfo = (info) => {
        setBookingInfo(info);
      };

    const priceFunction = () => {
        if (numberOfDays > 0 && bookingInfo.totalPrice > 0 && bookingInfo.pickupCoordinates && bookingInfo.returnCoordinates){
            return <span> [{(numberOfDays * car.price + bookingInfo.totalPrice).toFixed(2)} PLN]</span>
        } else if (numberOfDays > 0) {
            return <span> [{numberOfDays * car.price} PLN] </span>
        }
    }

    function handleDateChange(ev, setDate) {
        const selectedDate = new Date(ev.target.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const maxDate = addMonths(new Date(), 3);
        if (ev.target.value === '') {
            setDate('');
        } else if (selectedDate < today || selectedDate > maxDate) {
            setDate('');
            toast.error('Wybrana data jest niepoprawna lub nie mieści się w dostępnym terminie.');
        } else {
            setDate(ev.target.value);
        }
    }

    function addMonths(date, months) {
        date.setMonth(date.getMonth() + months);
        return date;
    }

    async function rentThisCar() {
        if (!name || !mobile || !collectCar || !returnCar){
            setIsFormComplete(false);
            return;
        }
    
        if (collectCar > returnCar){
            return;
        }
    
        let endPrice = numberOfDays * car.price;
        let pickupC = null;
        let returnC = null;
        let withTrans = false;

        if (bookingInfo.totalDistance !== 0){
            endPrice += bookingInfo.totalPrice;
        }
   
        if (bookingInfo.pickupCoordinates) {
            const latitude = bookingInfo.pickupCoordinates.lat;
            const longitude = bookingInfo.pickupCoordinates.lng;
            pickupC = `${latitude}, ${longitude}`;
        } else {
            endPrice = numberOfDays * car.price;
        }
    
        if (bookingInfo.returnCoordinates) {
            const latitude = bookingInfo.returnCoordinates.lat;
            const longitude = bookingInfo.returnCoordinates.lng;
            returnC = `${latitude}, ${longitude}`;
            withTrans = true;
        } else {
            endPrice = numberOfDays * car.price;
        }
    
        const response = await axios.post('/rentals', {
            collectCar, 
            returnCar, 
            name, 
            mobile,
            car: car._id,
            price: endPrice,
            withTransport: withTrans,
            pickupCoordinates: pickupC,
            returnCoordinates: returnC,
        });
    
        console.log(pickupC);
        console.log(returnC);
        
        const rentalId = response.data._id;
        setRedirect(`/account/rentals/${rentalId}`);
    };

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        user ? (
            <div className="bg-white shadow p-4 rounded-2xl">
                <div className="text-2xl text-center">
                    Cena bazowa: {car.price}PLN / za dzień
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="py-3 px-4">
                        <label>Odbiór: </label>
                        <input type="date"
                        min={new Date().toISOString().split('T')[0]}
                        max={addMonths(new Date(), 3).toISOString().split('T')[0]}
                        value={collectCar}
                        required
                        onChange={ev => handleDateChange(ev, setCollectCar)} />
                    </div>
                    <div className="py-3 px-4 border-t">
                        <label>Zwrot: </label>
                        <input type="date"
                        min={new Date().toISOString().split('T')[0]}
                        max={addMonths(new Date(), 3).toISOString().split('T')[0]}
                        value={returnCar}
                        required
                        onChange={ev => handleDateChange(ev, setReturnCar)}/>
                    </div>
                    {numberOfDays > 0 && (
                        <div>
                            <div className="py-3 px-4 border-t">
                                <label>Twoje imię oraz nazwisko:</label>
                                <input type="text"
                                placeholder="Jan Kowalski"
                                value={name}
                                required
                                onChange={ev => setName(ev.target.value)} />
                                <label>Numer telefonu kontaktowego:</label>
                                <input type="tel"
                                placeholder="123456789"
                                value={mobile}
                                required
                                onChange={ev => setMobile(ev.target.value)} />
                            </div>
                            <div className="py-3 px-4 border-t">
                                <BookingMap onUpdateBookingInfo={handleUpdateBookingInfo}/>
                            </div>
                        </div>
                    )}
                </div>
                {!isFormComplete && (
                    <div className="mt-2 text-red-500">
                        Uzupełnij poprawnie pola formularza.
                    </div>
                )}
                <button onClick={rentThisCar} className="primary mt-4">
                    Wynamij ten pojazd
                    {priceFunction()}
                </button>
            </div>
        ) : null
    );
}