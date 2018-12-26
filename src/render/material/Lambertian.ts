import Material from './Material.interface'
import Ray from '../base/Ray'
import HitRecord from '../shape/HitRecord'
import Vec3 from '../base/Vec3'
import HitResult from '../shape/HitResult';

function randomInUnitSphere() {
    let p: Vec3
    do {
        p = new Vec3(Math.random(), Math.random(), Math.random())
            .mul(2.0)
            .sub(new Vec3(1, 1, 1))
    } while (p.squaredLength() > 1)

    return p
}


export default class Lambertian implements Material {
    albedo: Vec3

    constructor(albedo: Vec3 | number) {
        this.albedo = new Vec3(0, 0, 0).add(albedo)
    }

    getNextRay(rayIn: Ray, hit: HitRecord) :HitResult{
        const ray = new Ray(hit.p,hit.p.add(hit.normal).add(randomInUnitSphere()))
        const attenuation = this.albedo
        return [hit,ray,attenuation]
    }
}
