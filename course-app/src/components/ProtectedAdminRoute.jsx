import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'

export default function ProtectedAdminRoute({ children }) { 
    const token = localStorage.getItem("accessToken");
    console.log(token)

    if(!token){ 
        return <Navigate to="/"/>;
    }

    try{ 
        const decoded = jwtDecode(token);
        console.log(decoded)

        if(decoded.role !== "admin"){ 
            return <Navigate to="/"/>;
        }

        return children;
    }
    catch(e){ 
        console.log('error-decoding-token', e)
        return <Navigate to="/"/>
    }
}