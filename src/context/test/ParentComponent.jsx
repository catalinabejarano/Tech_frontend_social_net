import { useContext } from 'react';
import { RenderContext } from '../RenderContext';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const { childData } = useContext(RenderContext);

  return (
    <div>
      <h1>Componente Padre</h1>
      <p>Datos recibidos del hijo: {childData}</p>
      <ChildComponent />
    </div>
  );
};

export default ParentComponent;