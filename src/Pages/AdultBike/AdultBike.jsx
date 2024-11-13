import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BikeShowcase from './Bike_Display/BikeShowcase';
import BikeCarousel from './Bike_Display/BikeCarousel';
import './AdultBike.css';

export default function AdultBike() {
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null); // Start with null


  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get('https://rbms-backend-g216.onrender.com/api/bikes');
        console.log(response.data); // Log the response data to the console
  
        // Check if response.data is an object with an adultBikes property
        if (response.data && response.data.adultBikes && Array.isArray(response.data.adultBikes)) {
          const adultBikes = response.data.adultBikes;
          setBikes(adultBikes);
          setSelectedBike(adultBikes[0]); // Default to the first adult bike
        } else {
          console.error('Expected an object with an adultBikes array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching bikes:', error);
      }
    };
  
    fetchBikes();
  }, []);

  const handleBikeSelect = (bike) => {
    setSelectedBike(bike);
  };

  return (
    <div id='AdultbikePage'>
      <div className="App">
        {/* Bike Showcase */}
        {selectedBike && <BikeShowcase bike={selectedBike} />}
        
        {/* Bike Carousel */}
        <BikeCarousel bikes={bikes} onBikeSelect={handleBikeSelect} />
      </div>
    </div>
  );
}