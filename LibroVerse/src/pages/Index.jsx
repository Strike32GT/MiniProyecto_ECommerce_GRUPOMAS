import React, { useEffect, useState } from "react";
import { ChevronDown, Search, ShoppingCart, Star, User } from "lucide-react";
import Nav from "./../components/Nav";
import { getLibros } from "../api/librosApi";
import DetalleLibro from "../components/DetalleLibro";

export default function Index() {

    const [productos, setProductos] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState("Orden Predeterminado");

    const [selectedBook, setSelectedBook] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() =>{
        (async ()=> {
            await cargarLibros();
        })();
    }, []);


    const cargarLibros = async (orden = null) => {
        setLoading(true);

    try {
      const data = await getLibros(orden); 
      setProductos(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error al obtener libros", error);
    } finally {
      setLoading(false);
    }
    };

    const handleOrder = async (label, orden) => {
    setSelectedOrder(label);
    setShowMenu(false);
    await cargarLibros(orden); 
  };

  const handleSearch = (value) => {
    setSearch(value);

    const results = productos.filter((item) =>
        item.nombre.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(results);
  }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFF8E8] flex items-center justify-cente">
                <p>Cargando Libros...</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#FFF8E8]">

            <Nav/>

            <div className="max-w-3xl mx-auto mt-8 px-4">
                <div className="flex items-center bg-white shadow-md rounded-full px-4 py-3">
                    <Search className="text-gray-500" size={20} />
                    <input type="text" placeholder="Buscar libros, mangas o comics" value={search} onChange={(e) => handleSearch(e.target.value)} className="ml-3 w-full outline-none" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-10 px-6">

                <h2 className="text-xl font-semibold text-red-600">Descubre tu Proxima Lectura</h2>

                <p className="text-gray-600 mb-4">{productos.length} Productos disponibles</p>



                <div className="relative flex justify-end mb-4">
                    <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow hover:bg-gray-100"
                    onClick={()=>setShowMenu(!showMenu)}>
                        <ChevronDown size={18} />
                        {selectedOrder}
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-xl p-3 z-30">
                            <button 
                                onClick={() => handleOrder("A - Z (Nombre)", "nombre")}
                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                            >
                                A - Z (Nombre)
                            </button>


                            <button 
                                onClick={() => handleOrder("Z - A (Nombre)", "-nombre")}
                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                            >
                                Z - A (Nombre)
                            </button>

                            <button 
                                onClick={() => handleOrder("Precio: menor → mayor", "precio_final")}
                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                            >
                                Precio: menor → mayor
                            </button>

                            <button 
                                onClick={() => handleOrder("Precio: mayor → menor", "-precio_final")}
                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                            >
                                Precio: mayor → menor
                            </button>

                            <button 
                                onClick={() => handleOrder("Más recientes", "-year_publicacion")}
                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                            >
                                Más recientes
                            </button>

                            <button 
                                onClick={() => handleOrder("Más antiguos", "year_publicacion")}
                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
                            >
                                Más antiguos
                            </button>

                            </div>
                    )}
                </div>



                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {filtered.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition"
                            onClick={() => {
                                setSelectedBook(item);
                                setShowModal(true);
                            }}
                            >
                            {item.imagen ? (
                                <img src={item.imagen} alt={item.nombre} className="w-full h-64 object-cover" />
                            ): (
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                                    <p className="text-gray-500">Sin Imagen</p>
                                </div>
                            )}
                            

                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{item.nombre}</h2>
                                <p className="text-sm text-gray-600">
                                    {item.categoria_nombre || "Sin Categoria"}
                                </p>
                                

                                <div className="flex items-center gap-1 mt-2 text-yellow-40">
                                    {Array.from({ length: Math.floor(item.calificacion || 0)}).map((_, i) => (
                                        <Star key={i} size={16}/>
                                    ))}
                                </div>


                                <div className="mt-3">
                                    {item.descuento > 0 ? (
                                        <>
                                            <p className="line-through text-gray-500 text-sm">S/ {item.precio}</p>
                                            <p className="text-2xl font-bold text-green-600">
                                                S/ {item.precio_final}
                                            </p>
                                            <p className="text-red-500 font-semibold text-sm">
                                                -{item.descuento}%
                                            </p>
                                        </>
                                    ) : (
                                    <p className="text-2xl font-bold text-green-600">S/ {item.precio}</p>
                                )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            
            {showModal && (
                    <DetalleLibro libro={selectedBook}
                    onClose={() =>setShowModal(false)}/>
            )}
            
        </div>
    );
}