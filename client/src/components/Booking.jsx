import { useEffect, useState } from "react";
import HotelSelector from "./HotelSelector";

function Booking({ selectedCountry,  }) {
  const [hotels, setHotels] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  const handleStartChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearch = async () => {
    setSearchClicked(true);
    console.log(selectedCountry);

    try {
      const response = await fetch("http://localhost:3000/api/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedCountry }),
      });

      const result = await response.json();
      if (response.ok) {
        setHotels(result);
        console.log(hotels)
      } else {
        console.error("Error fetching hotels:", result);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const searchForm = (
    <div>
      <input
        className="accomodationStartDate"
        type="date"
        onChange={handleStartChange}
      />
      <input
        className="accomodationEndDate"
        type="date"
        onChange={handleEndChange}
      />
      <input />
      <button onClick={handleSearch}>SEARCH</button>
    </div>
  );

  return (
  <div className="booking-container">
    <div className="booking-content" >
      {!searchClicked ? (
        <HotelSelector searchForm={searchForm} hotels={hotels} />
      ) : (
        <HotelSelector searchForm={searchForm} hotels={hotels} />
      )}
    </div>
  </div>
);
}

export default Booking;
