import express from "express";
import CreatePassenger from "./application/usecase/CreatePassenger";
import CreateDriver from "./application/usecase/CreateDriver";
import CalculateRide from "./application/usecase/CalculateRide";
import GetPassenger from "./application/usecase/GetPassenger";
import GetDriver from "./application/usecase/GetDriver";

const app = express();

app.use(express.json());

app.post("/calculate_ride", async function (req, res) {
    try {
        const usecase = new CalculateRide();
        const output = await usecase.execute(req.body);
        res.json(output);
    } catch (e: any) {
        res.status(422).send(e.message);
    }
});

app.post("/passengers", async function (req, res) {
    try {
        const registerPassenger = new CreatePassenger();
        const output = await registerPassenger.execute(req.body)
        res.status(201).json(output)
    } catch (e: any) {
        res.status(422).send(e.message)
    }
});

app.get("/passengers/:passengerId", async function (req, res) {
    try {
        const usecase = new GetPassenger();
        const output = await usecase.execute(req.params)
        res.json(output)
    } catch (e: any) {
        res.status(422).send(e.message)
    }
});

app.post("/drivers", async function (req, res) {
    try {
        const registerDriver = new CreateDriver();
        const output = await registerDriver.execute(req.body)
        res.status(201).json(output)
    } catch (e: any) {
        res.status(422).send(e.message)
    }
});

app.get("/drivers/:driverId", async function (req, res) {
    try {
        const usecase = new GetDriver();
        const output = await usecase.execute(req.params)
        res.json(output)
    } catch (e: any) {
        res.status(422).send(e.message)
    }
});

app.listen(3000);
