import Vec3 from './Vec3'

export default class Ray {
    origin: Vec3
    direction: Vec3
    constructor(origin: Vec3, direction: Vec3) {
        this.origin = origin
        this.direction = direction
    }

    getPoint(t: number) {
        return this.origin.add(this.direction.mul(t))
    }

    reflect(n: Vec3) {
        const v = this.direction

        return v.sub(n.mul(Vec3.dot(v, n) * 2))
    }


    refract(normal: Vec3, n: number = 1,) :{
        refract:Vec3,
        refract_n:Vec3|number, 
        reflect:Vec3,
        reflect_n:Vec3|number,
    }{


        const reflect = this.reflect(normal)

        const v = this.direction

        const outNomal = normal.mul(-1)

        const cos2_in = Vec3.dot(v, outNomal) ** 2 / (v.squaredLength() * outNomal.squaredLength())


        const sin_in = (1 - cos2_in) ** (1 / 2)


        if ((sin_in / n) >= 1 ) {
            return {
                refract:null,
                refract_n:0,
                reflect:reflect,
                reflect_n:1,
            }
        }

        const cos2_out = 1 - (1 - cos2_in) / (n ** 2)


        const a = v.squaredLength()
        const b = outNomal.squaredLength()
        const c = Vec3.dot(v, normal)
        const k = cos2_out

        const aa = b ** 2 * (1 - k)
        const bb = 2 * b * c * (1 - k)
        const cc = c ** 2 - a * b * k

        const dd = bb ** 2 - 4 * aa * cc

        if (dd > 0) {
            const m = (-1 * bb - dd ** (1 / 2)) / (2 * aa)
            const n = (-1 * bb + dd ** (1 / 2)) / (2 * aa)

            const r1 = new Vec3(
                v.e0 + m * normal.e0,
                v.e1 + m * normal.e1,
                v.e2 + m * normal.e2)
            const r2 = new Vec3(
                v.e0 + n * normal.e0,
                v.e1 + n * normal.e1,
                v.e2 + n * normal.e2
            )

            if (Vec3.dot(r1, v) > 0) return ({
                refract:r1,
                refract_n:1,
                reflect:reflect,
                reflect_n:0,
            })
            if (Vec3.dot(r2, v) > 0) return ({
                refract:r2,
                refract_n:1,
                reflect:reflect,
                reflect_n:0,
            })
        }

        return null

    }
}