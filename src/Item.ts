import { v4 as uuid } from "uuid";
import Dimension from "./Dimension";

export default class Item {
    readonly id: string;
    dimension?: Dimension;
    weight?: number;

    constructor(readonly description: string, readonly price: number) {
        this.id = uuid();
    }

    addDimension = (height: number, width: number, depth: number) => {
        this.dimension = new Dimension(height, width, depth);
    }

    addWeight = (weight: number) => {
        if (weight < 0) {
            throw new Error("Invalid weight.");
        }
        this.weight = weight;
    }
}