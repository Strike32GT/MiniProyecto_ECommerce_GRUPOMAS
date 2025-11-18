import React, { useState } from "react";
import { Mail,Lock, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../api/cuentasApi";


export default function Login(){

    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword]=useState("");
    const [error, setError] = useState("");
    
    const handleLogin = async () =>{
        try{
            const user = await loginUsuario(email,password);
            localStorage.setItem("usuario",JSON.stringify(user));
            navigate("/home");
            console.log("Usuari.logueado:",user);
        } catch(err){
            setError(err.error || "Error al iniciar sesion");
        }
    };


    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden">

                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-10 text-center text-white relative">
                    <div className="mx-auto mb-4 w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <Book className="w-10 h-10 text-white"/>
                    </div>

                    <h1 className="text-3xl font-semibold">LibroVerse</h1>
                    <p className="mt-2">Hola de Nuevo</p>
                    <p className="text-sm opacity-90">
                        Inicia sesión para continuar tu aventura
                    </p>
                </div>

                <div className="p-8">

                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}


                    <label className="text-sm font-medium text-gray-700">Correo Electronico</label>
                    <div className="mt-1 mb-4 flex items-center gap-3 border rounded-xl px-3 py-2 bg-gray-50">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <input type="email" placeholder="tu@email.com" className="w-full bg-transparent outline-none text-gray-700" value={email} onChange={(e) =>setEmail(e.target.value)} />
                    </div>

                    <label className="text-sm font-medium text-gray-700">Contraseña</label>
                    <div className="mt-1 flex items-center gap-3 border rounded-xl px-3 py-2 bg-gray-50">
                        <Lock className="w-5 h-5 text-gray-400"/>
                        <input type="password" placeholder="********" className="w-full bg-transparent outline-none text-gray-700" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="mt-2 text-right">
                        <a href="#" className="text-orange-500 text-sm hover:underline">Olvidaste la Contraseña?</a>
                    </div>

                    <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-95 transition" onClick={handleLogin}>
                        Iniciar Sesion
                    </button>

                    <p className="text-center mt-6 text-sm">No tienes cuenta?{" "}
                        <a href="#" className="text-orange-500 font-semibold hover:underline">Registrate Gratis</a>
                    </p>
                </div>
            </div>
        </div>
    );
}