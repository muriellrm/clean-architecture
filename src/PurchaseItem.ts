import { v4 as uuid } from "uuid";

export default class PurchaseItem {
    readonly id: string;

    constructor(readonly idItem: string, readonly quantity: number, readonly price: number) {
        this.id = uuid();
    }

    getTotal() {
        return this.quantity * this.price;
    }
}