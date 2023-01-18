import React from 'react';
import { HashLoader } from 'react-spinners';

const ScreenLoader = () => {
  return (
    <div className="fixed bg-white/50 top-0 right-0 left-0 bottom-0 backdrop-blur-md z-50 flex items-center justify-center">
      <HashLoader size={250} color="#188796" />
    </div>
  );
};

export default ScreenLoader;
