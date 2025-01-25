import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SinIn/SignIn";
import CollegeDetails from "../Components/CollegeDetails/CollegeDetails";
import Colleges from "../Pages/Colleges/Colleges";
import Admission from "../Pages/Admission/Admission";
import PrivateRoute from "./PrivateRoute";
import MyCollege from "../Pages/MyCollege/MyCollege";
import NotFound from "../Components/NotFound/NotFound";
export const router = createBrowserRouter([
{
    path:"/",
    element:<Main></Main>,
    errorElement:<NotFound></NotFound>,
    children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/signup",
            element:<SignUp></SignUp>
        },
        {
            path:"/signin",
            element:<SignIn></SignIn>
        },
        {
            path:"/college/:id",
            element:<PrivateRoute><CollegeDetails></CollegeDetails></PrivateRoute>
        },
        {
            path:"/colleges",
            element:<Colleges></Colleges>
        },
        {
            path:"/admisions",
            element: <PrivateRoute><Admission></Admission></PrivateRoute>
        },
        {
            path:"/mycollege",
            element:<PrivateRoute><MyCollege></MyCollege></PrivateRoute>
        },
    ]
}

])