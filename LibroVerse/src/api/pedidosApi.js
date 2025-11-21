import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/pedidos/crear/";

export const crearPedido = async (items, usuarioId) => {
    try {
        const response = await axios.post(API_URL, {
            usuario_id: usuarioId,
            items,
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Error desconocido" };
    }
};