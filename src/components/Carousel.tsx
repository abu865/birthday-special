import { type FC } from 'react';
import './Carousel.css';

const images = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=500&auto=format&fit=crop&q=60"
];

const Carousel: FC = () => {
  return (
    <div className="carousel-container">
      <div className="carousel">
        {images.map((src, index) => (
          <div 
            className="carousel-item" 
            key={index}
            // @ts-ignore
            style={{ '--i': index, '--total': images.length }}
          >
            <img src={src} alt={`Memory ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
