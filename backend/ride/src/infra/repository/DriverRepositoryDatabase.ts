import 'dotenv/config'
import pgp from "pg-promise";
import DriverRepository from '../../application/repository/DriverRepository';
import Driver from '../../domain/Driver';

export default class DriverRepositoryDatabase implements DriverRepository {
    async save(driver: Driver): Promise<void> {
        const connection = pgp()(process.env.DATABASE_URL ?? '');
        await connection.query("INSERT INTO cccat12.driver (driver_id, name, email, document, car_plate) VALUES ($1, $2, $3, $4, $5)", [driver.driverId, driver.name, driver.email.value, driver.document.value, driver.carPlate.value]);
        await connection.$pool.end();
    }

    async get(driverId: string): Promise<Driver> {
        const connection = pgp()(process.env.DATABASE_URL ?? '');
        const [driverData] = await connection.query("SELECT * FROM cccat12.driver WHERE driver_id = $1", [driverId]);
        await connection.$pool.end();
        return new Driver(driverData.driver_id, driverData.name, driverData.email, driverData.document, driverData.car_plate);
    }
}