// @ts-nocheck
import 'dotenv/config'
import pgp from "pg-promise";

export default class GetDriver {
    async execute(input: Input): Promise<Output> {
        const connection = pgp()(process.env.DATABASE_URL);
        const [driverData] = await connection.query("select * from drivers where driver_id = $1", [input.driverId]);
        await connection.$pool.end();
        return {
            driver_id: driverData.driver_id,
            name: driverData.name,
            email: driverData.email,
            document: driverData.document,
            car_plate: driverData.car_plate,
        };
    }
}

type Input = {
    driverId: string
}

type Output = {
    driver_id: string,
    name: string,
    email: string,
    document: string,
    car_plate: string
}
