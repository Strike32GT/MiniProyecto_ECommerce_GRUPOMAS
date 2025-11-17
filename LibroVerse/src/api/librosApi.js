import axios from "axios";

const API_URL= "http://127.0.0.1:8000/api/libros/";

export const getLibros= async (ordering = null) => {
    const params = {};

    if(ordering){
        params.ordering = ordering
    }

    const response = await axios.get(API_URL, {params});
    return response.data;
};