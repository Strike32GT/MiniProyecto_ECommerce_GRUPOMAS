import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/pedidos/";


export const crearPedidoPendiente = async (items, usuarioId) => {
    const response = await axios.post(`${API_BASE}crear/`, {
        usuario_id: usuarioId,
        items,
    });
    return response.data;   
};

// Confirmar pago de un pedido pendiente
export const confirmarPagoPedido = async (pedidoId, metodoPago) => {
    const response = await axios.post(`${API_BASE}${pedidoId}/confirmar-pago/`, {
        metodo_pago: metodoPago,   
    });
    return response.data;   
};