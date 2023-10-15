import CreateDriver from "../../src/application/usecase/CreateDriver";
import DriverRepositoryDatabase from "../../src/infra/repository/DriverRepositoryDatabase";

test("Deve cadastrar um motorista", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-71",
        carPlate: "ABC1234",
    }
    const usecase = new CreateDriver(new DriverRepositoryDatabase());
    const output = await usecase.execute(input);
    expect(output.driverId).toBeDefined();
})
