
import axios from "axios";
import NodeCache from "node-cache"
import returnCity from "../controllers/cityController.js";

const myCache = new NodeCache({ stdTTL: 10});

function axiosRequest(url){
    try{
        axios.get(url).then(cityName, response => {
            return response.data;
        })
    }catch(err){
        console.log(err);
    }
}

export default axiosRequest;