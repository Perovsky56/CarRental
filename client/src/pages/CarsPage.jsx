import {Link, useParams} from "react-router-dom";
import AccountNav from "../AccountNav";

export default function CarsPage(){
    return (   
        <div>
            <AccountNav />
            <div className="text-center">
                lista wszystkich dodanych aut
                <br />
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/cars/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Dodaj nowy samochód
                </Link>
            </div>
        </div>
    );
}