import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage(){
    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios.get('/cars').then(response => {
            setCars([...response.data]);
        })
    }, [])

    return (
        <div>
            <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {cars.length > 0 && cars.map(car => (
                    <div key={car._id}>
                        <div className="bg-gray-200 mb-2 rounded-2xl flex">
                            {car.photos?.[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+car.photos?.[0]} alt="" />
                            )}
                        </div>
                        <h2 className="text-lg font-bold leading-4">{car.title}</h2>
                        <h3 className="text-md">{car.engineType}</h3>
                        <div className="mt-2">
                            {car.price} PLN za dzień<span className="text-red-600 font-semibold">*</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <h3 className="text-red-600 font-semibold">* - cena jest wartością bazową, która może ulec zmianie w trakcie rezerwacji pojazdu.</h3>
            </div>
        </div>
    );
}