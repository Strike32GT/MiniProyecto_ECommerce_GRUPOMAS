import React from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CarritoSidebar({ abierto, onClose }) {
    const { carrito } = useCart();

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
                                </div>

                                <span className="font-bold">
                                    S/ {item.precio * item.cantidad}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
