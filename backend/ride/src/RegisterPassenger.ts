// @ts-nocheck
import 'dotenv/config'
import crypto from "crypto";
import pgp from "pg-promise";
import { validate } from './cpf';

export default class RegisterPassenger {
    constructor() { }

    async execute(input: Input): Promise<Output> {
        if (!validate(input.document)) throw new Error("Invalid document")
        const passengerId = crypto.randomUUID();
        const connection = pgp()(process.env.DATABASE_URL);
        await connection.query("INSERT INTO passengers (passenger_id, name, email, document) VALUES ($1, $2, $3, $4)", [passengerId, input.name, input.name, input.document]);
        await connection.$pool.end();
        return { passenger_id: passengerId }
    }
}

type Input = {
    name: string,
    email: string,
    document: string
}

type Output = {
    passenger_id: string
}