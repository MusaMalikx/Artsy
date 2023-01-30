import React from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
//import AuctionCard from '../Auction/AuctionCard';
const SimilarAuctions = ({ data }) => {
  let defaultTransform = 0;
  const goNext = () => {
    defaultTransform = defaultTransform - 398;
    var slider = document.getElementById('slider');
    if (Math.abs(defaultTransform) >= slider.scrollWidth / 1.7) defaultTransform = 0;
    slider.style.transform = 'translateX(' + defaultTransform + 'px)';
  };

  const goPrev = () => {
    var slider = document.getElementById('slider');
    if (Math.abs(defaultTransform) === 0) defaultTransform = 0;
    else defaultTransform = defaultTransform + 398;
    slider.style.transform = 'translateX(' + defaultTransform + 'px)';
  };
  return (
    <>
      <div className="mx-5 relative py-10 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-300 via-gray-100 to-gray-300 border-gray-400 border rounded-lg mb-20 md:my-20">
        <button
          aria-label="slide backward"
          onClick={goPrev}
          className="absolute z-30 left-0 text-lg top-1/4 ml-10 focus:outline-none outline-none cursor-pointer"
          id="prev">
          <GrFormPrevious />
        </button>
        <div className="flex justify-center items-center mb-10">
          <p className="font-semibold uppercase text-3xl">Similar Auctions Items</p>
        </div>

        <div className="flex items-center flex-wrap justify-center ">
          <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
            <div className="w-full relative flex items-center justify-center">
              <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                <div
                  id="slider"
                  className="h-full w-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                  {data?.map((photo) => (
                    <>
                      <div className="flex flex-shrink-0 relative">
                        <img
                          src={photo.urls.full}
                          alt="sitting area"
                          className="object-cover object-center h-60 w-60"
                        />
                        <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                          <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white dark:text-gray-900">
                            ABC
                          </h2>
                          <div className="flex h-full items-end pb-6">
                            <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white dark:text-gray-900">
                              Minimal Interior
                            </h3>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}

                  {/* {data?.map((photo) => (
                <>
                  <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                    <AuctionCard key={photo.id} artwork={photo} />
                  </div>
                </>
              ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={goNext}
          aria-label="slide forward"
          className="absolute z-30 right-0 text-lg top-1/4 mr-10 focus:outline-none outline-none cursor-pointer"
          id="next">
          <GrFormNext />
        </button>
      </div>
    </>
  );
};

export default SimilarAuctions;
