import React from 'react';
import Rodal from 'rodal';

const Modal = ({ children, onClose, width, height, open, ...props }) => {
  return (
    <div
      style={{
        overflow: 'auto',
      }}
    >
      <Rodal
        onClose={onClose}
        visible={open}
        width={width}
        height={height}
        closeMaskOnClick={true}
        draggable={true}
        showCloseButton={true}
        leaveAnimation={'zoom'}
        showMask={true}
        duration={300}
        enterAnimation={'flip'}
      >
        {children}
      </Rodal>
    </div>
  );
};

export default Modal;
