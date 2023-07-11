// @ts-nocheck
import 'dotenv/config'
import crypto from "crypto";
import pgp from "pg-promise";
import { validate } from './cpf';

export default class RegisterDriver {
    constructor() { }

    async execute(input: Input): Promise<Output> {
        if (!validate(input.document)) throw new Error("Invalid document")
        const driverId = crypto.randomUUID();
        const connection = pgp()(process.env.DATABASE_URL);
        await connection.query("INSERT INTO drivers (driver_id, name, email, document, car_plate) VALUES ($1, $2, $3, $4, $5)", [driverId, input.name, input.name, input.document, input.car_plate]);
        await connection.$pool.end();
        return { driver_id: driverId }
    }
}

type Input = {
    name: string,
    email: string,
    document: string
    car_plate: string
}

type Output = {
    driver_id: string
}