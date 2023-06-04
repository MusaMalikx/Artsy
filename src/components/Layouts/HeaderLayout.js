import React from 'react';

/*
Layout for the Header of every page
*/
const HeaderLayout = ({ title, bool }) => {
  return (
    <div className="pt-10 px-5 sticky top-0 bg-white shadow-md z-10">
      <h1 className="uppercase tracking-widest text-lg md:text-2xl whitespace-nowrap">{title}</h1>
      <hr className={`${bool && 'mb-0'}`} />
    </div>
  );
};

export default HeaderLayout;
