
import AABB from "./AABB";
import Hitable, { HitResult } from "./Hitable.interface";
import Ray from "../base/Ray";
import Vec3 from "../base/Vec3";


export default class Transform implements Hitable {
    aabb: AABB
    hit: (ray: Ray, t_min: number, t_max: number) => HitResult

    constructor(
        aabb: AABB,
        hit: (ray: Ray, t_min: number, t_max: number) => HitResult
    ) {

        this.aabb = aabb
        this.hit = hit
    }

    static translate(obj: Hitable, vec: Vec3): Hitable {
        const aabb = new AABB(
            obj.aabb.min.add(vec),
            obj.aabb.min.add(vec)
        )

        const hit = (ray: Ray, t_min: number, t_max: number): HitResult => {
            const movedRay = new Ray(
                ray.origin.sub(vec),
                ray.direction,
                ray.time
            )
            return obj.hit(movedRay, t_min, t_max)
        }

        return new this(aabb, hit)
    }
}