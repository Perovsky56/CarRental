import { Link } from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(ev){
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Rejestracja udana. Możesz przejść do logowania.');
        } catch (e) {
            alert('Rejestracja nieudana. Spróbuj ponownie później.');
        }
    }

    return (
        <div className="mt-5 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="mb-4 text-center text-4xl">Rejestracja</h1>
                <form className="mx-auto max-w-md" onSubmit={registerUser}>
                    <input required type="text"
                        placeholder="imię nazwisko"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input required type="email"
                        placeholder="twój@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input required type="password"
                        placeholder="hasło"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary">Zarejestruj</button>
                    <div className="text-center py-2 text-gray-500">
                        Masz już konto? <Link className="underline text-black" to={'/login'}>Zaloguj się</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}