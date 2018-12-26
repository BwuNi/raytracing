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


export default class Dielectric implements Material {
    albedo: Vec3
    refractivity: number

    constructor(albedo: Vec3 | number, refractivity :number) {
        this.albedo = new Vec3(0, 0, 0).add(albedo)
        this.refractivity = refractivity
    }

    getNextRay(rayIn: Ray, hit: HitRecord): HitResult {

        return [hit,rayIn.refract(
            hit,
            this.refractivity
        ),this.albedo]
    }
}
