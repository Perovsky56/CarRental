import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, redirect, useParams } from "react-router-dom";
import axios from "axios";
import CarsPage from "./CarsPage";
import AccountNav from "../AccountNav";

export default function ProfilePage(){
    const [toIndex, setToIndex] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);

    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setToIndex('/');
        setUser(null);
    }

    if(!ready) {
        return "Wczytywanie...";
    }

    if (ready && !user && !toIndex){
        return <Navigate to={'/login'} />
    }

    if (toIndex) {
        return <Navigate to={toIndex} />
    }


    return(
       <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-xl mx-auto">
                    Zalogowany jako {user.adminFlag ? 'administrator' : 'użytkownik'} {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Wyloguj się</button>
                </div>
            )}
            {subpage === 'cars' && (
                <CarsPage/>
            )}
        </div>
    )
}