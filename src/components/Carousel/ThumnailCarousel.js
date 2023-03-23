import Carousel from 'react-multi-carousel';
import AuctionCard from '../Auction/AuctionCard';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30
  }
};

const ThumnailCarousel = ({ data }) => {
  return (
    <Carousel ssr partialVisbile itemClass="image-item" responsive={responsive}>
      {data?.map((photo) => (
        <div key={photo.id} className="px-4">
          <AuctionCard artwork={photo} />
        </div>
      ))}
    </Carousel>
  );
};

export default ThumnailCarousel;
