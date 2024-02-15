import mongoose from "mongoose";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDatabase = async () => {
  try {
    await mongoose.connect( "mongodb+srv://tothje98:testpassword@cluster0.yvwpywb.mongodb.net/mongonosz", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Sikeres csatlakozás az adatbázishoz");

    const jsonFileName = "HotelArray.json";
    const jsonFilePath = path.resolve(__dirname, jsonFileName);
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

 const HotelSchema = new mongoose.Schema({
title: String, 
localizedName:String,
locationV2:String, 
rating: Number,
photo:String,
})

const Hotel = mongoose.model("hotel", HotelSchema);

    const result = await Hotel.insertMany(jsonData);
    console.log("Adatok importálása sikeres:", result);
  } catch (err) {
    console.log("Hiba az adatok importálása során:", err);
  } finally {
    mongoose.connection.close();
  }
};

connectDatabase();
