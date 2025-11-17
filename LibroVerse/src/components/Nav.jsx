import React from "react"
import { User, ShoppingCart } from "lucide-react"

export default function Nav() {
    return (
        <nav className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-4 px-8 flex items-center justify-between shadow-md">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">LibroVerse</h1>

            <div className="hidden md:flex items-center gap-6 text-white font-medium">
                <button className="hover:text-gray-300 cursor-pointer">Libros</button>
                <button className="hover:text-gray-300 cursor-pointer">Mangas</button>
                <button className="hover:text-gray-300 cursor-pointer">Comics</button>
            </div>

            <div className="flex gap-5 text-white">
                {/*Icons*/}
                <User className="cursor-pointer hover:text-gray-300" size={22} />
                <ShoppingCart className="cursor-pointer hover:text-gray-300" size={22} />
            </div>
        </nav>
    );
}