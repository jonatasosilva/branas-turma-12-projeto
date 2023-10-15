import Driver from "../../src/domain/Driver";

test("Deve criar um motorista", function () {
    const driver = Driver.create("John Doe", "john.doe@gmail.com", "732.952.620-71", "AAA9999");
    expect(driver.driverId).toBeDefined();
    expect(driver.name).toBe("John Doe");
    expect(driver.email.value).toBe("john.doe@gmail.com");
    expect(driver.document.value).toBe("732.952.620-71");
    expect(driver.carPlate.value).toBe("AAA9999");
})

test("Não deve criar um motorista com cpf inválido", function () {
    expect(() => Driver.create("John Doe", "john.doe@gmail.com", "732.952.620-72", "AAA9999")).toThrow(new Error("Invalid cpf"));
})

test("Não deve criar um motorista com email inválido", function () {
    expect(() => Driver.create("John Doe", "john.doe@gmail", "732.952.620-71", "AAA9999")).toThrow(new Error("Invalid email"));
})

test("Não deve criar um motorista com placa do carro inválida", function () {
    expect(() => Driver.create("John Doe", "john.doe@gmail.com", "732.952.620-71", "AAA999")).toThrow(new Error("Invalid car plate"));
})