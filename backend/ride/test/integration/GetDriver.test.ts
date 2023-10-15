import CreateDriver from "../../src/application/usecase/CreateDriver";
import GetDriver from "../../src/application/usecase/GetDriver";
import Driver from "../../src/domain/Driver";
import DriverRepositoryDatabase from "../../src/infra/repository/DriverRepositoryDatabase";

test("Deve obter um motorista", async function () {
    const driverRepository: DriverRepositoryDatabase = {
        async save(driver: any): Promise<void> {
        },
        async get(driverId): Promise<any> {
            return Driver.create("John Doe", "johndoe@pm.me", "732.952.620-71", "ABC1234")
        },
    }
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-71",
        carPlate: "ABC1234",
    }
    const createDriver = new CreateDriver(driverRepository);
    const outputCreate = await createDriver.execute(input);
    const getDriver = new GetDriver(driverRepository);
    const outputGet = await getDriver.execute({ driverId: outputCreate.driverId });
    expect(outputGet.name).toBe("John Doe")
    expect(outputGet.email).toBe("johndoe@pm.me")
    expect(outputGet.document).toBe("732.952.620-71")
    expect(outputGet.carPlate).toBe("ABC1234")
});
