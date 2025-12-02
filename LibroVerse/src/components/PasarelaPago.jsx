import React, { useEffect, useState, useMemo } from "react";
import {X} from "lucide-react";
import {confirmarPagoPedido, crearPedidoPendiente} from "../api/pedidosApi";
import { useCart } from "../context/CartContext";

export default function PasarelaPago({abierto,onClose,usuario }) {
    const { carrito, setCarrito } = useCart();
    const [pedidoId, setPedidoId] = useState(null);
    const [pedidoCreado, setPedidoCreado] = useState(false);
    const [metodo,setMetodo] = useState(null);
    const [cargando, setCargando] = useState(false);

    const total = useMemo(
        () => carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
        [carrito]
    );

    useEffect(() => {
        if (!abierto || !usuario || carrito.length === 0) return;
        if (pedidoCreado) return;

        const crear = async () =>{
            const itemsFormartoBackend = carrito.map((item) => ({
                libro_id: item.id,
                cantidad: item.cantidad,
            }));

            try {
                const data = await crearPedidoPendiente(itemsFormartoBackend, usuario.id);
                setPedidoId(data.pedido_id);
                setPedidoCreado(true);
            } catch (error) {
                alert("Error al crear el pedido pendiente");
                onClose();
            }
        };

        crear();
    }, [abierto, usuario, carrito, onClose]);

    if(!abierto) return null;

    const handleConfirmar = async () => {
        if (!metodo) {
            alert("Selecciona un metodo de Pago");
            return;
        }

        if (!usuario) {
            alert("Debes iniciar sesion");
            return;
        }

        if (!pedidoId) {
            alert("No se pudo crear el pedido");
            return;
        }


        try{
            setCargando(true);
            const pedidoPagado = await confirmarPagoPedido(pedidoId , metodo);
            alert(`Pago exitoso. Total S/ ${pedidoPagado.total} - Método: ${pedidoPagado.metodo_pago}`);
            setCarrito([]);
            onClose();
        } catch (error) {
             alert("Error al confirmar el pago");
        } finally {
            setCargando(false);
        }
    };

    const MetodoButton = ({value, label, icon }) => (
        <button className={`w-full text-left px-4 py-3 rounded-xl border mb-3 ${metodo === value ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:bg-gray-50"}`} onClick={() => setMetodo(value)}>
            <img src={icon} alt={label} className="w-7 h-7 rounded-md object-contain" />
            <span className="font-medium">{label}</span>
        </button>
    );

    return(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-xl rounded-2xl shadow-xl relative p-6">
                <button
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-1">Finalizar Compra</h2>
                <p className="text-sm text-gray-500 mb-4">Selecciona tu método de pago</p>

                <h3 className="font-semibold mb-2">Métodos de Pago</h3>

                <MetodoButton value="EFECTIVO" label="Pago Efectivo" icon="/pago_efectivo.png" />
                <MetodoButton value="YAPE" label="Yape" icon="/yape.png" />
                <MetodoButton value="PAYPAL" label="PayPal" icon="/paypal.png" />

                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-2xl font-bold text-orange-600">S/ {total.toFixed(2)}</p>
                </div>

                <button
                    className="mt-5 w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-full text-lg font-semibold shadow disabled:opacity-60"
                    onClick={handleConfirmar}
                    disabled={cargando}
                >
                    {cargando ? "Procesando..." : "Confirmar pago"}
                </button>
            </div>
        </div>
    );
}