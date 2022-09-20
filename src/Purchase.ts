import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import PurchaseItem from "./PurchaseItem";

export default class Purchase {
    cpf: Cpf;
    purchaseItem: PurchaseItem[];
    private coupon?: Coupon;

    constructor(cpf: string) {
        this.cpf = new Cpf(cpf);
        this.purchaseItem = [];
    }

    addItem = (item: Item, quantity: number, price: number) => {
        this.purchaseItem.push(new PurchaseItem(item.id, quantity, price));
    }

    addCoupon = (coupon: Coupon) => {
        this.coupon = coupon;
    }

    getTotal = () => {
        let total = this.purchaseItem.reduce((total, item) => total + item.getTotal(), 0);
        if(this.coupon){
            total -= this.coupon.getDiscount(total);
        }
        return total;
    }

}