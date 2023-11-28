import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout(){
    return (
        <div>
            <ToastContainer 
                position="top-center"
                autoClose={3000}
                newestOnTop={true}
            />
            <div className="py-4 px-8 flex-col flex min-h-screen">
                <Header />
                <Outlet />
            </div>
            <div className="max-h-screen">
                <Footer />
            </div>
        </div>

    )
}