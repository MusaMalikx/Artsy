import React from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBar = ({ handleSearch, placeholder }) => {
  return (
    <div className="flex max-w-3xl mt-3 mb-10 mx-auto flex-row bg-white p-1 shadow-[0px_1px_5px_2px_rgba(0,0,0,0.2)]">
      <div className="relative flex flex-grow">
        <BiSearch className="absolute text-[#cccccc] text-2xl ms-2 mt-[15px]" />
        <input
          className="flex-grow mr-2 pl-10 py-3 lg:border-none rounded-none focus:outline-none"
          onChange={handleSearch}
          type="search"
          placeholder={placeholder}
          aria-label="Search"
        />
      </div>
      <button
        className="bg-primary text-white px-3 uppercase tracking-[.3em] rounded-none text-[.6875rem]"
        onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
