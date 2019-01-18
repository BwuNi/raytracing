import Vec3, { axis } from "../base/Vec3";
import random from '../base/random'

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


class Nosie implements Texture {
    perlin = new Perlin()

    scale: number
    constructor(scale: number = 1) {
        this.scale =scale
    }

    value(u: number, v: number, p: Vec3): Vec3 {

        return new Vec3(1, 1, 1).mul(0.5).mul(
            1 + Math.sin(this.scale * p.e0 + 10 * this.perlin.turb(p)))

        return (new Vec3(1, 1, 1)).mul(this.perlin.turb(p.mul(this.scale)))
        
        return new Vec3(1, 1, 1).mul(0.5).mul(1 + this.perlin.nosie(p.mul(this.scale)))

    }

}

class Perlin {

    ranVec = Perlin.generate()
    perm_x = Perlin.generate_permute()
    perm_y = Perlin.generate_permute()
    perm_z = Perlin.generate_permute()

    nosie(p: Vec3) {
        const [u, v, w] = axis.map(v => p[v] - Math.floor(p[v]))
        // const [i, j, k] = axis.map(v => (Math.round(p[v] * 4)) & 255)

        const [i, j, k] = axis.map(v => Math.floor(p[v]))

        const temp: Vec3[][][] = [0, 0].map((v, di) => [0, 0].map((v, dj) => [0, 0].map((v, dk) => this.ranVec[
            this.perm_x[(i + di) & 255] ^
            this.perm_y[(j + dj) & 255] ^
            this.perm_z[(k + dk) & 255]]
        )))

        return Perlin.trilinearInterp(temp, u, v, w)
    }
    turb(p: Vec3, depth: number = 7) {
        return Math.abs(
            new Array(depth).fill(0)
                .map<[number, Vec3]>((v, i) => [2 ** (-i), p.mul(2 ** i)])
                .map(([weight, p]) => weight * this.nosie(p))
                .reduce((a, b) => a + b)
        )
    }

    static trilinearInterp(arr: Vec3[][][], u: number, v: number, w: number) {
        let accum = 0

        const [uu, vv, ww] = [u, v, w].map(v => v * v * (3 - 2 * v))
        arr.forEach((a, i) => a.forEach((b, j) => b.forEach((c, k) => {
            accum +=
                (i * uu + (1 - i) * (1 - uu)) *
                (j * vv + (1 - j) * (1 - vv)) *
                (k * ww + (1 - k) * (1 - ww)) *
                Vec3.dot(
                    c,
                    new Vec3(u - i, v - j, w - k)
                )

        })))
        return accum
    }

    static _switch(a: number[], i: number, j: number) {
        const m = a[i]
        a[i] = a[j]
        a[j] = m
        return a
    }
    static _permute(a: number[]) {
        for (let i = a.length; i > 0; i--) {
            this._switch(a, i, Math.round(random(i * 8 + 100) * (i + 1)))
        }
        return a
    }

    static generate(): Vec3[] {
        return new Array(256).fill(0).map((v, i) =>
            new Vec3(
                -1 + 2 * random(i * 218 + 100),
                -1 + 2 * random(i * 4218 + 100),
                -1 + 2 * random(i * 7658 + 100)
            ).unitVec()
        )
    }

    static generate_permute(): number[] {
        const a = new Array(256).fill(0).map((v, i) => i)
        this._permute(a)
        return a
    }


}

export default Texture

export {
    Color,
    Checker,
    Nosie
}

