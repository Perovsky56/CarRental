export default function Footer(){
    return (
        <div className="mt-12 bg-black pb-16">
            <div className="p-4">
                <h3 className="text-gray-400 px-8">UWAGA: Wyświetlana cena jest wartością bazową, która może ulec zmianie w trakcie rezerwacji pojazdu.</h3>
            </div>
            <div className="px-8">
                <hr className="border-orange-500"></hr>
            </div>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-[1fr_1fr] text-gray-500 p-4 text-xs">
                <div className="px-16">
                    <div>
                        <h4 className="text-lg py-4 text-gray-200">| carRental.</h4>
                        <div className="px-4 text-lg">
                            <p>Oferujemy szeroki wybór pojazdów dostępnych do wynajęcia.</p>
                            <p>Dostarczamy samochody na wybrane adresy przez całą dobę.</p>
                            <p>Rezerwuj już dziś i ciesz się komfortem podróżowania.</p>
                        </div>
                    </div>
                </div>
                <div className="px-16">
                    <div>
                        <h4 className="text-lg py-4 text-gray-200">| KONTAKT</h4>
                        <div className="px-4 text-lg">
                            <p>Adres: ul. Prószkowska 76, 46-020 Opole</p>
                            <p>Email: p.siemiginowski@student.po.edu.pl</p>
                            <p>Telefon: +48 123 456 789</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}