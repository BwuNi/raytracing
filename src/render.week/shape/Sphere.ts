import Ray from "../base/Ray";
import HitRecord from './HitRecord'
import Vec3 from "../base/Vec3";
import Hitable, { HitResult } from "./Hitable.interface"
import Material from "../material/Material.interface";
import AABB from "./AABB";


export default class Sphere implements Hitable {

    center: Vec3
    radius: number
    material: Material
    aabb: AABB

    constructor(center: Vec3, r: number, material: Material) {

        this.center = center
        this.radius = r
        this.material = material
        this.aabb = new AABB(
            this.center.add(new Vec3(this.radius, this.radius, this.radius)),
            this.center.sub(new Vec3(this.radius, this.radius, this.radius))
        )
    }

    hit(ray: Ray, t_min: number, t_max: number): HitResult {
        // if(!this.aabb.isCrossed(ray,t_min,t_max)) return null
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

                const [a, b] = this.material.scatter(ray, hit)
                return [hit, a, b]
            }
            temp = (-b + Math.sqrt(discriminate)) / (2 * a)
            if (temp > t_min && temp < t_max) {
                hit.t = temp
                hit.p = ray.getPoint(temp)
                hit.normal = hit.p.sub(this.center).div(this.radius)

                const [a, b] = this.material.scatter(ray, hit)
                return [hit, a, b]
            }
        }

        return null
    }

}

