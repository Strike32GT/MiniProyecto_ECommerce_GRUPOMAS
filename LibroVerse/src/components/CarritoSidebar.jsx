import React, { useState } from "react";
import { X, Trash } from "lucide-react";
import { useCart } from "../context/CartContext";
import PasarelaPago from "./PasarelaPago";

export default function CarritoSidebar({ abierto, onClose }) {
    const { carrito, setCarrito } = useCart();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const [mostrarPasarela, setMostrarPasarela] = useState(false);


    const handleConfirmarCompra = async () => {
        if (!usuario) {
            alert("Debes iniciar sesion");
            return;
        }

        const itemsFormartoBackend = carrito.map(item => ({
            libro_id: item.id,
            cantidad: item.cantidad,
        }));

        try {
            const data = await crearPedido(itemsFormartoBackend, usuario.id);
            alert(`Compra realizada con exito. Total: S/ ${data.total}`);

            setCarrito([]);
            onClose();
        } catch (error) {
            alert("Error al procesar la compra " + JSON.stringify(error));
        }
    };

    const handleAbrirPasarela = () => {

        if (!usuario) {
            alert("Debes iniciar sesion");
            return;
        }

        if (carrito.length === 0) {
            alert("Tu carrito esta vacio");
            return;
        }

        setMostrarPasarela(true);
    };

    const handleEliminarItem = (id) => {
        const nuevoCarrito = carrito.filter(item => item.id !== id);
        setCarrito(nuevoCarrito);
    };

    return (
        <>
            {abierto && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    onClick={onClose}
                ></div>
            )}

            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 p-5 transition-transform duration-300 
                ${abierto ? "translate-x-0" : "translate-x-full"}`}
            >
                <button
                    className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full"
                    onClick={onClose}
                >
                    <X size={22} />
                </button>

                <h2 className="text-2xl font-bold mb-6 mt-4">Tu Carrito</h2>

                {carrito.length === 0 ? (
                    <p className="text-gray-500">Tu carrito esta vacío</p>
                ) : (
                    <>
                        <ul className="space-y-4">
                            {carrito.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex justify-between items-center border-b pb-2"
                                >
                                    <div>
                                        <p className="font-semibold">{item.nombre}</p>
                                        <p className="text-sm text-gray-500">
                                            Cantidad: {item.cantidad}
                                        </p>
                                        <span className="font-bold">
                                            S/ {item.precio * item.cantidad}
                                        </span>
                                    </div>

                                    <button onClick={() => handleEliminarItem(item.id)} className="p-2 hover:bg-red-100 rounded-full">
                                        <Trash size={20} className="text-red-600" />
                                    </button>


                                </li>
                            ))}
                        </ul>

                        <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700" onClick={handleAbrirPasarela}>
                            Confirmar Compra
                        </button>
                    </>
                )}
            </div>

            {mostrarPasarela && (
                <PasarelaPago
                    abierto={mostrarPasarela}
                    onClose={() => {
                        setMostrarPasarela(false);
                        onClose(); 
                    }}
                    usuario={usuario}
                />
            )}
        </>
    );
}
