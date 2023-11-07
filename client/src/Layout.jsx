import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(){
    return (
        <div>
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