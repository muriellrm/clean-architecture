export default class Dimension {
    constructor(readonly height: number, readonly width: number, readonly depth: number) {
        if (height < 0 || width < 0 || depth < 0) {
            throw new Error("Invalid dimension.")
        }
    }

    getCubage() {
        return (this.height * this.width * this.depth) / 1000000;
    }
}