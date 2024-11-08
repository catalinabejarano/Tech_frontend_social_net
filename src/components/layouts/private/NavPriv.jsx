import { NavLink } from 'react-router-dom';
import avatar from '../../../assets/img/default.png';
import useAuth from "../../../hooks/useAuth";
import imagen1 from "../../../assets/images/logo_fund.png"


export const NavPriv = () => {
  // Usamos el hook Auth para tener disponible el objeto del usuario identificado.
  const { auth } = useAuth();

  return (
    <nav className="navbar__container-lists"  >

      <ul className="container-lists__menu-list">
        <img src={imagen1} alt="" className="logofundsmall" />
        <li className="menu-list__item">
          <NavLink to='/rsocial' className="menu-list__link">
          <i className="fa-solid fa-house"></i> 
          <span className="menu-list__title">Home</span>
          </NavLink>
        </li>
        <li className="menu-list__item">
          <NavLink to='feed' className="menu-list__link">
            <i className="fa-solid fa-archway"></i>
            <span className="menu-list__title">Begin</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to='feed'  className="menu-list__link">
            <i className="fa-solid fa-list"></i>
            <span className="menu-list__title">Timeline</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to='gente'  className="menu-list__link">
            <i className="fa-solid fa-users"></i>
            <span className="menu-list__title">People</span>
          </NavLink>
        </li>
        <li className="menu-list__item">
          <NavLink to='rescatados'  className="menu-list__link">
            <i className="fa-solid fa-paw"></i>
            <span className="menu-list__title">Rescued Animals</span>
          </NavLink>
        </li>


      </ul>
      <ul className="container-lists__list-end">
        <li className="list-end__item">
          <div className="img-avatar-nav">
            {auth.image != "default.png" && (
              <img
                src={auth.image}
                className="container-avatar__img"
                alt="Foto de perfil"
              />
            )}
            {auth.image == "default.png" && (
              <img
                src={avatar}
                className="container-avatar__img"
                alt="Foto de perfil"
              />
            )}
          </div>
        </li>
        <li className="list-end__item">
          <a href="#" className="list-end__link">
            <span className="list-end__name">{auth.nick}</span>
          </a>
        </li>
        <li className="list-end__item">
          <NavLink to="/rsocial/ajustes" className="list-end__link">
            <i className="fa-solid fa-gear"></i>
            <span className="list-end__name">Settings</span>
          </NavLink>
        </li>
        <li className="list-end__item">
          <NavLink to="/rsocial/logout" className="list-end__link">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="list-end__name">Logout</span>
          </NavLink>
        </li>
      </ul>
      
    </nav>
  )
}
