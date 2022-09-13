export class Cpf {
    private CPF_DIGIT_10 = 10;
    private CPF_DIGIT_11 = 11;

    constructor(readonly cpf?: string) {
        if (!this.isValidCpf(cpf)) throw new Error("Invalid CPF")
        this.cpf = this.removeNonDigits(cpf);
    }

    private isValidCpf = (cpf?: string) => {
        if (!cpf) return false;
        cpf = this.removeNonDigits(cpf);
        if (!this.isValidLength(cpf)) return false;
        if (this.allDigitsIsTheSame(cpf)) return false;
        const digitTen = this.calculateDigits(cpf, this.CPF_DIGIT_10);
        const digitEleven = this.calculateDigits(cpf, this.CPF_DIGIT_11);
        const cpfLastDigits = cpf.slice(-2);
        const calculatedLastDigits = `${digitTen}${digitEleven}`;
        return calculatedLastDigits.includes(cpfLastDigits);
    }

    private removeNonDigits = (cpf?: string): string => cpf ? cpf.replace(/\D/g, "") : "";

    private isValidLength = (cpf: string): boolean => cpf.length === 11;

    private allDigitsIsTheSame = (cpf: string): boolean => {
        const [firstDigit] = cpf;
        return [...cpf].every(digit => digit === firstDigit);
    }

    private calculateDigits = (cpf: string, cpfDigit: number): number => {
        const cpfToNumber: number[] = [...cpf].map(Number);
        const total = cpfToNumber.reduce((total, digit) => (cpfDigit > 1 ? total + (digit * cpfDigit--) : total), 0);
        const rest = total % 11;
        return rest < 2 ? 0 : 11 - rest;
    }
}