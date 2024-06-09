import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api';
import {REFRESH_TOKEN,ACCESS_TOKEN} from '../constant';
import {useState, useEffect} from 'react';

function ProtectedRoute({children}){
    const [isAutorized,setIsAutorized]=useState(null);
    useEffect(()=>{
        auth().catch(()=>setIsAutorized(false));
    },[]);


    const refreshToken=async()=>{
        const refreshToken=localStorage.getItem(REFRESH_TOKEN);
        try{
            const response=await api.post('/api/token/refresh/',{refresh: refreshToken,});
            if (response.status===200){
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAutorized(true);
            }
            else{
                setIsAutorized(false);
            }
        }
        catch(error){
            console.error(error);
            setIsAutorized(false);
        }


    }
    const auth=async()=>{
        const token=localStorage.getItem(ACCESS_TOKEN);
        if(!token){
            setIsAutorized(false);
            return;
        
        }
        const decoded=jwtDecode(token);
        const tokenExpired=decoded.exp
        const now=Date.now()/1000;

        if(tokenExpired<now){
            await refreshToken();
        }
        else{
            setIsAutorized(true)
            return;
        }
    }
    if(isAutorized===null){
        return <div>Loading...</div>
    }

    return isAutorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute;