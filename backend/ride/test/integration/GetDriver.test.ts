import CreateDriver from "../../src/application/usecase/CreateDriver";
import GetDriver from "../../src/application/usecase/GetDriver";

test("Deve obter um motorista", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-71",
        car_plate: "ABC-1234",
    }
    const createDriver = new CreateDriver();
    const outputCreate = await createDriver.execute(input);
    const getDriver = new GetDriver();
    const outputGet = await getDriver.execute({ driverId: outputCreate.driver_id });
    expect(outputGet.name).toBe("John Doe")
    expect(outputGet.email).toBe("johndoe@pm.me")
    expect(outputGet.document).toBe("732.952.620-71")
    expect(outputGet.car_plate).toBe("ABC-1234")
});
