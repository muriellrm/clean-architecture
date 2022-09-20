import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Purchase from "../src/Purchase";

describe("src > class Purchase", () => {
    test("Não deve criar um pedido com cpf inválido", function () {
        expect(() => new Purchase("456465")).toThrow(new Error("Invalid CPF"))
    });

    test("Deve criar um pedido com 3 itens (com descrição, preço e quantidade)", function () {
        const purchase = new Purchase("004.799.499-13");
        purchase.addItem(new Item("Guitarra"), 1, 5000);
        purchase.addItem(new Item("Cordas Dário"), 1, 50);
        purchase.addItem(new Item("Palhetas"), 5, 1);
        expect(purchase.getTotal()).toBe(5055);
    });

    test("Deve criar um pedido com cupom de desconto (percentual sobre o total do pedido)", function () {
        const purchase = new Purchase("004.799.499-13");
        purchase.addItem(new Item("Guitarra"), 1, 5000);
        purchase.addItem(new Item("Cordas Dário"), 1, 50);
        purchase.addItem(new Item("Palhetas"), 5, 1);
        purchase.addCoupon(new Coupon("VALE20", 20));
        expect(purchase.getTotal()).toBe(4044);
    });
});