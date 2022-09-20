export default class Coupon {

    constructor(readonly description: string, readonly value: number) {
    }

    getDiscount = (total: number): number => {
        return total * (this.value / 100);
    }
}