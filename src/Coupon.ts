export default class Coupon {

    constructor(readonly description: string, readonly value: number, readonly expiration: Date) {
    }

    getDiscount = (total: number): number => {
        return total * (this.value / 100);
    }
}