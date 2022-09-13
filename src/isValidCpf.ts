const CPF_DIGIT_10 = 10;
const CPF_DIGIT_11 = 11;

/**
 * @deprecated The method should not be used. It is just to academic endings
 */
export const isValidCpf = (cpf?: string) => {
    if (!cpf) return false;
    cpf = removeNonDigits(cpf);
    if (!isValidLength(cpf)) return false;
    if (allDigitsIsTheSame(cpf)) return false;
    const digitTen = calculateDigits(cpf, CPF_DIGIT_10);
    const digitEleven = calculateDigits(cpf, CPF_DIGIT_11);
    const cpfLastDigits = cpf.slice(-2);
    const calculatedLastDigits = `${digitTen}${digitEleven}`;
    return calculatedLastDigits == cpfLastDigits;
}

const removeNonDigits = (cpf: string): string => cpf.replace(/\D/g, "");

const isValidLength = (cpf: string): boolean => cpf.length === 11;

const allDigitsIsTheSame = (cpf: string): boolean => {
    const [firstDigit] = cpf;
    return [...cpf].every(digit => digit === firstDigit);
}

const calculateDigits = (cpf: string, cpfDigit: number): number => {
    const cpfToNumber: number[] = [...cpf].map(Number);
    const total = cpfToNumber.reduce((total, digit) => (cpfDigit > 1 ? total + (digit * cpfDigit--) : total), 0);
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
}
