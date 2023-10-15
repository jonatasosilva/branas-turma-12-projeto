import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";

async function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

test("Deve obter um passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-71"
    }
    const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase());
    const outputCreate = await createPassenger.execute(input);
    await sleep(100);
    const getPassenger = new GetPassenger(new PassengerRepositoryDatabase());
    const outputGet = await getPassenger.execute({ passengerId: outputCreate.passengerId });
    expect(outputGet.name).toBe("John Doe")
    expect(outputGet.email).toBe("johndoe@pm.me")
    expect(outputGet.document).toBe("732.952.620-71")
});
