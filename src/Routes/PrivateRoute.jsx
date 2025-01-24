import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";





const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user,loading} = UseAuth()
    if(loading) { 
        return (<h1 className="text-2xl text-center ">Loading...</h1>
    )
    }

    if(user){
        return children;
    }
    return (
        <Navigate to={'/signin'} state={{from:location}}
        replace></Navigate>
    );
};

export default PrivateRoute;