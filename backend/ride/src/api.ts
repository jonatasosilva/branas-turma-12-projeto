// @ts-nocheck
import express from "express";
import Ride from "./Ride";
import CreatePassenger from "./CreatePassenger";
import CreateDriver from "./CreateDriver";
import pgp from "pg-promise";

const app = express();

app.use(express.json());

app.post("/calculate_ride", function (req, res) {
    try {
        const ride = new Ride();
        for (const segment of req.body.segments) {
            ride.addSegment(segment.distance, new Date(segment.date));
        }
        const price = ride.calculate();
        res.json({ price });
    } catch (e) {
        res.status(422).send(e.message);
    }
});

app.post("/passengers", async function (req, res) {
    try {
        const registerPassenger = new CreatePassenger();
        const output = await registerPassenger.execute(req.body)
        res.status(201).json(output)
    } catch (e) {
        res.status(422).send(e.message)
    }
});

app.get("/passengers/:passengerId", async function (req, res) {
    const connection = pgp()(process.env.DATABASE_URL);
    const [passengerData] = await connection.query("select * from passengers where passenger_id = $1", [req.params.passengerId]);
    await connection.$pool.end();
    res.json(passengerData);
});

app.post("/drivers", async function (req, res) {
    try {
        const registerDriver = new CreateDriver();
        const output = await registerDriver.execute(req.body)
        res.status(201).json(output)
    } catch (e) {
        res.status(422).send(e.message)
    }
});

app.listen(3000);
