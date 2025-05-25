import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"



function ProtectedRoute({children}){
    // As soon as we load protected route will run useEffect
    useEffect(()=>{
        auth().catch(()=>setIsAuthorized(false))
    },[])
    const [isAuthorized, setIsAuthorized ] = useState(null)
    const refreshToken = async ()=>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post("/api/token/refresh/",{
                refresh: refreshToken
            });
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }
        }catch(error){
            console.log(error)
            setIsAuthorized(false)
        }
    }
    const auth = async ()=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token){
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now()/1000

        if (tokenExpiration < now){
            await refreshToken()
        }else{
            setIsAuthorized(true)
        }
    }


    if (isAuthorized === null){
        return <div>loading..</div>
    }
    return isAuthorized?children:<Navigate to="/login" />
}
export default ProtectedRoute