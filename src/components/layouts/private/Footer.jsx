//import React from 'react';
import '../../../assets/css/footer.css';

export const Footer = () => {
 return (
    <footer>
        <div className="main-footer">
            <div className="container_16">
               <div className="wrapper bg-wrap-aside">
                   <div className="grid_5 suffix_1">
                       <h3>Encuentranos en nuestras redes sociales</h3>
                       <a target="_blank" href="http://api.whatsapp.com/send?phone=573182211091" id="icon" className="icons"></a>
                       <a target="_blank" href="https://www.facebook.com/" id="icon-1" className="icons"></a>
                       <a target="_blank" href="https://www.instagram.com/" id="icon-2" className="icons"></a>
                       <a target="_blank" href="https://www.tiktok.com/" id="icon-5" className="icons"></a>
                   </div>
                   
                   <div className="grid_5">
                        <ul>
                            <li><a href="./Javascript/ayuda.html">¿Deseas ayudar?</a></li>
                            <li><a href="./Javascript/contacto.html">Contacto</a></li>
                        </ul>
                    </div>
                   <div className="grid_4">
                       <h3>Donde estamos ubicados</h3>
                        <b>FUNDACION ALBERGUE SICARU -CUNDINAMARCA</b>
                   </div>
               </div>
            </div>
            <div className ="main-footer">
   	            <div className="container_16">
	    	        <div className="grid_16">
                        <p> Fundación Albergue Sicaru © {new Date().getFullYear()} 
                                   
                        </p>
                    </div>
	    	         <div className="clear"></div>
	    	    </div>
            </div>
        </div>
    </footer>

)};


