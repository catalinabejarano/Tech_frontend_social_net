import PropTypes from 'prop-types'; 
//import '../../assets/css_home/bouncebox.css'; // Asegúrate de aplicar el estilo de animación aquí.

const BounceBox = ({ children }) => {
    return <div className="bounce-box">{children}</div>;
};

BounceBox.propTypes = {

    children: PropTypes.array
}
export default BounceBox;

