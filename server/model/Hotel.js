import mongoose from "mongoose";
import {Schema, model} from 'mongoose';



const HotelSchema = new Schema({
title: String, 
secondaryInfo:String, 
rating: Number,
photo:String,
})

const Hotel = model("hotel", HotelSchema);

export default Hotel;