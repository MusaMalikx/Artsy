import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './css/AuctionItemCarousel.css';

/*
 This component renders a carousel with multiple auction items, allowing users to browse through the available auctions.
*/
const AuctionItemCarousel = ({ images }) => {
  console.log(images.length > 0);
  return (
    <div className="w-[500px] h-66 rounded-md mx-auto">
      <Carousel
        className="main-wrapper"
        infiniteLoop
        useKeyboardArrows
        showArrows={false}
        autoPlay
        showStatus={false}>
        {images.map((img) => {
          return (
            <div className="h-66 w-[500px]" key={images.indexOf(img)}>
              <img className="object-cover object-center w-full h-full" src={img} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default AuctionItemCarousel;
