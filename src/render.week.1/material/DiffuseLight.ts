import Material from './Material.interface'
import Ray from '../base/Ray'
import HitRecord from '../shape/HitRecord'
import Vec3 from '../base/Vec3'
import Texture, { Color } from '../texture';



export default class DiffuseLight implements Material {
    albedo: Texture

    constructor(albedo: Vec3 | number | Texture) {

        if (albedo instanceof Vec3 || typeof albedo == 'number') {
            this.albedo = new Color(new Vec3(0, 0, 0).add(albedo))
        } else {
            this.albedo = albedo
        }


    }

    scatter(rayIn: Ray, hit: HitRecord): [Ray, Vec3] {
        return [null, this.albedo.value(0, 0, hit.p)]
    }
}