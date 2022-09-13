import { isValidCpf } from "../src/isValidCpf";

describe("src > isValidCpf", () => {
    test("Deve testar um cpf válido", function () {
        const cpf = isValidCpf("004.799.499-13");
        expect(cpf).toBeTruthy();
    });

    test("Deve testar um cpf válido sem mascara", function () {
        const cpf = isValidCpf("05479949900");
        expect(cpf).toBeTruthy();
    });

    test("Deve testar um cpf com menos caracteres", function () {
        const cpf = isValidCpf("05479")
        expect(cpf).not.toBeTruthy();
    });

    test("Deve testar um cpf com mais caracteres", function () {
        const cpf = isValidCpf("05479998798798798")
        expect(cpf).not.toBeTruthy();
    });

    test("Deve testar um cpf inválido", function () {
        const cpf = isValidCpf("012.345.678-91");
        expect(cpf).not.toBeTruthy();
    });

    test("Deve testar um cpf undefined", function () {
        const cpf = isValidCpf();
        expect(cpf).not.toBeTruthy();
    });

    test("Deve testar um cpf com numeros iguais", function () {
        const cpf = isValidCpf("00000000000");
        expect(cpf).not.toBeTruthy();
    });
});