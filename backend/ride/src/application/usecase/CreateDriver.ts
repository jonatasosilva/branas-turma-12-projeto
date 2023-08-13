// @ts-nocheck
import 'dotenv/config'
import crypto from "crypto";
import pgp from "pg-promise";
import Cpf from '../../Cpf';


export default class CreateDriver {
    constructor() { }

    async execute(input: Input): Promise<Output> {
        const document = new Cpf(input.document);
        const driverId = crypto.randomUUID();
        const connection = pgp()(process.env.DATABASE_URL);
        await connection.query("INSERT INTO drivers (driver_id, name, email, document, car_plate) VALUES ($1, $2, $3, $4, $5)", [driverId, input.name, input.email, document.value, input.car_plate]);
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