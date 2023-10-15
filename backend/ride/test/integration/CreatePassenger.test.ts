import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";

test("Deve cadastrar um passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-71"
    }
    const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
    const output = await usecase.execute(input);
    expect(output.passengerId).toBeDefined();
})

test("Não deve cadastrar um passageiro com email inválido", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm",
        document: "732.952.620-71"
    }
    const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
    await expect(() => usecase.execute(input)).rejects.toThrow(new Error("Invalid email"));
})
