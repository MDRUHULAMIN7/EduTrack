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
export const router = createBrowserRouter([
{
    path:"/",
    element:<Main></Main>,
    errorElement:<h1>errorpage</h1>,
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
            element:<CollegeDetails></CollegeDetails>
        },
        {
            path:"/colleges",
            element:<Colleges></Colleges>
        },
        {
            path:"/admisions",
            element:<Admission></Admission>
        },
        {
            path:"/mycollege",
            element:<PrivateRoute><MyCollege></MyCollege></PrivateRoute>
        },
    ]
}

])