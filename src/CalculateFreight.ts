import Item from "./Item";

export default class CalculateFreight {
    private MIN_FRIGHT = 10;
    constructor(readonly item: Item) { }

    private getDensity = () => {
        if (this.item.weight && this.item.dimension) {
            return this.item.weight / this.item.dimension.getCubage();
        }
        return 0;
    }

    getFreight = () => {
        const freight = Math.round(1000 * (this.item.dimension?.getCubage() || 0) * (this.getDensity() / 100));
        return freight > this.MIN_FRIGHT ? freight : 10;
    }
}