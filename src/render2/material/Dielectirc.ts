import Material from './Material.interface'
import Ray from '../base/Ray'
import HitRecord from '../shape/HitRecord'
import Vec3 from '../base/Vec3'


export default class Dielectirc implements Material {
    albedo: Vec3
    refractivity: number
    constructor(albedo: Vec3 | number, refractivity: number = 1) {
        this.albedo = new Vec3(0, 0, 0).add(albedo)
        this.refractivity = refractivity
    }

    getNextRay(rayIn: Ray, hit: HitRecord) {

        const ray = Vec3.dot(rayIn.direction, hit.normal) < 0
            ? rayIn.refract(hit, 1/this.refractivity)
            : rayIn.refract(new HitRecord(hit.t, hit.p, hit.normal.mul(-1)), this.refractivity)

        const attenuation = this.albedo
        return {
            hit,
            ray,
            attenuation
        }
    }
}
