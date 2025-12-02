import React, { useEffect, useState } from "react";
import { X, Package, Download } from "lucide-react";
import { obtenerPedidosUsuario } from "../api/pedidosApi";
import jsPDF from "jspdf";
import { obtenerDetallePedido } from "../api/pedidosApi";


export default function HistorialSidebar({ abierto, onClose, usuario }) {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (!abierto || !usuario) return;
        const cargar = async () => {
            setCargando(true);
            try {
                const data = await obtenerPedidosUsuario(usuario.id);
                setPedidos(data);
            } catch (err) {
                console.error("Error cargando historial", err);
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, [abierto, usuario]);

    if (!abierto) return null;


    const handleDescargarComprobante = async (pedido) => {
        try {
            const detalle = await obtenerDetallePedido(pedido.id);

            const doc = new jsPDF();
            let y = 20;

            doc.setFontSize(16);
            doc.text("Comprobante de Compra - LibroVerse", 10, y);
            y += 10;

            doc.setFontSize(12);
            doc.text(`Pedido #${detalle.id}`, 10, y);
            y += 6;
            doc.text(`Usuario: ${usuario?.nombre_completo || ""}`, 10, y);
            y += 6;
            doc.text(
                `Fecha: ${new Date(detalle.fecha).toLocaleString()}`,
                10,
                y
            );
            y += 10;

            doc.text(`Estado: ${detalle.estado}`, 10, y);
            y += 6;
            doc.text(`Método de pago: ${detalle.metodo_pago || "—"}`, 10, y);
            y += 10;

            doc.text("Items:", 10, y);
            y += 6;

            detalle.items.forEach((it) => {
                const linea = `- ${it.libro_nombre} x${it.cantidad}  S/ ${it.precio_total}`;
                doc.text(linea, 12, y);
                y += 6;
            });

            y += 4;
            doc.setFontSize(14);
            doc.text(`Total: S/ ${detalle.total}`, 10, y);

            doc.save(`comprobante_pedido_${detalle.id}.pdf`);
        } catch (e) {
            alert("No se pudo generar el comprobante");
            console.error(e);
        }
    };


    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={onClose}
            ></div>

            <div
                className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 p-5 transition-transform duration-300 ${abierto ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <button
                    className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full"
                    onClick={onClose}
                >
                    <X size={22} />
                </button>

                <div className="flex items-center gap-2 mt-4 mb-6">
                    <Package size={22} className="text-orange-500" />
                    <h2 className="text-2xl font-bold">Historial de Compras</h2>
                </div>

                {cargando ? (
                    <p className="text-gray-500">Cargando historial...</p>
                ) : pedidos.length === 0 ? (
                    <p className="text-gray-500">
                        Aún no tienes compras registradas.
                    </p>
                ) : (
                    <ul className="space-y-4 overflow-y-auto max-h-[75vh] pr-2">
                        {pedidos.map((p) => (
                            <li
                                key={p.id}
                                className="border rounded-lg p-3 flex justify-between items-start"
                            >
                                <div>
                                    <p className="font-semibold">Pedido #{p.id}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(p.fecha).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Estado:{" "}
                                        <span className="font-semibold">
                                            {p.estado}
                                        </span>
                                        {" · "}
                                        Método:{" "}
                                        <span className="font-semibold">
                                            {p.metodo_pago || "—"}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="font-bold text-orange-600">
                                        S/ {p.total}
                                    </span>
                                    <button
                                        onClick={() => handleDescargarComprobante(p)}
                                        className="flex items-center gap-1 text-red-600 hover:text-red-700 text-xs"
                                        title="Descargar comprobante"
                                    >
                                        <Download size={18} />
                                        <span>PDF</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}