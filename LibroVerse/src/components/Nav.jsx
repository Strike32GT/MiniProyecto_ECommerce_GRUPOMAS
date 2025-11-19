import React, { useState } from "react"
import { User, ShoppingCart } from "lucide-react"
import { useCart} from "../context/CartContext";
import CarritoSidebar from "./CarritoSidebar";

export default function Nav() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const {totalItems} = useCart();
    const [abrirCarrito, setAbrirCarrito] = useState(false);

    return (
        <nav className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-4 px-8 flex items-center justify-between shadow-md">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">LibroVerse</h1>

            <div className="hidden md:flex items-center gap-6 text-white font-medium">
                <button className="hover:text-gray-300 cursor-pointer">Libros</button>
                <button className="hover:text-gray-300 cursor-pointer">Mangas</button>
                <button className="hover:text-gray-300 cursor-pointer">Comics</button>
            </div>

            <div className="flex gap-5 text-white">

                {usuario && (<span className="text-sm font-semibold mr-2">
                    Bienvenido, {usuario.nombre_completo}
                    </span>)}


                {/*Icons*/}
                <User className="cursor-pointer hover:text-gray-300" size={22} />
                <div className="relative cursor-pointer hover:text-gray-300"
                    onClick={() => setAbrirCarrito(true)}>
                    <ShoppingCart size={22} />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full px-2">{totalItems}</span>
                    )}
                </div>
            </div>
            <CarritoSidebar abierto={abrirCarrito} onClose={() => setAbrirCarrito(false)}/>
        </nav>
    );
}