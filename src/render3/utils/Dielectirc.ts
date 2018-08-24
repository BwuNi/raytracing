import Vec3 from "./Vec3";
import Material from "./material.interface";
import Ray from "./Ray";
import HitRecord from "./HitRecord";


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