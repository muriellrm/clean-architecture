export default class PurchaseItem {

    constructor(readonly idItem: string, readonly quantity: number, readonly price: number) {       
        if(quantity < 1) {
            throw new Error("Invalid quantity, you must provide a valid quantity!");
        } 
    }

    getTotal() {
        return this.quantity * this.price;
    }
}