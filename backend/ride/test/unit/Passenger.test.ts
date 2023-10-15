import Passenger from "../../src/domain/Passenger";

test("Deve criar um passageiro", function () {
    const passenger = Passenger.create("John Doe", "john.doe@gmail.com", "732.952.620-71");
    expect(passenger.passengerId).toBeDefined();
    expect(passenger.name).toBe("John Doe");
    expect(passenger.email.value).toBe("john.doe@gmail.com");
    expect(passenger.document.value).toBe("732.952.620-71");
})

test("Não deve criar um passageiro com cpf inválido", function () {
    expect(() => Passenger.create("John Doe", "john.doe@gmail.com", "732.952.620-72")).toThrow(new Error("Invalid cpf"));
})

test("Não deve criar um passageiro com email inválido", function () {
    expect(() => Passenger.create("John Doe", "john.doe@gmail", "732.952.620-71")).toThrow(new Error("Invalid email"));
})