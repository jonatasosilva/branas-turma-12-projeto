import CreatePassenger from "../../src/application/usecase/CreatePassenger";

test("Deve cadastrar um passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-71"
    }
    const usecase = new CreatePassenger();
    const output = await usecase.execute(input);
    expect(output.passenger_id).toBeDefined();
})
