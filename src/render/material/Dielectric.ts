import Material, { Attenuation } from './Material.interface'
import Ray from '../base/Ray'
import HitRecord from '../shape/HitRecord'
import Vec3 from '../base/Vec3'

export default class Dielectric implements Material {
    albedo: Vec3
    refractivity: number

    constructor(albedo: Vec3 | number, refractivity :number) {
        this.albedo = new Vec3(0, 0, 0).add(albedo)
        this.refractivity = refractivity
    }

    scatter(rayIn: Ray, hit: HitRecord):[Ray,Attenuation]{
        return [rayIn.refract(
            hit,
            this.refractivity
        ),this.albedo]
    }
}