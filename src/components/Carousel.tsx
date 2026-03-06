import { type FC } from 'react';
import './Carousel.css';
import img1 from '../assets/IMG20251220160043.jpg';
import img2 from '../assets/PXL_20260125_015050249.PORTRAIT.jpg';
import img3 from '../assets/PXL_20260125_024915462.MP.jpg';
import img4 from '../assets/PXL_20260125_090756472.PORTRAIT.jpg';
import img5 from '../assets/PXL_20260201_110236058.jpg';

const images = [
  img1,
  img2,
  img3,
  img4,
  img5
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
