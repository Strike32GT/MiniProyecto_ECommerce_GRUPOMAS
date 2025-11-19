import React, { useState } from "react";
import { Book, Calendar, Globe, Heart, Minus, Plus, Share, ShoppingCart, Star, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function DetalleLibro({ libro, onClose }) {

    const { agregarAlCarrito } = useCart();

    const [activeTab, setActiveTab] = useState("descripcion");
    const [cantidad, setCantidad] = useState(1);

    const aumentar = () => {
        if(cantidad <libro.cantidad_disponible){
            setCantidad(cantidad+1);
        }
    };

    const disminuir =() => {
        if( cantidad >1 ){
            setCantidad(cantidad -1);
        }
    };

    const handleCarrito = () => {
        agregarAlCarrito(libro,cantidad);
        onClose();
    };


    if (!libro) return null;


    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
            <div className="bg-white w-[90%] max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl animate-fadeIn relative">


                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">

                    <div className="flex flex-col">
                        <img src={libro.imagen} alt={libro.nombre} className="w-full rounded-xl object-cover shadow-md" />

                        <div className="flex gap-4 mt-4">
                            <button className="flex-1 flex items-center justify-center gap-2 border rounded-full py-2">
                                <Heart size={18} />
                                Me gusta
                            </button>

                            <button className="flex-1 flex items-center justify-center gap-2 border rounded-full py-2">
                                <Share size={18} />
                                Compartir
                            </button>
                        </div>
                    </div>

                    <div>
                        <span className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm">
                            {libro.categoria_nombre || "Categoria"}
                        </span>

                        <h2 className="text-2xl font-bold mt-3">{libro.nombre}</h2>

                        <p className="text-gray-700 mt-1">
                            por <span className="text-orange-600 font-semibold">{libro.autor || "Autor Desconocido"}</span>
                        </p>

                        <div className="flex items-center gap-2 mt-3 bg-yellow-50 px-4 py-2 rounded-full w-fit">
                            {Array.from({ length: Math.floor(libro.clasificacion || 4) }).map((_, i) => (
                                <Star key={i} size={18} className="text-yellow-500" />
                            ))}
                            <span className="font-semibold">{libro.clasificacion || "4.5"}</span>
                        </div>

                        <div className="mt-5 bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-xl">
                            <h3 className="text-4xl font-bold text-red-600">S/ {libro.precio_final || libro.precio} </h3>
                            <p className="text-green-600 font-medium mt-1">
                                Disponible Envio Gratis en pedidos + S/50
                            </p>
                        </div>

                        <div className="flex items-center gap-4 mt-5">
                            <span className="font-medium">Cantidad: </span>

                            <div className="flex items-center gap-4 border rounded-full px-4 py-2">
                                <Minus size={18} onClick={disminuir} className="cursor-pointer" />
                                <span>{cantidad}</span>
                                <Plus size={18} onClick={aumentar} className="cursor-pointer" />
                            </div>
                        </div>

                        <button onClick={handleCarrito} className="mt-6 w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-full text-lg font-semibold flex items-center justify-center gap-2 shadow hover:opacity-95">
                            <ShoppingCart size={20} />
                            Agregar al Carrito S/ {libro.precio_final || libro.precio}
                        </button>

                        <div className="mt-8">
                            <div className="flex gap-3">

                                <button onClick={() => setActiveTab("descripcion")} className={`px-5 py-2 rounded-full font-medium shadow ${activeTab === "descripcion" ? "bg-gradient-to-r from-orange-400 to-red-500 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                                    Descripcion
                                </button>

                                <button onClick={() => setActiveTab("especificaciones")} className={`px-5 py-2 rounded-full font-medium shadow ${activeTab === "especificaciones" ? "bg-gradient-to-r from-orange-400 to-red-500 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                                    Especifiaciones
                                </button>
                            </div>

                            <div className="mt-5 bg-gray-50 p-6 rounded-xl">
                                {activeTab === "descripcion" && (<p className="text-gray-700 leading-relaxed">{libro.descripcion || "Este libro no tiene descripcion"}</p>)}

                                {activeTab === "especificaciones" && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">

                                        <div className="flex items-start gap-3">
                                            <Book className="text-orange-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Paginas</p>
                                                <p className="font-semibold">{libro.paginas || "-"}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Calendar className="text-orange-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Year</p>
                                                <p className="font-semibold">{libro.year_publicacion || "-"}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Globe className="text-orange-500"/>
                                            <div>
                                                <p className="text-sm text-gray-500">Idioma</p>
                                                <p className="font-semibold">{libro.idioma || "-"}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Globe className="text-orange-500"/>
                                            <div>
                                                <p className="text-sm text-gray-500">Editorial</p>
                                                <p className="font-semibold">{libro.editorial || "-"}</p>
                                            </div>
                                        </div>


                                    </div>
                                )}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}