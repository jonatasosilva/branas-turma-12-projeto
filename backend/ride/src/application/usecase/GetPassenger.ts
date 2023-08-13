// @ts-nocheck
import 'dotenv/config'
import pgp from "pg-promise";

export default class GetPassenger {
    async execute(input: Input): Promise<Output> {
        const connection = pgp()(process.env.DATABASE_URL);
        const [passengerData] = await connection.query("select * from passengers where passenger_id = $1", [input.passengerId]);
        await connection.$pool.end();
        return {
            passanger_id: passengerData.passanger_id,
            name: passengerData.name,
            email: passengerData.email,
            document: passengerData.document,
        };
    }
}

type Input = {
    passengerId: string
}

type Output = {
    passanger_id: string,
    name: string,
    email: string,
    document: string
}
