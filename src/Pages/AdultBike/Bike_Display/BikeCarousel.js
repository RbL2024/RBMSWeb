import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSwipeable } from 'react-swipeable';
import '../Bike_Style/BikeCarousel.css';

const BikeCarousel = ({ bikes, onBikeSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  const handleNextBike = useCallback(() => {
    const nextIndex = (currentIndex + 1) % bikes.length;
    setCurrentIndex(nextIndex);
    onBikeSelect(bikes[nextIndex]);
  }, [currentIndex, bikes, onBikeSelect]);

  const handlePrevBike = useCallback(() => {
    const prevIndex = (currentIndex - 1 + bikes.length) % bikes.length;
    setCurrentIndex(prevIndex);
    onBikeSelect(bikes[prevIndex]);
  }, [currentIndex, bikes, onBikeSelect]);

  const handleSwipe = useCallback(
    (direction) => {
      if (direction === 'left') {
        handleNextBike();
      } else if (direction === 'right') {
        handlePrevBike();
      }
    },
    [handleNextBike, handlePrevBike]
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const autoSlideInterval = useMemo(() => {
    return isAutoSliding ? 5000 : null;
  }, [isAutoSliding]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (isAutoSliding) {
        handleNextBike();
      }
    }, autoSlideInterval);

    return () => clearInterval(slideInterval);
  }, [handleNextBike, autoSlideInterval, isAutoSliding]);

  const handleMouseEnter = () => {
    setIsAutoSliding(false);
  };

  const handleMouseLeave = () => {
    setIsAutoSliding(true);
  };

 // Function to shorten the bike name
 const shortenBikeName = (fullName) => {
  const parts = fullName.split(' - '); // Split by the delimiter if present
  const bikeName = parts[0].split(' '); // Take the first part and split by spaces

  const shortName = bikeName.length > 1 
      ? `${bikeName[0][0].toUpperCase()}.${bikeName[1].toUpperCase()}`
      : bikeName[0].toUpperCase(); // If only one word, return it as is

  // Add the short color name if available
  const colorName = parts[1] ? ` - ${parts[1][0].toUpperCase()}` : ''; // Take the first letter of the color

  return shortName + colorName; // Combine the shortened name with the color
};

  return (
    <div
      className="bike-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...handlers}
    >
      {/* Left arrow for manual slide */}
      <button onClick={handlePrevBike} className="carousel-control-prev">{'<'}</button>

    {/* Image carousel with swipe handlers */}
    <div className="bike-carousel-images">
    {bikes.map((bike, index) => (
    <div key={bike._id} className="bike-image-container">
      {/* Mini label displaying shortened bike_name */}
      <span className="bike-label">{shortenBikeName(bike.bike_name)}</span>
      <img
        src={bike.bike_image_url}
        alt={bike.bike_name}
        onClick={() => onBikeSelect(bike)}
        className={`bike-image ${index === currentIndex ? 'scale-up' : ''}`}
      />
    </div>
))}
    </div>

      {/* Right arrow for manual slide */}
      <button onClick={handleNextBike} className="carousel-control-next">{'>'}</button>
    </div>
  );
};

export default BikeCarousel;
