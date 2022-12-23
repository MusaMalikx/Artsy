import React from 'react';

const HeaderLayout = ({ title }) => {
  return (
    <div className="pt-10 px-5">
      <h1 className="uppercase tracking-widest text-lg md:text-2xl whitespace-nowrap">{title}</h1>
      <hr />
    </div>
  );
};

export default HeaderLayout;
