import  { useState } from 'react';
import BounceBox from './BounceBox';
import imagen1 from "../../assets/images/logo_fund.png"
import imagen2 from "../../assets/images/page-img-in.jpg"
import gaticosImage from '../../assets/images/page-img.jpg';
import perritosImage from '../../assets/images/page-img-1.jpg';
import ubicacionFun from '../../assets/images/ubicacion.jpg';
import ayuda from '../../assets/images/ayuda.jpg';

const Home = () => {

    const [showPanel, setShowPanel] = useState(false);

    // Estados para mostrar u ocultar cada panel de información
    const [showGatitosPanel, setShowGatitosPanel] = useState(false);
    const [showPerritosPanel, setShowPerritosPanel] = useState(false);
    const [showUbicacionPanel, setShowUbicacionPanel] = useState(false);
    const [showAyudanosPanel, setShowAyudanosPanel] = useState(false);

    const onGatitosHover = () => (setShowGatitosPanel(true));
    const onGatitosLeave= () => (setShowGatitosPanel(false));
    const onPerritosHover= () =>(setShowPerritosPanel(true));
    const onPerritosLeave= () =>(setShowPerritosPanel(false));
    const onUbicacionHover= () =>(setShowUbicacionPanel(true));
    const onUbicacionLeave= () =>(setShowUbicacionPanel(false));
    const onAyudanosHover= () =>(setShowAyudanosPanel(true));
    const onAyudanosLeave= () =>(setShowAyudanosPanel(false));

    return (
        <main className="main_home">
          <section id="content">
            <section id="content">         
                <div className="container_16">
                   
                        <div className="box1">
                            <img src={imagen1} alt="" className="logofund " />
                        </div>
                       
                        <div className="box2">
                                <h1 className="content__title"> Fundación Sicaru</h1>
                                <br/>
                                <p className="texto">
                                 Este es nuestro espacio virtual dedicado a nuestros queridos peluditos, quienes son nuestro mayor apoyo emocional. 
                                  Aquí, aunque con mucho esfuerzo, hemos creado un sitio lleno de amor, cariño y respeto para ellos. </p>
                                 <p className="texto">Esperamos que encuentren todo lo que necesitan para ayudarnos a cuidar y consentir a estos fieles compañeros.</p>
                                <p className="texto"> Somos una fundación para cientos de peluditos sin protección ni hogar, apóyanos. </p>
                                
                        </div>
                            
                        
                        <div className="box3">
                            <br/> <br/>                         
                            <img src={imagen2} alt="" className="top" id="image_adopta" />
                            <br/>
                            <h4 className="aviso">NO COMPRES, ADOPTA!</h4> 
                        </div>
                         
                   
                </div>
            </section>
            <section>  
               <div className="container_16 " id="fondo_areas">
                    <div className="areasfundacion">
                        
                        <div className="panel">
                            {showGatitosPanel && (
                                <BounceBox toggle={setShowPanel}>
                                <p className="texto">En nuestra fundación, brindamos un hogar temporal a cerca de 100 gatitos llenos de amor y ternura, 
                                   cada uno con una historia única que merece ser escuchada y apreciada. </p>
                                <p className="texto">Estos pequeños compañeros no
                                   solo necesitan alimento y refugio, sino también cariño y atención, cualidades que nuestro equipo y 
                                   voluntarios se esfuerzan por ofrecerles todos los días. Con mucho esmero, les brindamos un entorno seguro  y acogedor.</p>
                                   
                                </BounceBox>
                             )} 
                        </div>    
                        <div className="panel2 ">
                            {showPerritosPanel && (
                            <BounceBox toggle={setShowPanel}>
                            <p className="texto">En nuestra fundación tenemos cerca de 200 perritos amorosos.Además de ofrecer cuidado a los perritos, 
                                nuestra misión incluye fomentar una cultura de adopción responsable. </p>

                            <p className="texto">Creemos firmemente que cada uno de estos perritos tiene el potencial de convertirse en un valioso miembro de cualquier hogar, 
                                trayendo consigo alegría y compañía. Al optar por la adopción, quienes nos visitan contribuyen al bienestar de muchos más animales.</p>
                            
                            </BounceBox>
                            )} 
                        </div>
                        <div className="panel3">
                            {showUbicacionPanel && (
                            <BounceBox toggle={setShowPanel}>
                            <p className="texto"> Para llegar a nuestra fundación desde Bogotá, 
                                toma la Autopista Norte en dirección hacia el municipio de Chía.  Después de aproximadamente 20 minutos,
                                mantente en el carril derecho y sigue las indicaciones hacia la salida de Cajicá. 
                            </p>

                            <p className="texto"> Al llegar al cruce con el camino veredal El Retiro, toma a la izquierda. Verás señales que te guiarán hasta el refugio,
                                que se encuentra a unos 2 km. Al llegar, verás el letrero de la Fundación Albergue Sicaru.
                                </p>
                            </BounceBox>
                            )} 
                         </div>

                        <div className="panel4">
                            {showAyudanosPanel && (
                            <BounceBox toggle={setShowPanel}>
                            <p className="texto"> Nosotros trabajamos día a día para brindar un hogar seguro y lleno de amor a nuestros perritos y gatitos rescatados,
                                pero tu apoyo es esencial para que podamos continuar. Con cada donación, ya sea en forma de alimento, medicamentos,
                                 mantas o contribuciones económicas, ayudas a que estos peluditos reciban el cuidado y atención que tanto necesitan.</p>
                            <p className="texto">Al unirte a nuestra causa, ofreces una oportunidad de vida digna a cada uno.
                                
                            </p> 

                            {/*<a href="#" className="button">Leer más<span></span></a> */}
                            </BounceBox>
                             )} 
                                         
                        </div>
                     
                    </div>
                
                    <div>
                        <div className="areas"> 
                            <div className="">
                            <a href="/rsocial/rescatados"  onMouseEnter={onGatitosHover} onMouseLeave={onGatitosLeave}>
                            <img src={gaticosImage} className="imagesSection" alt="Gaticos rescatados" /></a>
                        </div>

                        <div className="">
                            <a href="/rsocial/rescatados" onMouseEnter={onPerritosHover} onMouseLeave={onPerritosLeave}>
                            <img src={perritosImage} className="imagesSection" alt="Perritos rescatados" /> </a>
                        </div>
                    </div> 
                        <div className="areas">
                            <div className="">
                                {/*<a href="/ubicacion">*/}
                                <a href="/ubicacions" onMouseEnter={onUbicacionHover} onMouseLeave={onUbicacionLeave}>
                                <img src={ubicacionFun} className="imagesSection" alt="Ubicacion Fundacion" /> </a>
                            </div>

                            <div className="">
                                {/*<a href="/ayuda">*/}
                                <a href="/ayuda" onMouseEnter={onAyudanosHover} onMouseLeave={onAyudanosLeave}>
                                <img src={ayuda} className="imagesSection" alt="Ayuda Fundacion" /> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
            </section> 
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
           
	    	                <div className="grid_16">
                            <p> Fundación Albergue Sicaru © {new Date().getFullYear()}</p>              
                            </div>
	    	            <div> 
                    </div>
                </div></div></div>
            </footer>
        </main>
    );
};



export default Home;
