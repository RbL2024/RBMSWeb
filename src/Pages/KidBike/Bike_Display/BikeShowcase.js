import React from 'react';
import '../Bike_Style/BikeShowcase.css';

const BikeShowcase = ({ bike }) => {
  if (!bike) {
    return <div>No bike information available.</div>; // Fallback UI if bike is not provided
  }

  return (
    <div className="bike-showcase">
      <img 
        key={bike._id} // Ensure each bike has a unique key
        src={bike.bike_image_url} // Use the correct field for the image URL
        alt={bike.bike_name} // Improved alt text without redundancy
      />
      <div className="bike-info">
        <h1 className="bike-name"><span>{bike.bike_name}</span></h1> {/* Apply animation to span */}
        <h2>{bike.bike_type}</h2> 
        <p>{bike.bike_desc}</p> 
        <p>Rent Price: ₱{bike.bike_rent_price}</p> {/* Display rent price */}
        <p>Status: {bike.bike_status}</p> {/* Display bike status */}
      </div>
    </div>
  );
};

export default BikeShowcase;