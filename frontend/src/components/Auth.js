import { useLocation,Navigate } from "react-router-dom"

export const setToken = (token)=>{

    localStorage.setItem('tokenLS', token)
}

export const fetchToken = (token)=>{

    return localStorage.getItem('tokenLS')
}

export const setDetails = (details) => {
    localStorage.setItem('details', JSON.stringify(details))
}

export const fetchDetails = (details) => {
   return JSON.parse(localStorage.getItem('details'))
}

export function RequireToken({children}){

    let auth = fetchToken()
    let location = useLocation()

    if(!auth){

        return <Navigate to='/login' state ={{from : location}}/>;
    }

    return children;
}