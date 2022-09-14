import { Purchase } from "../src/Purchase";
import { PurchaseItem } from "../src/PurchaseItem";

describe("src > class Purchase", () => {
    test("Não deve criar um pedido com o cpf inválido", function () {
        expect(() => new Purchase("054646")).toThrow(new Error("Invalid CPF"));
    });

    test("Deve criar um pedido vazio", function () {
        const purchase = new Purchase("111.444.777-35");
        expect(purchase).toBeInstanceOf(Purchase);
    });

    test("Deve adicionar um item a um pedido vazio", function () {
        const purchase = new Purchase("111.444.777-35");
        const firstItem = new PurchaseItem("IPhone X", 1, 3500);
        purchase.addItem(firstItem);
        expect(purchase.items.length).not.toBe(0);
        expect(purchase.getTotal()).toBe(3500);
    });

    test("Deve adicionar varios itens a um pedido vazio", function () {
        const purchase = new Purchase("111.444.777-35");
        const firstItem = new PurchaseItem("IPhone X", 1, 3500);
        const secondItem = new PurchaseItem("Apple Watch", 1, 1900);
        const thirdItem = new PurchaseItem("Air Pods", 1, 1000);
        purchase.addItems([firstItem, secondItem, thirdItem]);
        expect(purchase.items.length).not.toBe(0);
        expect(purchase.getTotal()).toBe(6400);
    });

    test("Deve remover um item do pedido", function () {
        const purchase = new Purchase("111.444.777-35");
        const firstItem = new PurchaseItem("IPhone X", 1, 3500);
        const secondItem = new PurchaseItem("Apple Watch", 1, 1900);
        const thirdItem = new PurchaseItem("Air Pods", 1, 1000);
        purchase.addItems([firstItem, secondItem, thirdItem]);
        expect(purchase.items.length).toBe(3);
        purchase.removeItem(firstItem);
        expect(purchase.items.find(item => item.id === firstItem.id)).toBeFalsy();
    });

    test("Deve criar um pedido com cupom de desconto (percentual sobre o total do pedido)", function () {
        const purchase = new Purchase("111.444.777-35", 20);
        const firstItem = new PurchaseItem("IPhone X", 1, 3500);
        const secondItem = new PurchaseItem("Apple Watch", 1, 1900);
        const thirdItem = new PurchaseItem("Air Pods", 1, 1000);
        purchase.addItems([firstItem, secondItem, thirdItem]);
        expect(purchase.getNetTotal()).toBe(5120);
        expect(purchase.getDiscount()).toBe(1280);
        expect(purchase.getTotal()).toBe(6400);
    });

    test("Deve adicionar um cupom de desconto  a um pedido", function () {
        const purchase = new Purchase("111.444.777-35");
        const firstItem = new PurchaseItem("IPhone X", 1, 3500);
        const secondItem = new PurchaseItem("Apple Watch", 1, 1900);
        purchase.addItems([firstItem, secondItem]);
        purchase.addDiscount(40);
        expect(purchase.getNetTotal()).toBe(3240);
        expect(purchase.getDiscount()).toBe(2160);
        expect(purchase.getDiscountPercent()).toBe(40);
        expect(purchase.getTotal()).toBe(5400);
    });
});