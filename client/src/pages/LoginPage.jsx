import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="mt-5 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="mb-4 text-center text-4xl">Logowanie</h1>
                <form className="mx-auto max-w-md">
                    <input type="email" placeholder="twój@email.com" />
                    <input type="password" placeholder="hasło" />
                    <button className="primary">Zaloguj się</button>
                    <div className="text-center py-2 text-gray-500">
                        Nie masz konta? <Link className="underline text-black" to={'/register'}>Zarejestruj się</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}