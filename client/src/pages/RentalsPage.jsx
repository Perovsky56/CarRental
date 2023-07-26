import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";

export default function RentalsPage() {
    const [rentals, setRentals] = useState([]);
    useEffect(() => {
        axios.get('/rentals').then(response => {
            setRentals(response.data);
        })
    }, []);

    return (
        <div>
            <AccountNav />
            <div>
                {rentals?.length > 0 && rentals.map(rental => (
                    <div>
                        
                        {rental.collectCar} do {rental.returnCar}
                    </div>
                ))}
            </div>
        </div>
    );
}