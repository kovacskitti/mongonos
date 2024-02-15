import mongoose from "mongoose";
import express from "express";
import User from "./model/User.js";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import City from "./model/City.js";
import Hotel from "./model/Hotel.js"
import cors from "cors";

mongoose.connect(
  "mongodb+srv://tothje98:testpassword@cluster0.yvwpywb.mongodb.net/mongonosz"
);

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());

/* const cities = [
  "Tokyo",
  "Cairo",
  "Budapest",
  "Paris",
  "London",
  "New York",
  "Washington",
  "Rome",
  "Milan",
  "Melbourne",
  "Hong Kong",
  "Seoul",
  "Dubai",
  "Moscow",
  "Chicago",
  "Berlin",
  "Manila",
  "Buenos Aires",
  "Zurich",
  "Toronto",
  "Calgary",
];
app.get("/search", async (req, res) => {
  try {
    const result = cities.map((city) => fetchData(city));
    const results = await Promise.all(result);
    await saveDatatoMongo(results);
    res.json({ message: "saved datas" });
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
});

async function fetchData(location) {
  const url = `https://tripadvisor16.p.rapidapi.com/api/v1/rentals/searchLocation?query=${location}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0f762465demshdb053d800bf3383p1f9849jsn183b07248235",
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const data = result.data;
    return data;
  } catch (error) {
    console.error(error);
  }
} */



/* app.get("/searchhotels", async (req, res) => {
  try {
    const cities = await City.find();
  const geoIds = cities.map((city) => city.geoId);
  
    const result = cities.map((city) => fetchDataHotels(city));
    const results = await Promise.all(result);
    await saveHotelstoMongo(results);
    res.json({results});
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }

});
async function fetchDataHotels(geoIds) {
  const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=298184&checkIn=2023-07-03&checkOut=2023-07-07&pageNumber=1&currencyCode=USD`;
              
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0f762465demshdb053d800bf3383p1f9849jsn183b07248235",
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const data = result.data.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function saveHotelstoMongo(dataArray) {
  try {
    const hotelPromises = dataArray
      .filter((hotelData) => hotelData) 
      .flatMap((hotelData) =>
        hotelData.map((hotel) => {
          const { id, title, secondaryInfo, badge, bubbleRating, cardPhotos } =
            hotel;

          const newHotel = new Hotel({
            id,
            title,
            secondaryInfo,
            badge,
            bubbleRating,
            cardPhotos,
          });

          return newHotel.save();
        })
      );

    await Promise.all(hotelPromises);
  } catch (error) {
    console.error(error);
  }
} */



bcrypt.genSalt(10, (err, salt) => {
  if (err) {
    console.error("Error generating salt:", err);
    res.status(500).json({ success: false });
    return;
  }

  app.post("/api/registration", (req, res) => {
    const { officialName, username, email, phone, password } = req.body;
    
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        console.error("Error during password hashing:", err);
        res.status(500).json({ success: false });
        return;
      }

      const user = new User({
        officialName,
        username,
        email,
        phone,
        hashedPassword,
      });

      console.log(user);
      user
        .save()
        .then((savedUser) => res.json(savedUser))
        .catch((err) => {
          console.error("Error saving user:", err);
          res.status(400).json({ success: false });
        });
    });
  });

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    

     User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        res.json({ success: false, message: "User not found" });
        return;
      }

      bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
        if (err) {
          console.error("Error during password comparison:", err);
          res.status(500).json({ success: false });
          return;
        }

        if (isMatch) {
          res.json({ success: true, message: "MATCH", user: {
              _id: user._id} });
        } else {
          res.json({ success: false, message: "NO MATCH" });
        }
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false });
    });
        
  });
});

app.get('/api/getsearch', async (req, res) => {
  try {
    const cities = await City.find({}, 'localizedName localizedAdditionalNames');
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post("/api/search", (req, res) => {
  const citySearch = req.body;
  console.log(citySearch.localizedName);
  const currentCity = citySearch.localizedName;
  City.find({ localizedName: new RegExp("^" + currentCity, "i") }) //TÁDÁM
    .then((cities) => res.json(cities))
    .catch((err) => res.status(500).json);
});

app.post("/api/hotels", async (req, res) => {
  const selectedCountry = req.body;
  console.log(selectedCountry.selectedCountry.localizedName)
  try {
    const hotels = await Hotel.find({localizedName: selectedCountry.selectedCountry.localizedName,
    });

    res.json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
