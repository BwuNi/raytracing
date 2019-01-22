import Vec3, { axis } from "../../base/Vec3";
import Ray from "../../base/Ray";
import { HitResult } from "../Hitable.interface";
import Material from "../../material/Material.interface";
import Hitable from "../Hitable.interface";
import HitRecord from "../HitRecord";
import AABB from "../AABB";
import Plane from "./Plane";
import HitList from "../HitList";
import compare from "../../base/compare";
import count from "../../base/count";


export {
    Plane
}



export default class Rect extends Hitable {
    min: Vec3
    max: Vec3
    material: Material
    aabb: AABB

    constructor(e0: number, e1: number, e2: number, material: Material) {
        super()
        const a0 = new Vec3(-e0 / 2, -e1 / 2, -e2 / 2)
        const a1 = new Vec3(e0 / 2, e1 / 2, e2 / 2)

        const x = compare.minmax(a0.e0, a1.e0)
        const y = compare.minmax(a0.e1, a1.e1)
        const z = compare.minmax(a0.e2, a1.e2)

        this.min = new Vec3(x[0], y[0], z[0])
        this.max = new Vec3(x[1], y[1], z[1])
        this.material = material
        this.aabb = new AABB(this.min, this.max)
    }

    hit(
        ray: Ray,
        t_min: number,
        t_max: number
    ): HitResult {
        // if(!this.aabb.isCrossed(ray,t_min,t_max)) return null

        type axisHit = {
            axis: 'e0' | 'e1' | 'e2',
            side: 'min' | 'max',
            t: number
        }

        const creacteAxisHit = (
            axis: 'e0' | 'e1' | 'e2',
            side: 'min' | 'max',
            t: number): axisHit => ({ axis, side, t })

        const a = <[[axisHit, axisHit], [axisHit, axisHit], [axisHit, axisHit]]>
            axis.map((v, i) => {
                const m = ray.direction[v]
                const n = ray.origin[v]
                const min = this.min[v]
                const max = this.max[v]

                if (m === 0) {
                    //平行于轴线地情况
                    if ((n >= min) && (n <= max))
                        return <[axisHit, axisHit]>[
                            creacteAxisHit(v, 'min', -Infinity), creacteAxisHit(v, 'max', Infinity)
                        ]
                    else return <[axisHit, axisHit]>[
                        creacteAxisHit(v, 'min', Infinity),
                        creacteAxisHit(v, 'max', -Infinity)
                    ]
                } else {
                    const a = creacteAxisHit(v, 'min', (min - n) / m)
                    const b = creacteAxisHit(v, 'max', (max - n) / m)
                    return a.t < b.t ? [a, b] : [b, a]
                }
            })


        const min = compare.maxT(
            [a[0][0], a[1][0], a[2][0]],
            a => a.t
        )
        const max = compare.minT(
            [a[0][1], a[1][1], a[2][1]],
            a => a.t
        )


        const res = min.t > max.t ? null :
            (t_min <= min.t && min.t <= t_max) ? min :
                (t_min <= max.t && max.t <= t_max) ? max : null

        if (res === null) return null


        const n = new Vec3(0, 0, 0)
        const p = ray.getPoint(res.t)

        n[res.axis] = (res.side == 'min') ? -1 : 1

        const hit = new HitRecord(res.t, p, n)

        const [e, f] = this.material.scatter(ray, hit)


        const aa = e.direction.unitVec()
        const bb = ray.direction.unitVec()

        const cc = aa.sub(bb).squaredLength()

        return [hit, e, f]
    }
}
