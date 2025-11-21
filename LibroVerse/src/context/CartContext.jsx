import {createContext, useContext, useState} from "react"

const CartContext = createContext();

export function CartProvider({ children }){
    const [carrito, setCarrito] = useState([]);
    const vaciarCarrito = () => setCarrito([]);

    const agregarAlCarrito = (libro, cantidad) => {

        const existente = carrito.find(item => item.id === libro.id);

        if(existente){
            setCarrito(carrito.map(item => item.id === libro.id ? {...item, cantidad: item.cantidad + cantidad } : item ));
        }

        else {
            setCarrito([...carrito, {...libro, cantidad}]);
        }
    };

    const totalItems = carrito.reduce((acc,item) => acc + item.cantidad, 0);

    return(
        <CartContext.Provider value={{carrito,agregarAlCarrito,totalItems, setCarrito}}>{children}</CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext)