import { v4 as uuid } from 'uuid';

import { Cpf } from "./Cpf";
import { PurchaseItem } from "./PurchaseItem";

export class Purchase {
    readonly id: string;
    customer: Cpf;
    items: PurchaseItem[];
    private discount: number = 0;

    constructor(cpf: string, discount: number = 0) {
        this.customer = new Cpf(cpf);
        this.items = [];
        this.discount = discount;
        this.id = uuid()
    }

    addItem = (item: PurchaseItem) => {
        this.items.push(item);
    }

    addItems = (items: PurchaseItem[]) => {
        this.items.push(...items);
    }

    removeItem = (item: PurchaseItem) => {
        const index = this.items.indexOf(item);
        this.items.splice(index, 1);
    }

    addDiscount = (discount: number) => {
        this.discount = discount;
    }

    getDiscountPercent = () => {
        return this.discount;
    }

    getDiscount = () => {
        return this.getTotal() * (this.discount / 100);
    }

    getTotal = () => {
        return this.items.reduce((total, item) => total + item.value, 0);
    }

    getNetTotal = () => {
        return this.getTotal() - this.getDiscount();
    }
}