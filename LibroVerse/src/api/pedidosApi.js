import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/pedidos/";


export const crearPedidoPendiente = async (items, usuarioId) => {
    const response = await axios.post(`${API_BASE}crear/`, {
        usuario_id: usuarioId,
        items,
    });
    return response.data;   
};

export const enviarCodigoPago = async (pedidoId, correo) => {
    const response = await axios.post(
        `${API_BASE}${pedidoId}/enviar-codigo/`,
        { correo }
    );
    return response.data;
};


export const confirmarPagoPedido = async (pedidoId, metodoPago, codigo) => {
    const body = { metodo_pago: metodoPago };
    if (codigo) body.codigo = codigo;

    const response = await axios.post(
        `${API_BASE}${pedidoId}/confirmar-pago/`,
        body
    );
    return response.data;
};

export const obtenerPedidosUsuario = async (usuarioId) => {
    const response = await axios.get(
        `${API_BASE}?usuario_id=${usuarioId}`
    );
    return response.data;
};

export const obtenerDetallePedido = async (pedidoId) => {
    const response = await axios.get(`${API_BASE}${pedidoId}/`);
    return response.data; 
};