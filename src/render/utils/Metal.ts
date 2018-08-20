import Vec3 from "./Vec3";
import Material from "./material.interface";
import Ray from "./ray";
import HitRecord from "./HitRecord";


function randomInUnitSphere() {
    let p: Vec3
    do {
        p = new Vec3(Math.random(), Math.random(), Math.random())
            .mul(2.0)
            .sub(new Vec3(1, 1, 1))
    } while (p.squaredLength() >= 1)

    return p
}

function reflect(v: Vec3, n: Vec3) {
    return v.sub(n.mul(Vec3.dot(v, n) * 2))
}

export default class Lambertian implements Material {
    albedo: Vec3 = new Vec3(0, 0, 0)
    constructor() {

    }

    scatter(rayin: Ray, hitRecord: HitRecord, attenuation: Vec3, scattered: Ray) {


        const reflected = reflect(rayin.direction.unitVec(), hitRecord.normal)

        scattered = new Ray(hitRecord.p, reflected)
        attenuation = this.albedo
        return Vec3.dot(scattered.direction, hitRecord.normal) > 0
    }
}