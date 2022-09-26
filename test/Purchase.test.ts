import CalculateFreight from "../src/CalculateFreight";
import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Purchase from "../src/Purchase";

let purchase: Purchase;
let item1: Item;
let item2: Item;
let item3: Item;
let coupon20: Coupon;

describe("src > class Purchase", () => {

    beforeEach(() => {
        purchase = new Purchase("004.799.499-13");
        item1 = new Item("Guitarra", 5900);
        item2 = new Item("Cordas Dário", 59.90);
        item3 = new Item("Palhetas", 2.50);
        coupon20 = new Coupon("VALE20", 20, new Date())
    })

    test("Não deve criar um pedido com cpf inválido", () => {
        expect(() => new Purchase("456465")).toThrow(new Error("Invalid CPF"))
    });

    test("Deve criar um pedido com 3 itens (com descrição, preço e quantidade)", () => {
        purchase.addItem(item1, 1, 5000);
        purchase.addItem(item2, 1, 50);
        purchase.addItem(item3, 5, 1);
        expect(purchase.getTotal()).toBe(5055);
    });

    test("Deve criar um pedido com cupom de desconto (percentual sobre o total do pedido)", () => {
        purchase.addItem(item1, 1, 5900);
        purchase.addCoupon(coupon20);
        expect(purchase.getTotal()).toBe(4720);
    });

    test("Não deve aplicar cupom de desconto expirado", () => {
        const expiredCoupon = new Coupon("VALE20", 20, new Date(2022, 1, 1));
        expect(() => purchase.addCoupon(expiredCoupon)).toThrow(new Error("This coupon is already expired"));
    });

    test("Ao fazer um pedido, a quantidade de um item não pode ser negativa", () => {
        expect(() => purchase.addItem(item1, -1, 5000)).toThrow(new Error("Invalid quantity, you must provide a valid quantity!"));
    });

    test("Ao fazer um pedido, o mesmo item não pode ser informado mais de uma vez", () => {
        purchase.addItem(item1, 1, 5900);
        expect(() => purchase.addItem(item1, 1, 5000)).toThrow(new Error("This item has already been added to your order."));
    });

    test("Nenhuma dimensão do item pode ser negativa", () => {
        expect(() => item1.addDimension(-1, 2, 3)).toThrow(new Error("Invalid dimension."));
        expect(() => item2.addDimension(1, -2, 3)).toThrow(new Error("Invalid dimension."));
        expect(() => item3.addDimension(1, 2, -3)).toThrow(new Error("Invalid dimension."));
    });

    test("O peso do item não pode ser negativo", () => {
        expect(() => item1.addWeight(-1)).toThrow(new Error("Invalid weight."));
    });

    test("Deve calcular o valor do frete com base nas dimensões (altura, largura e profundidade em cm) e o peso dos produtos (em kg)", () => {
        item1.addDimension(8.5, 101.6, 36.5);
        item1.addWeight(3.5);
        const freight = new CalculateFreight(item1);

        expect(freight.getFreight()).toBe(35);
    });

    test("Deve retornar o preço mínimo de frete caso ele seja superior ao valor calculado", () => {
        const freight = new CalculateFreight(item1);
        expect(freight.getFreight()).toBe(10);
    });
});