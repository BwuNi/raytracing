import Ray from "../base/Ray";
import HitRecord from './HitRecord'
import Vec3 from "../base/Vec3";
import Hitable, { HitResult } from "./Hitable.interface"
import Material from "../material/Material.interface";
import AABB from "./AABB";

export default class MovingSphere extends Hitable {

    center0: Vec3
    center1: Vec3
    time0: number
    time1: number
    radius: number
    material: Material
    aabb:AABB

    constructor(center0: Vec3, center1: Vec3, r: number, material: Material, time0: number, time1: number) {
        super()

        this.time0 = time0
        this.time1 = time1
        this.center0 = center0
        this.center1 = center1
        this.radius = r
        this.material = material


        this.aabb = AABB.add(
            this.aabb = new AABB(
                this.center0.add(new Vec3(this.radius, this.radius, this.radius)),
                this.center0.sub(new Vec3(this.radius, this.radius, this.radius))
            ),
            this.aabb = new AABB(
                this.center1.add(new Vec3(this.radius, this.radius, this.radius)),
                this.center1.sub(new Vec3(this.radius, this.radius, this.radius))
            )
        )
    }
    center(t: number) {
        return this.center0.add(
            this.center1.sub(this.center0).mul(
                (t - this.time0) / (this.time1 - this.time0)
            )
        )
    }

    hit(ray: Ray, t_min: number, t_max: number): HitResult {
        if(!this.aabb.isCrossed(ray,t_min,t_max)) return null
        let hit = new HitRecord()

        const center = this.center(ray.time)
        const oc = Vec3.sub(ray.origin, center)
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
                hit.normal = hit.p.sub(center).div(this.radius)

                const [a, b] = this.material.scatter(ray, hit)
                return [hit, a, b]
            }
            temp = (-b + Math.sqrt(discriminate)) / (2 * a)
            if (temp > t_min && temp < t_max) {
                hit.t = temp
                hit.p = ray.getPoint(temp)
                hit.normal = hit.p.sub(center).div(this.radius)

                const [a, b] = this.material.scatter(ray, hit)
                return [hit, a, b]
            }
        }
        return null
    }
}
