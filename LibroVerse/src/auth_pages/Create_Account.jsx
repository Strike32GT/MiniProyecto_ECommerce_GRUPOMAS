import React from "react";
import {Book,Mail,Lock, User} from "lucide-react";

export default function Create_Account(){
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden">

                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-10 text-center text-white relative">
                    <div className="mx-auto mb-4 w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <Book className="w-10 h-10 text-white"/>
                    </div>

                    <h1 className="text-3xl font-semibold">LibroVerse</h1>
                    <p className="mt-2">Únete a ReadHub</p>
                    <p className="text-sm opacity-90">
                        Crea tu cuenta y descubre un mundo de historias
                    </p>
                </div>

                <div className="p-8">

                    <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
                    <div className="mt-1 mb-4 flex items-center gap-3 border rounded-xl px-3 py-2 bg-gray-50">
                        <User className="w-5 h-5 text-gray-400" />
                        <input type="text" placeholder="Tu nombre" className="w-full bg-transparent outline-none text-gray-700" />
                    </div>



                    <label className="text-sm font-medium text-gray-700">Correo Electronico</label>
                    <div className="mt-1 mb-4 flex items-center gap-3 border rounded-xl px-3 py-2 bg-gray-50">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <input type="email" placeholder="tu@email.com" className="w-full bg-transparent outline-none text-gray-700" />
                    </div>

                    <label className="text-sm font-medium text-gray-700">Contraseña</label>
                    <div className="mt-1 flex items-center gap-3 border rounded-xl px-3 py-2 bg-gray-50">
                        <Lock className="w-5 h-5 text-gray-400"/>
                        <input type="password" placeholder="********" className="w-full bg-transparent outline-none text-gray-700" />
                    </div>

                    <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-95 transition">
                        Crear Cuenta
                    </button>

                    <p className="text-center mt-6 text-sm">Ya tienes cuenta?{" "}
                        <a href="#" className="text-orange-500 font-semibold hover:underline">Inicia Sesion</a>
                    </p>
                </div>
            </div>
        </div>
    );
}