import React, { useState, useEffect } from "react"
import { User, ShoppingCart, Package } from "lucide-react"
import { useCart } from "../context/CartContext";
import CarritoSidebar from "./CarritoSidebar";
import HistorialSidebar from "./HistorialSidebar";
import { obtenerPedidosUsuario } from "../api/pedidosApi";
import { useNavigate } from "react-router-dom";

export default function Nav({ onChangeTipo }) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const { totalItems } = useCart();
    const [abrirCarrito, setAbrirCarrito] = useState(false);
    const [abrirHistorial, setAbrirHistorial] = useState(false);
    const [tieneHistorial, setTieneHistorial] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarHistorial = async () => {
            if (!usuario) {
                setTieneHistorial(false);
                return;
            }
            try {
                const pedidos = await obtenerPedidosUsuario(usuario.id);

                setTieneHistorial(pedidos.length > 1);
            } catch (err) {
                console.error("Error obteniendo historial", err);
                setTieneHistorial(false);
            }
        };

        cargarHistorial();
    }, [usuario]);
    return (
        <nav className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-4 px-8 flex items-center justify-between shadow-md">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">LibroVerse</h1>

            <div className="hidden md:flex items-center gap-6 text-white font-medium">
                <button className="hover:text-gray-300 cursor-pointer" onClick={() => onChangeTipo(null)}>Libros</button>
                <button className="hover:text-gray-300 cursor-pointer" onClick={() => onChangeTipo(3)}>Mangas</button>
                <button className="hover:text-gray-300 cursor-pointer" onClick={() => onChangeTipo(2)}>Comics</button>
            </div>

            <div className="flex gap-5 text-white">

                {usuario && (<span className="text-sm font-semibold mr-2">
                    Bienvenido, {usuario.nombre_completo}
                </span>)}


                {tieneHistorial && (
                    <button
                        className="flex items-center gap-1 cursor-pointer hover:text-gray-200 text-sm"
                        onClick={() => setAbrirHistorial("/historial")}
                    >
                        <Package size={20} />
                        <span>Historial</span>
                    </button>
                )}

                <User className="cursor-pointer hover:text-gray-300" size={22} />
                <div className="relative cursor-pointer hover:text-gray-300"
                    onClick={() => setAbrirCarrito(true)}>
                    <ShoppingCart size={22} />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full px-2">{totalItems}</span>
                    )}
                </div>
            </div>
            <CarritoSidebar abierto={abrirCarrito} onClose={() => setAbrirCarrito(false)} />
            <HistorialSidebar abierto={abrirHistorial} onClose={() => setAbrirHistorial(false)} usuario={usuario} />
        </nav>
    );
}