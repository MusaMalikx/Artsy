import React, { useRef } from 'react';
import API from '../../api/server';
import Toaster from '../../components/Common/Toaster';
import { useToaster } from 'rsuite';

/*
SearchBar component for searching auctioned artworks.
Allows users to input keywords and filter results based on their search queries.
Handles the logic for fetching and displaying relevant artworks.
*/
const SearchBar = ({ artwork }) => {
  const search = useRef();
  const toaster = useToaster();
  const getSearchedArtworks = async () => {
    await API.get(`/api/artworks/search?keyword=${search.current.value}`)
      .then((res) => {
        artwork(res.data);
      })
      .catch((err) => {
        artwork([]);
        console.log(err);
        Toaster(toaster, 'error', err.response.data.message);
      });
  };

  return (
    <div>
      <div className="flex items-center max-w-2xl mx-auto">
        <label htmlFor="voice-search" className="sr-only rounded-l-xl">
          Search
        </label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm focus:border-primary focus:ring-primary block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            placeholder="Search Mockups, Logos, Design Templates..."
            required=""
            ref={search}
          />
        </div>
        <button
          onClick={getSearchedArtworks}
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-primary border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary">
          <svg
            aria-hidden="true"
            className="mr-2 -ml-1 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
