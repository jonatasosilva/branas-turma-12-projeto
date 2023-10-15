import 'dotenv/config'
import pgp from "pg-promise";
import PassengerRepository from '../../application/repository/PassengerRepository';

export default class PassengerRepositoryDatabase implements PassengerRepository {
    async save(passenger: any): Promise<void> {
        const connection = pgp()(process.env.DATABASE_URL ?? '');
        await connection.query("INSERT INTO cccat12.passenger (passenger_id, name, email, document) VALUES ($1, $2, $3, $4)", [passenger.passengerId, passenger.name, passenger.email, passenger.document]);
        await connection.$pool.end();
    }

    async get(passengerId: string): Promise<any> {
        const connection = pgp()(process.env.DATABASE_URL ?? '');
        const [passengerData] = await connection.query("SELECT * FROM cccat12.passenger WHERE passenger_id = $1", [passengerId]);
        await connection.$pool.end();
        return passengerData;
    }
}