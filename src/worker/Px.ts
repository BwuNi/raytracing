export default class Px {
    static width = 0
    static height = 0

    color = [255, 255, 255, 255]

    x: number
    y: number
    width: number
    height: number

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
    }

    fill(r: number, g: number, b: number, a: number) {
        this.color = [r, g, b, a]
    }
}