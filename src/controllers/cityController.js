import city from "../schema/citiesSchema.js";
import axios from "axios";
import NodeCache from "node-cache";
import circuitBreaker from "opossum";

const shortCache = new NodeCache({ stdTTL: 10, useClones: false });
const longCache = new NodeCache({ stdTTL: 3600, checkperiod: 3660, useClones: false, deleteOnExpire: true });

function returnCity(req, res) {
    const cityName = req.params.name;
    //verifica o cache antes de buscar os dados no servidor, permitindo sua chamada mesmo sem internet.
    if (shortCache.has(cityName)) { // cache de vida curta 10segs
        console.log("from short cache");
        return res.send(shortCache.get(cityName));
    }
    if (longCache.has(cityName)) { // cache de vida longa 1h
        console.log("from long cache");
        return res.send(longCache.get(cityName));
    }
    city.findOne({ name: cityName }, (err, city) => {
        try {
            const apiKey = process.env.API_KEY;
            let lng = city.lng;
            let lat = city.lat;
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;
            axios.get(url).then(response => {
                shortCache.set(cityName, response.data);
                longCache.set(cityName, response.data);
                console.log("from api");
                /*                         breaker.fire()
                                        .catch(console.error); */
                res.status(200).send(response.data);
            })
                .catch(error => {
                    return res.status(500).send(error);
                });
        } catch (err) {
            return res.status(500).send(err);
        };
    });
};


/// por que não entendo isso?

const options = {
    timeout: 10000, // dispara a failure caso o servidor não responda em 10 segundos
    errorThresholdPercentage: 50, // dispara o fail se 50% das requests falharem
    resetTimeout: 3000, // apos 3 segundos, reinicia o circuito
};

//não é a melhor solução printar no console, mas é um exemplo
//instancia um novo circuitBreaker em uma função que pode falhar
const breaker = new circuitBreaker(returnCity, options);
breaker.fallback = () => {
    console.log("fallback");
}
breaker.on("fallback", () => {
    return "no data in cache";
});

//nunca vai retornar sucesso, pois não há chamada de close.
breaker.on("success", () => console.log("success"));
breaker.on("failure", () => console.log("failed"));
breaker.on("open", () => console.log("No API response"));
//fica halfopen indefinidamente porque está esperando um breaker.fire() para disparar close ou open
breaker.on("halfOpen", () => console.log("halfOpened"));
//nunca fica OK porque não há um breaker.fire() estabelecido
breaker.on("close", () => console.log("OK"));


export default returnCity;
