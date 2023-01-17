import React from 'react';
import { PropagateLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className="flex flex-grow justify-center my-6 items-center">
      <PropagateLoader size={15} color="#188796" />
    </div>
  );
}
