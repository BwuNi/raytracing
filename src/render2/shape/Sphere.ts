import Ray from "../base/Ray";
import HitRecord from './HitRecord'
import Vec3 from "../base/Vec3";
import Hitable from "./Hitable.interface"


export default class Sphere implements Hitable{

    center: Vec3
    radius: number

    constructor(center: Vec3, r: number) {

        this.center = center
        this.radius = r
    }

    hit(ray: Ray, t_min: number, t_max: number) {

        let hit = new HitRecord()

        const oc = Vec3.sub(ray.origin, this.center)
        const a = Vec3.dot(ray.direction, ray.direction)
        const b = Vec3.dot(oc, ray.direction) * (2)
        const c = Vec3.dot(oc, oc) - this.radius ** 2

        const discriminate = b ** 2 - 4 * a * c

        if (discriminate > 0) {
            let temp
            temp = (-b - Math.sqrt(discriminate)) / (2 * a)
            if (temp > t_min && temp < t_max) {
                hit.t = temp
                hit.p = ray.getPoint(temp)
                hit.normal = hit.p.sub(this.center).div(this.radius)


                return hit
            }
            temp = (-b + Math.sqrt(discriminate)) / (2 * a)
            if (temp > t_min && temp < t_max) {
                hit.t = temp
                hit.p = ray.getPoint(temp)
                hit.normal = hit.p.sub(this.center).div(this.radius)

                return hit
            }
        }

        return null
    }

}