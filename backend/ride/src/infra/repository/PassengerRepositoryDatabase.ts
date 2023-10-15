import 'dotenv/config'
import pgp from "pg-promise";
import PassengerRepository from '../../application/repository/PassengerRepository';
import Passenger from '../../domain/Passenger';

export default class PassengerRepositoryDatabase implements PassengerRepository {
    async save(passenger: Passenger): Promise<void> {
        const connection = pgp()(process.env.DATABASE_URL ?? '');
        await connection.query("INSERT INTO cccat12.passenger (passenger_id, name, email, document) VALUES ($1, $2, $3, $4)", [passenger.passengerId, passenger.name, passenger.email.value, passenger.document.value]);
        await connection.$pool.end();
    }

    async get(passengerId: string): Promise<Passenger> {
        const connection = pgp()(process.env.DATABASE_URL ?? '');
        const [passengerData] = await connection.query("SELECT * FROM cccat12.passenger WHERE passenger_id = $1", [passengerId]);
        await connection.$pool.end();
        return new Passenger(passengerData.passenger_id, passengerData.name, passengerData.email, passengerData.document);
    }
}