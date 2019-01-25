import Ray from "../base/Ray";
import HitRecord from "./HitRecord";
// import Material, { Attenuation } from "../material/Material.interface";
import AABB from "./AABB";
import Vec3, { axis } from "../base/Vec3";

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


    rotate(axis: 'e0' | 'e1' | 'e2', angle: number) {


        const a = ['e0', 'e1', 'e2'].filter(v => v !== axis)
    }

}

function rotate(x: number, y: number, angle: number): [number, number] {
    const radians = angle / 180 * Math.PI
    return [
        Math.cos(radians) * x - Math.sin(radians) * y,
        Math.cos(radians) * y - Math.sin(radians) * x
    ]
}
function rotateVec3(
    rAxis: 'e0' | 'e1' | 'e2', angle: number, vec: Vec3
) {
    const a = axis.filter(v => v !== rAxis)
    const b = rotate(vec[a[0]], vec[a[1]], angle)
    const res = new Vec3(0, 0, 0)
    res[rAxis] = vec[rAxis]
    res[a[0]] = b[0]
    res[a[1]] = b[1]
}



type HitResult = [HitRecord, Ray, Vec3]

export {
    HitResult
}