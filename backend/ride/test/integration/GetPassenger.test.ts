import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";

test("Deve obter um passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-71"
    }
    const createPassenger = new CreatePassenger();
    const outputCreate = await createPassenger.execute(input);
    const getPassenger = new GetPassenger();
    const outputGet = await getPassenger.execute({ passengerId: outputCreate.passenger_id });
    expect(outputGet.name).toBe("John Doe")
    expect(outputGet.email).toBe("johndoe@pm.me")
    expect(outputGet.document).toBe("732.952.620-71")
});
