// @ts-nocheck
import 'dotenv/config'
import pgp from "pg-promise";
import { validate } from './cpf';

export default class RegisterPassenger {
    constructor() { }

    async execute(input: Input): Promise<Output> {
        if (!validate(input.document)) throw new Error("Invalid document")
        const connection = pgp()(process.env.DATABASE_URL);
        const [passenger] = await connection.query("INSERT INTO passengers (name, email, document) VALUES ($1, $2, $3) RETURNING id", [input.name, input.name, input.document]);
        await connection.$pool.end();
        return { passenger_id: passenger.id }
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