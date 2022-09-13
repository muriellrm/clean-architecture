import { Cpf } from "../src/Cpf";

describe("src > class Cpf", () => {
    test("Deve testar um cpf válido", function () {
        const { cpf } = new Cpf("004.799.499-13");
        expect(cpf).toBe("00479949913");
    });

    test("Deve testar um cpf válido sem mascara", function () {
        const { cpf } = new Cpf("05479949900");
        expect(cpf).toBe("05479949900");
    });

    test("Deve testar um cpf com tamanho invalido", function () {
        expect(() => new Cpf("05479")).toThrow(new Error("Invalid CPF"));
    });

    test("Deve testar um cpf inválido", function () {
        expect(() => new Cpf("012.345.678-91")).toThrow(new Error("Invalid CPF"));
    });

    test("Deve testar um cpf undefined", function () {
        expect(() => new Cpf("")).toThrow(new Error("Invalid CPF"));
    });

    test("Deve testar um cpf com numeros iguais", function () {
        expect(() => new Cpf("00000000000")).toThrow(new Error("Invalid CPF"));
    });
});