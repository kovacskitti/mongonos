import mongoose from "mongoose";
import { Schema, model } from "mongoose";


const CitySchema = new Schema({
  geoId: Number,
  locationId: Number,
  localizedName: String,
  localizedAdditionalNames: String,
  locationV2: String,
  placeType: String,
  latitude: Number,
  longitude: Number,
  picture: String,
  
});

const City = model("city", CitySchema);

export default City;
