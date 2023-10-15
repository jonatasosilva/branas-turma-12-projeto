import axios from "axios";

axios.defaults.validateStatus = function () {
    return true;
};

async function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
    const input = {
        segments: [
            { distance: 10, date: "2021-03-01T10:00:00" }
        ]
    };
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    const output = response.data;
    expect(output.price).toBe(21);
});

test("Se a distância for inválida deve lançar um erro", async function () {
    const input = {
        segments: [
            { distance: -10, date: "2021-03-01T10:00:00" }
        ]
    };
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("Invalid distance");
});

test("Não deve cadastrar um passageiro se o CPF for inválido", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-72"
    }
    const response = await axios.post("http://localhost:3000/passengers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("Invalid cpf");
})


test("Deve cadastrar um passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-71"
    }
    const response = await axios.post("http://localhost:3000/passengers", input);
    expect(response.status).toBe(201);
    const output = response.data;
    expect(output.passengerId).toBeDefined();
})

test("Deve obter um passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-71"
    }
    const responseCreate = await axios.post("http://localhost:3000/passengers", input);
    expect(responseCreate.status).toBe(201);
    const outputCreate = responseCreate.data;
    await sleep(100);
    const responseGet = await axios.get(`http://localhost:3000/passengers/${outputCreate.passengerId}`);
    const outputGet = responseGet.data;
    expect(outputGet.name).toBe("John Doe")
    expect(outputGet.email).toBe("johndoe@pm.me")
    expect(outputGet.document).toBe("732.952.620-71")
});

test("Não deve cadastrar um motorista se o CPF for inválido", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-72",
        car_plate: "ABC1234",
    }
    const response = await axios.post("http://localhost:3000/drivers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("Invalid cpf");
})


test("Deve cadastrar um motorista", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-71",
        carPlate: "ABC1234",
    }
    const response = await axios.post("http://localhost:3000/drivers", input);
    expect(response.status).toBe(201);
    const output = response.data;
    expect(output.driverId).toBeDefined();
})

test("Deve obter um motorista", async function () {
    const input = {
        name: "John Doe",
        email: "johndoe@pm.me",
        document: "732.952.620-71",
        carPlate: "ABC1234",
    }
    const responseCreate = await axios.post("http://localhost:3000/drivers", input);
    expect(responseCreate.status).toBe(201);
    const outputCreate = responseCreate.data;
    await sleep(200);
    const responseGet = await axios.get(`http://localhost:3000/drivers/${outputCreate.driverId}`)
    const outputGet = responseGet.data;
    expect(outputGet.name).toBe("John Doe")
    expect(outputGet.email).toBe("johndoe@pm.me")
    expect(outputGet.document).toBe("732.952.620-71")
    expect(outputGet.carPlate).toBe("ABC1234")
})
