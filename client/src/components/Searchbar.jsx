import React, { useState, useEffect } from "react";
import Booking from "./Booking";

function Searchbar({userId}) {
  const [inputValue, setInputValue] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [listVisible, setListVisible] = useState(true);
const [bookingActive, setBookingActive] = useState(false);
  const submitValue = (event) => {
    const value = event.target.value;
    setInputValue(value);
    fetch("http://localhost:3000/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ localizedName: value }),
    })
      .then((response) => response.json())
      .then((response) => {
        setCities(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log(selectedCity);
  }, [selectedCity]);

  const handleCityClick = (city) => {
  setSelectedCity(city);
  setListVisible(false);
  setBookingActive(true);
  console.log(userId)
};

return (
 <div className="searchbar-container">
    <input
      id="search"
      type="search"
      placeholder="Search a location"
      onChange={submitValue}
      disabled={bookingActive}
      className="search-input"
    />
    {listVisible && !bookingActive && (
      <ul className="dropdown-menu options">
        {cities.map((city) => (
          <li key={city.id} onClick={() => handleCityClick(city)}>
            {city.localizedName} - {city.locationV2}
          </li>
        ))}
      </ul>
    )}
    {selectedCity && (
      <Booking selectedCountry={selectedCity} bookingActive={bookingActive} />
    )}
  </div>

);
    }

export default Searchbar;
