import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../components/layouts/public/PublicLayout';
import { PrivateLayout } from '../components/layouts/private/PrivateLayout';
import { Login } from '../components/user/Login';
import { Register } from '../components/user/Register';
import { Feed } from '../components/publication/Feed';
import { Error404 } from '../components/layouts/Error404';
import { AuthProvider } from '../context/AuthProvider';
import { Logout } from '../components/user/Logout';
import { People } from '../components/user/People';
import { Config } from '../components/user/Config';
import { Following } from '../components/follow/Following';
import { Followers } from '../components/follow/Followers';
import { Profile } from '../components/user/Profile';
import { MyPublications } from '../components/publication/MyPublications';
import { PublicationDetail } from '../components/publication/PublicationDetail';

import  Home  from '../components/home/Home';
import  HomePublic  from '../components/home/HomePublic';
import { RescuedAnimals } from "../components/animals/RescuedAnimals";


export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
         <Routes>
          {/* Cargamos los componentes de la ruta pública */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePublic/>} />
              <Route path='login' element={<Login />} />
              <Route path='registro' element={<Register />} />
            </Route>

        {/* Cargamos los componentes de la ruta privada */}
        <Route path="/rsocial" element={<PrivateLayout />}>
          <Route index element={<Home/>} />
          <Route path='feed' element={<Feed />} />
          <Route path='gente' element={<People />} />
          <Route path='rescatados' element={<RescuedAnimals/>} />
          <Route path='ajustes' element={<Config />} />
          <Route path='logout' element={<Logout />} />
          <Route path='siguiendo/:userId' element={<Following />} />
          <Route path='seguidores/:userId' element={<Followers />} />
          <Route path="perfil/:userId" element={<Profile/>} />
          <Route path="mis-publicaciones" element={<MyPublications />} />
          <Route path="publicacion/:id" element={<PublicationDetail />} />
         </Route>

          {/* Configuramos la ruta para el error 404 */}
          <Route path="*" element={<Error404 />} />
          
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
