import { useState } from "react";
import {differenceInCalendarDays} from "date-fns";

export default function BookingWidget({car}){
    const [collectCar, setCollectCar] = useState('');
    const [returnCar, setReturnCar] = useState('');
    let numberOfDays = 0;
    if (collectCar && returnCar) {
        numberOfDays = differenceInCalendarDays(new Date(returnCar), new Date(collectCar)) + 1;
    };

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
                    <div className="">
                        TU BĘDZIE MAPA
                    </div>
                )}
            </div>
            <button className="primary mt-4">
                Wynamij ten pojazd
                {numberOfDays > 0 && (
                    <span> [{numberOfDays * car.price} PLN]</span>
                )}
            </button>
        </div>
    )
}