import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, redirect, useParams } from "react-router-dom";
import axios from "axios";

export default function AccountPage(){
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


    function linkClasses(type=null){
        let classes = 'py-2 px-6';
        if(type === subpage){
            classes += ' bg-primary text-white rounded-full';
        }
        return classes;
    }

    if (toIndex) {
        return <Navigate to={toIndex} />
    }
    return(
       <div>
            <nav className="w-full flex mt-8 gap-2 justify-center mb-8">
                <Link className={linkClasses('profile')} to={'/account'}>Moje konto</Link>
                <Link className={linkClasses('rental')} to={'/account/rental'}>Mój wynajem</Link>
                <Link className={linkClasses('cars')} to={'/account/cars'}>Moje samochody</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-xl mx-auto">
                    Zalogowany jako {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Wyloguj się</button>
                </div>
            )}
        </div>
    )
}