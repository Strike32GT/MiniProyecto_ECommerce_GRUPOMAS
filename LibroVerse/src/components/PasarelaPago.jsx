import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { confirmarPagoPedido, crearPedidoPendiente, enviarCodigoPago } from "../api/pedidosApi";
import { useCart } from "../context/CartContext";

export default function PasarelaPago({ abierto, onClose, usuario }) {
    const { carrito, setCarrito } = useCart();
    const [pedidoId, setPedidoId] = useState(null);
    const [pedidoCreado, setPedidoCreado] = useState(false);
    const [metodo, setMetodo] = useState(null);
    const [correo, setCorreo] = useState("");
    const [codigoReal, setCodigoReal] = useState(null);
    const [codigoIngresado, setCodigoIngresado] = useState("");
    const [codigoEnviado, setCodigoEnviado] = useState(false);
    const [cargando, setCargando] = useState(false);

    const total = useMemo(
        () =>
            carrito.reduce((acc, item) => {
                const precioUnitario =
                    item.descuento && item.descuento > 0
                        ? item.precio_final
                        : item.precio;
                return acc + precioUnitario * item.cantidad;
            }, 0),
        [carrito]
    );

    useEffect(() => {
        if (!abierto || !usuario || carrito.length === 0) return;
        if (pedidoCreado) return;

        const crear = async () => {
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
    }, [abierto, usuario, carrito, onClose, pedidoCreado]);

    if (!abierto) return null;


    const handleEnviarCodigo = async () => {
        if (!correo || !correo.includes("@")) {
            alert("Ingresa un correo válido");
            return;
        }
        try {
            await enviarCodigoPago(pedidoId, correo);
            setCodigoEnviado(true);
            setCodigoIngresado("");
            alert(`Se envió un código de compra a ${correo}`);
        } catch (err) {
            alert("Error al enviar el código");
        }
    };



    const handleConfirmarConCodigo = async () => {
        if (!codigoEnviado) {
            alert("Primero debes solicitar el código");
            return;
        }

        if (!codigoIngresado) {
            alert("Ingresa el código recibido");
            return;
        }

        try {
            setCargando(true);
            const pedidoPagado = await confirmarPagoPedido(
                pedidoId,
                metodo,
                codigoIngresado
            );
            alert(`Pago exitoso. Total S/ ${pedidoPagado.total} - Método: ${pedidoPagado.metodo_pago}`);
            setCarrito([]);
            onClose();
        } catch (err) {
            alert("Código incorrecto o error al confirmar pago");
        } finally {
            setCargando(false);
        }
    };


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

        try {
            setCargando(true);
            const pedidoPagado = await confirmarPagoPedido(pedidoId, metodo);
            alert(
                `Pago exitoso. Total S/ ${pedidoPagado.total} - Método: ${pedidoPagado.metodo_pago}`
            );
            setCarrito([]);
            onClose();
        } catch (error) {
            alert("Error al confirmar el pago");
        } finally {
            setCargando(false);
        }
    };

    const MetodoButton = ({ value, label, icon }) => (
        <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border mb-3 ${metodo === value
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:bg-gray-50"
                }`}
            onClick={() => setMetodo(value)}
        >
            <img
                src={icon}
                alt={label}
                className="w-7 h-7 rounded-md object-contain"
            />
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-xl rounded-2xl shadow-xl relative p-6">
                <button
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-1">Finalizar Compra</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Selecciona tu método de pago
                </p>

                {metodo === "YAPE" ? (

                    <>
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white mb-3">
                                <span className="text-2xl">▩</span>
                            </div>
                            <h3 className="text-lg font-semibold">
                                Escanea el código QR
                            </h3>
                            <p className="text-sm text-gray-500">
                                Usa tu app de Yape para escanear y completar el pago
                            </p>
                        </div>

                        <div className="w-full border rounded-2xl bg-gray-50 flex items-center justify-center py-6 mb-6">
                            <img
                                src="/yape_prueba.png"
                                alt="QR Yape"
                                className="w-40 h-40 object-contain"
                            />
                        </div>

                        <button
                            className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-full text-lg font-semibold shadow mb-3 disabled:opacity-60"
                            onClick={handleConfirmar}
                            disabled={cargando}
                        >
                            {cargando ? "Procesando..." : "Ya realicé el pago"}
                        </button>

                        <button
                            className="w-full border border-gray-300 text-gray-700 py-2 rounded-full text-sm"
                            onClick={() => setMetodo(null)}
                        >
                            Cambiar método de pago
                        </button>

                        <div className="mt-5 p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm font-semibold text-gray-600 mb-2">
                                Resumen del Pedido
                            </p>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>S/ {total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-base font-bold mt-2">
                                <span>Total</span>
                                <span className="text-orange-600">
                                    S/ {total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </>
                ) : (

                    <>
                        <h3 className="font-semibold mb-2">Métodos de Pago</h3>

                        <MetodoButton
                            value="EFECTIVO"
                            label="Pago Efectivo"
                            icon="/pago_efectivo.png"
                        />
                        <MetodoButton value="YAPE" label="Yape" icon="/yape.png" />
                        <MetodoButton
                            value="PAYPAL"
                            label="PayPal"
                            icon="/paypal.png"
                        />

                        {metodo === "EFECTIVO" || metodo === "PAYPAL" ? (
                            <>
                                <div className="mt-6 flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                                        <span className="text-green-500 text-xl">@</span>
                                    </div>
                                    <h4 className="font-semibold">Ingresa tu correo</h4>
                                    <p className="text-sm text-gray-500 text-center px-4">
                                        Te enviaremos el código de compra para completar
                                        el pago en{" "}
                                        {metodo === "EFECTIVO" ? "efectivo" : "PayPal"}.
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <label className="text-sm font-medium text-gray-700">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        placeholder="tu@email.com"
                                        className="mt-1 w-full border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
                                    />
                                </div>

                                {!codigoEnviado ? (
                                    <button
                                        className="mt-4 w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-full text-lg font-semibold shadow disabled:opacity-60"
                                        onClick={handleEnviarCodigo}
                                    >
                                        Enviar código
                                    </button>
                                ) : (
                                    <>
                                        <div className="mt-5">
                                            <h4 className="font-semibold text-center mb-2">
                                                Código enviado
                                            </h4>
                                            <p className="text-xs text-gray-500 text-center mb-3">
                                                Hemos enviado el código de compra a:{" "}
                                                <span className="text-orange-600 font-semibold">
                                                    {correo}
                                                </span>
                                            </p>
                                            <input
                                                type="text"
                                                value={codigoIngresado}
                                                onChange={(e) =>
                                                    setCodigoIngresado(e.target.value)
                                                }
                                                placeholder="Ingresa el código recibido"
                                                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
                                            />
                                        </div>

                                        <button
                                            className="mt-4 w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-full text-lg font-semibold shadow disabled:opacity-60"
                                            onClick={handleConfirmarConCodigo}
                                            disabled={cargando}
                                        >
                                            {cargando
                                                ? "Procesando..."
                                                : "Confirmar compra"}
                                        </button>

                                        <button
                                            className="mt-2 w-full border border-gray-300 text-gray-700 py-2 rounded-full text-sm"
                                            onClick={() => {
                                                setCodigoEnviado(false);
                                                setCodigoReal(null);
                                                setCodigoIngresado("");
                                            }}
                                        >
                                            Reintentar
                                        </button>
                                    </>
                                )}

                                <div className="mt-5 p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm font-semibold text-gray-600 mb-2">
                                        Resumen del Pedido
                                    </p>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span>S/ {total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-bold mt-2">
                                        <span>Total</span>
                                        <span className="text-orange-600">
                                            S/ {total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className="mt-3 w-full border border-gray-300 text-gray-700 py-2 rounded-full text-sm"
                                    onClick={() => {
                                        setMetodo(null);
                                        setCodigoEnviado(false);
                                        setCodigoReal(null);
                                        setCodigoIngresado("");
                                    }}
                                >
                                    Cambiar método de pago
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="text-2xl font-bold text-orange-600">
                                        S/ {total.toFixed(2)}
                                    </p>
                                </div>

                                <button
                                    className="mt-5 w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-full text-lg font-semibold shadow disabled:opacity-60"
                                    onClick={handleConfirmar}
                                    disabled={cargando || !metodo}
                                >
                                    {cargando ? "Procesando..." : "Confirmar pago"}
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}