import Email from "../../src/domain/Email";

test("Deve criar um email", function () {
    const email = new Email("john.doe@pm.me");
    expect(email).toBeDefined();
})

test("Não deve criar um email inválido", function () {
    expect(() => new Email("john.doe@pm")).toThrow(new Error("Invalid email"));
})