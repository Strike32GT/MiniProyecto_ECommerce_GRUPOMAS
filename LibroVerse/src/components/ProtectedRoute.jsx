import { Navigate } from "react-router-dom";

export default function ProtectedRoute( {children} ){
    const user= localStorage.getItem("usuario");

    if(!user){
        return <Navigate to="/" replace />;
    }

    return children;
}