import express from "express";
import returnCity from "../controllers/cityController.js";

const router = express.Router();

router
.get("/:name", returnCity);
//.get("/:name", CityController.returnCityWeather);

export default router;

/* import express from "express";
import CityController from "../controllers/cityController.js";

const router = express.Router();

router
.get("/cities", CityController.returnCities)
.get("/:name", CityController.returnCity);
//.get("/:name", CityController.returnCityWeather);

export default router; */