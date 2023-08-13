import CreateDriver from "../../src/application/usecase/CreateDriver";

test("Deve cadastrar um motorista", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-71",
        car_plate: "ABC-1234",
    }
    const usecase = new CreateDriver()
    const output = await usecase.execute(input);
    expect(output.driver_id).toBeDefined();
})
