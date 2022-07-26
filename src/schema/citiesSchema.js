import mongoose from "mongoose";

const citiesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lat: {type: String, required: true},
    lng: {type: String, required: true}});

const city = mongoose.model("city", citiesSchema);

export default city;