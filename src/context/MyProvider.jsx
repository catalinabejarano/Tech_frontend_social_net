import PropTypes from 'prop-types';
import  { useState } from 'react';
import { RenderContext } from './RenderContext';


export const MyProvider = ({ children }) => {
  const [childData, setChildData] = useState('');
  const [enableButton, setEnableButton] = useState('false');

  // Funciónes para recibir datos de ListCards
  const updateRegisterAnimal = (dataCard) => {
    setChildData(dataCard);
  };

  const showButtonUpdate = (enableButton) => {
    setEnableButton(enableButton);
  };

  return (
    <RenderContext.Provider value={{ childData, enableButton,  updateRegisterAnimal , showButtonUpdate  }}>
      {children}
    </RenderContext.Provider>
  );
};
MyProvider.propTypes = {
   children: PropTypes.node.isRequired 
}


