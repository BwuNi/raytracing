import Ray from "../base/Ray";
import HitRecord from "./HitRecord";
// import Material, { Attenuation } from "../material/Material.interface";
import AABB from "./AABB";
import Vec3 from "../base/Vec3";

export default class Hitable {

    aabb: AABB = AABB.default()
    hit(ray: Ray, t_min: number, t_max: number): HitResult {
        return null
    }

    constructor(
        aabb?: AABB,
        hit?: (ray: Ray, t_min: number, t_max: number) => HitResult
    ) {

        if (aabb) this.aabb = aabb
        if (hit) this.hit = hit
    }

    translate(vec: Vec3): Hitable {
        const aabb = new AABB(
            this.aabb.min.add(vec),
            this.aabb.max.add(vec)
        )

        const hit = (ray: Ray, t_min: number, t_max: number): HitResult => {
            const movedRay = new Ray(
                ray.origin.sub(vec),
                ray.direction,
                ray.time
            )
            const res = this.hit(movedRay, t_min, t_max)

            if (res) {
                if (res[0]) res[0].p = res[0].p.add(vec)
                if (res[1]) res[1].origin = res[1].origin.add(vec)
            }
            return res
        }

        return new Hitable(aabb, hit)
    }


    rotate(axis: 'e0' | 'e1' | 'e2', angle: number, origin: Vec3) {

        const radians = angle / 180 * Math.PI

        const vec = origin
        const backVec = new Vec3(0).sub(origin)


        const v = this.translate(backVec)

    }

}


type HitResult = [HitRecord, Ray, Vec3]

export {
    HitResult
}