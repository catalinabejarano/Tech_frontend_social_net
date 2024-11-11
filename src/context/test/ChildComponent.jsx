import  { useContext } from 'react';
import { RenderContext} from '../RenderContext';

const ChildComponent = () => {
  const { updateParentData } = useContext(RenderContext);

  const handleSendData = () => {
    updateParentData('Mensaje desde el Hijo');
  };

  return (
    <div>
      <h2>Componente Hijo</h2>
      <button onClick={handleSendData}>Enviar datos al Padre</button>
    </div>
  );
};

export default ChildComponent;