import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {UserContext} from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleLogin(ev) {
        ev.preventDefault();
        try {
            const {data} = await axios.post('/login', {email, password});
            if(data){
                setUser(data);
                alert('Logowanie udane.');
                setRedirect(true);
            } else {
                throw e;
            }
        } catch (e) {
            alert('Logowanie nieudane.')
        }
    };

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-5 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="mb-4 text-center text-4xl">Logowanie</h1>
                <form className="mx-auto max-w-md" onSubmit={handleLogin}>
                    <input type="email" required placeholder="twój@email.com"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" required placeholder="hasło"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary">Zaloguj się</button>
                    <div className="text-center py-2 text-gray-500">
                        Nie masz konta? <Link className="underline text-black" to={'/register'}>Zarejestruj się</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}