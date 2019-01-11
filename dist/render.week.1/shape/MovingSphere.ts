import Ray from "../base/Ray";
import HitRecord from './HitRecord'
import Vec3 from "../base/Vec3";
import Hitable, { HitResult } from "./Hitable.interface"
import Material from "../material/Material.interface";
import AABB from "./AABB";


export default class MovingSphere implements Hitable {

    center0: Vec3
    center1: Vec3
    time0: number
    time1: number
    radius: number
    material: Material

    _aabb: AABB

    aabb(t_min: number, t_max: number) {
        const center0 = this.center(t_min)
        const center1 = this.center(t_max)

        let a0: AABB = null;
        let a1: AABB = null;

        a0 = new AABB(center0.sub(this.radius), center0.add(this.radius))
        a1 = new AABB(center1.sub(this.radius), center1.add(this.radius))


        return a0.add(a1)
    }

    constructor(center0: Vec3, center1: Vec3, r: number, material: Material, time0: number, time1: number) {

        this.time0 = time0
        this.time1 = time1
        this.center0 = center0
        this.center1 = center1
        this.radius = r
        this.material = material

        this._aabb = (new AABB(this.center0.add(r), this.center0.sub(r))).add(new AABB(this.center1.add(r), this.center1.sub(r)))

    }

    center(t: number) :Vec3{
        return t < this.time0 ?
            this.center0 :
            t > this.time1 ? this.center1 : this.center0.add(
                this.center1.sub(this.center0).mul(
                    (t - this.time0) / (this.time1 - this.time0)
                )
            )

    }

    hit(ray: Ray, t_min: number, t_max: number): HitResult {

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