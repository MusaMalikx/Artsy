import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Slider = () => {
  //   console.log(data);
  return (
    <Carousel
      showArrows={true}
      autoPlay
      infiniteLoop
      showIndicators={true}
      showStatus={false}
      showThumbs={false}
      dynamicHeight={false}
      interval={4000}>
      {/* <div className="bg-banner1 h-[250px] sm:h-[400px] md:h-[550px] lg:h-[700px] bg-cover bg-center" /> */}
      <div className="bg-banner4 h-[250px] sm:h-[400px] md:h-[550px] lg:h-[700px] bg-cover bg-center" />
      <div className="bg-banner2 h-[250px] sm:h-[400px] md:h-[550px] lg:h-[700px] bg-cover bg-center" />
      <div className="bg-banner3 h-[250px] sm:h-[400px] md:h-[550px] lg:h-[700px] bg-cover bg-center" />
      <div className="bg-banner5 h-[250px] sm:h-[400px] md:h-[550px] lg:h-[700px] bg-cover bg-center" />
      <div className="bg-banner6 h-[250px] sm:h-[400px] md:h-[550px] lg:h-[700px] bg-cover bg-center" />
      <div className="bg-banner7 h-[250px] sm:h-[400px] md:h-[550px] lg:h-[700px] bg-cover bg-center" />
    </Carousel>
  );
};

export default Slider;
