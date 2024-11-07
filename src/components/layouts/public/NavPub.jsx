import { NavLink } from "react-router-dom"
import imagen1 from "../../../assets/images/logo_fund.png"

export const NavPub = () => {
  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list">
      <img src={imagen1} alt="" className="logofundsmall" />

      <li className="menu-list__item">
          
          <NavLink to='/' className="menu-list__link">
          <span className="menu-list__title">Home</span>
          </NavLink>
        </li>


        <li className="menu-list__item">
          <NavLink to='/login' className="menu-list__link">
            <i className="fa-solid fa-user"></i>
            <span className="menu-list__title">Login</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to='/registro' className="menu-list__link">
            <i className="fa-solid fa-users"></i>
            <span className="menu-list__title">Registro</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
