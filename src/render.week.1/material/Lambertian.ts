import Material from './Material.interface'
import Ray from '../base/Ray'
import HitRecord from '../shape/HitRecord'
import Vec3 from '../base/Vec3'
import Texture, { Color } from '../texture';
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
    albedo: Texture

    constructor(albedo: Vec3 | number | Texture) {

        if (albedo instanceof Vec3 || typeof albedo == 'number') {
            this.albedo = new Color(new Vec3(0, 0, 0).add(albedo))
        } else {
            this.albedo = albedo
        }


    }

    scatter(rayIn: Ray, hit: HitRecord): [Ray, Vec3] {
        const ray = new Ray(hit.p, hit.normal.add(randomInUnitSphere()), rayIn.time)
        const attenuation = this.albedo.value(0, 0, hit.p)
        return [ray, attenuation]
    }
}
