import { Navigate, Outlet } from "react-router-dom";
import { HeaderPub } from "./HeaderPub";
import useAuth from '../../../hooks/useAuth';
//import { Footer } from "./Footer";


export const PublicLayout = () => {
  const { auth } = useAuth();

   // Verificación de que `auth` y `auth._id` están definidos
   const isAuthenticated = auth && auth._id;

  return (
    <>
      {/* Menú de Navegación Principal - Public*/}
      <HeaderPub />

     {/* Contenido Principal */}
     <section className='layout__content'>
        {!isAuthenticated ? (
          <Outlet />
        ) : (
          <Navigate to="/rsocial" />
        )}
      </section>
    
      {/* Datos de Contacto - Public
      <Footer />
      */}
      </>

  )
}