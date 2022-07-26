import express from "express";
import city from "./cityRouter.js";

const routes = (app) => {
    app.route('/about').get((req, res) => {
        res.status(200).send("working and ready")
    });
        app.use(express.json(), city);
};

export default routes;

        