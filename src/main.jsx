import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/Routes'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Providers/AuthProvider'
import { ToastContainer,  } from 'react-toastify';
createRoot(document.getElementById('root')).render(
  <StrictMode>
     
    <AuthProvider>
  
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer />
    </AuthProvider>
   
  

  </StrictMode>,
)
