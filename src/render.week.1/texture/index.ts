import Vec3 from "../base/Vec3";

interface Texture {
    value: (u: number, v: number, p: Vec3) => Vec3
}



class Color implements Texture {
    color: Vec3
    constructor(c: Vec3) {
        this.color = c
    }
    value(u: number, v: number, p: Vec3): Vec3 {
        return this.color
    }
}

class Checker implements Texture {
    odd: Texture
    even: Texture

    constructor(odd: Texture, even: Texture) {
        this.odd = odd
        this.even = even
    }

    value(u: number, v: number, p: Vec3): Vec3 {
        const sines = Math.sin(10 * p.e0) * Math.sin(10 * p.e1) * Math.sin(10 * p.e2)
        return sines < 0 ? this.odd.value(u, v, p) : this.even.value(u, v, p)
    }

}



class Perlin {
    nosie(p:Vec3) {
    }
}

export default Texture

export {
    Color,
    Checker
}

