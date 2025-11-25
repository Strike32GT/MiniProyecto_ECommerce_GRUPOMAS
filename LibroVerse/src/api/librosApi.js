import axios from "axios";

const API_URL= "http://127.0.0.1:8000/api/libros/";

export const getLibros= async (ordering = null, tipo = null) => {
    const params = {};

    if(ordering){
        params.ordering = ordering
    }

    if (tipo){
        params.tipo = tipo;
    }

    const response = await axios.get(API_URL, {params});
    return response.data;
};