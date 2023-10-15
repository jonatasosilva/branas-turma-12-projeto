import CarPlate from "../../src/domain/CarPlate";

test("Deve criar uma placa válida", function () {
    const carPlate = new CarPlate("AAA9999");
    expect(carPlate).toBeDefined();
})

test("Não deve criar uma placa inválida", function () {
    expect(() => new CarPlate("AAA999")).toThrow(new Error("Invalid car plate"));
})