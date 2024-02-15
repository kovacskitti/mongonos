import { useState } from "react";
import { Link } from "react-router-dom";
import RoomBooking from "./RoomBooking";
import { Search } from "../App";

function HotelSelector({searchForm, hotels }) {
  const [selectedHotel, setSelectedHotel] = useState([]);
  const [onBooking, setOnBooking] =useState(false)
  const width = 500;
  const height = 300;
 const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setOnBooking(!onBooking)
    console.log(hotel)
  };

return (
  <div>
    {onBooking ? (
      <RoomBooking selectedHotel={selectedHotel} setSelectedHotel={setSelectedHotel} />
    ) : (
      <>
        {searchForm}
        {hotels.map((hotel, index) => (
          <div key={index}>
            <img
              src={hotel.photo.replace("{width}", width).replace("{height}", height)}
              alt="Logo"
              className="picture"
            />
            <h2>{hotel.title}</h2>
            <button onClick={() => { handleHotelSelect(hotel) }}>Booking</button>
          </div>
        ))}
      </>
    )}
  </div>
);
;
}

export default HotelSelector;
