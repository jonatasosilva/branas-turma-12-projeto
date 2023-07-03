// @ts-nocheck
import 'dotenv/config'
import pgp from "pg-promise";
import { validate } from './cpf';

export default class RegisterDriver {
    constructor() { }

    async execute(input: Input): Promise<Output> {
        if (!validate(input.document)) throw new Error("Invalid document")
        const connection = pgp()(process.env.DATABASE_URL);
        const [driver] = await connection.query("INSERT INTO drivers (name, email, document, car_plate) VALUES ($1, $2, $3, $4) RETURNING id", [input.name, input.name, input.document, input.car_plate]);
        await connection.$pool.end();
        return { driver_id: driver.id }
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