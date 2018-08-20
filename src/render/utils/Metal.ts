import Vec3 from './Vec3'
import Material from './material.interface'
import Ray from './ray'
import HitRecord from './HitRecord'

function reflect(v: Vec3, n: Vec3) {
    return v.sub(n.mul(Vec3.dot(v, n) * 2))
}

export default class Lambertian implements Material {
    albedo: Vec3 = new Vec3(0.5, 0.5, 0.5)
    constructor() {}

    scatter(
        rayin: Ray,
        hitRecord: HitRecord
        // attenuation: Vec3,
        // scattered: Ray
    ) {
        const reflected = reflect(rayin.direction.unitVec(), hitRecord.normal)

        const scattered = new Ray(hitRecord.p, reflected)
        // attenuation = this.albedo
        return Vec3.dot(scattered.direction, hitRecord.normal) > 0
            ? scattered
            : null
    }
}
