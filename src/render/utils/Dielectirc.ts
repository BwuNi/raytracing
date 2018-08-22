import Vec3 from "./Vec3";
import Material from "./material.interface";
import Ray from "./Ray";
import HitRecord from "./HitRecord";


function reflect(v: Vec3, n: Vec3) {
    return v.sub(n.mul(Vec3.dot(v, n) * 2))
}


function refract(v: Vec3, normal: Vec3, n: number = 1) {

    const outNomal = normal.mul(-1)

    const cos2_in = Vec3.dot(v, outNomal) ** 2 / (v.squaredLength() * outNomal.squaredLength())


    const sin_in = (1 - cos2_in) ** (1 / 2)

    if (sin_in / n) {
        return null
    }

    const cos2_out = 1 - (1 - cos2_in) / (n ** 2)

    console.log(cos2_out)

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

        if (Vec3.dot(r1, v) > 0) return r1
        if (Vec3.dot(r2, v) > 0) return r2
    }

    return null

}
// console.log()



// const inn = new Vec3(1, 1, 1)
// const mor = new Vec3(1, -1, -1)

// const n = Math.sqrt(3)

// const out = refract(inn, mor, n)

// console.log(out)

// console.log(
//     (1 - (Vec3.dot(out, mor) / (out.length() * mor.length())) ** 2) ** (1 / 2) * n
// )

// console.log(
//     (1 - (Vec3.dot(inn, mor) / (inn.length() * mor.length())) ** 2) ** (1 / 2)
// )



export default class Dielectirc implements Material {
    albedo: Vec3 = new Vec3(0.5, 0.5, 0.5)
    refractivity :number

    constructor(albedo: Vec3 = new Vec3(0.5, 0.5, 0.5),refractivity:number = 1) {

        if (albedo) this.albedo = albedo
        this.refractivity = refractivity
    }

    scatter(rayIn: Ray, hitRecord: HitRecord) {
        let outNomal: Vec3 = null
        let refract:Vec3
        let reflect:Vec3

        if (Vec3.dot(rayIn.direction, hitRecord.normal) > 0) {
            outNomal = hitRecord.normal.mul(-1)
            const res = rayIn.refract(outNomal,1/this.refractivity)
            reflect = res.reflect
            refract = res.refract
        } else {
            outNomal = hitRecord.normal
            const res = rayIn.refract(outNomal,this.refractivity)
            reflect = res.reflect
            refract = res.refract
        }

        

        if(refract)return new Ray(hitRecord.p, refract)
        else return new Ray(hitRecord.p, reflect)
    }
}