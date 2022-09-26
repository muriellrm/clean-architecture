import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import PurchaseItem from "./PurchaseItem";

export default class Purchase {
    cpf: Cpf;
    purchaseItems: PurchaseItem[];
    private coupon?: Coupon;

    constructor(cpf: string) {
        this.cpf = new Cpf(cpf);
        this.purchaseItems = [];
    }

    addItem = (item: Item, quantity: number, price: number) => {
        const itemAlreadyExists = this.purchaseItems.find(purchaseItem => purchaseItem.idItem === item.id);
        if(itemAlreadyExists){
            throw new Error("This item has already been added to your order.");
        }
        this.purchaseItems.push(new PurchaseItem(item.id, quantity, price));
    }

    addCoupon = (coupon: Coupon) => {
        const today = new Date();
        if (today.getTime() > coupon.expiration.getTime()) {
            throw new Error("This coupon is already expired");
        }
        this.coupon = coupon;
    }

    getTotal = () => {
        let total = this.purchaseItems.reduce((total, item) => total + item.getTotal(), 0);
        if (this.coupon) {
            total -= this.coupon.getDiscount(total);
        }
        return total;
    }

}