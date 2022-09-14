import { v4 as uuid } from 'uuid';

export class PurchaseItem {
    readonly id: string;

    constructor(readonly description: string, readonly quantity: number, readonly value: number,) {
        this.id = uuid();
    }
}