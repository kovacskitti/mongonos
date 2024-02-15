import React from "react";
import { useState, useEffect } from "react";
import { Search } from "../App.jsx";

function RoomBooking({selectedHotel,setSelectedHotel}) {
    const width = 500;
  const height = 300;
    const currency = "$"
  function getRandomNumber() {
  return (Math.floor(Math.random() * 91) + 10) +currency; 
}
/*  const [isFavorite, setIsFavorite] = useState("");
 const addToFavorites = () => {
    setIsFavorite(selectedHotel);
  };
 const [toCart, setToCart] = useState("");
 const addToCart = () => {
    setToCart(selectedHotel);
  }; */




/* useEffect(() => {
  console.log(selectedHotel);
}, [selectedHotel]); */
console.log(selectedHotel)
    return (
        <div>
            <img
              src={selectedHotel.photo.replace("{width}", width).replace("{height}", height)}
              alt="Logo"
              className="picture"
            />
            <ul>
           <li>Hotel name:{selectedHotel.title}</li>
           <li>Rating:{selectedHotel.rating}</li>
           <li>Rating:{selectedHotel.localizedName}</li>
           <li>Price per night:{getRandomNumber()}</li>
           </ul>
     
        <button /* onClick={addToFavorites} */>Add to Favorites</button>
    
        <button /* onClick={addToCart} */>Book Now</button>
    </div>
  );
}

export default RoomBooking;