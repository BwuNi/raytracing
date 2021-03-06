import Vec3 from "../base/Vec3";
import Ray from "../base/Ray";
import { HitResult } from "./Hitable.interface";
import Material from "../material/Material.interface";
import Hitable from "./Hitable.interface";
import HitRecord from "./HitRecord";
import AABB from "./AABB";
import { axis } from "../base/Vec3";
import compare from "../base/compare";
import Transfromable from "./Transfromable";


export default class Box extends Transfromable {
    min: Vec3
    max: Vec3
    material: Material
    aabb: AABB

    constructor(size: Vec3, material: Material) {
        super()

        const x = [-size.e0 / 2, size.e0 / 2]
        const y = [-size.e1 / 2, size.e1 / 2]
        const z = [-size.e2 / 2, size.e2 / 2]

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
        if (!this.aabb.isCrossed(ray, t_min, t_max)) return null
        const a = <[[number, number], [number, number], [number, number]]>
            axis.map((v, i) => {
                const m = ray.direction[v]
                const n = ray.origin[v]
                const min = this.min[v]
                const max = this.max[v]

                if (m === 0) {
                    //平行于轴线地情况
                    if ((n >= min) && (n <= max)) return <[number, number]>[-Infinity, Infinity]
                    else return <[number, number]>[Infinity, -Infinity]
                } else {
                    const a = (min - n) / m
                    const b = (max - n) / m
                    return <[number, number]>(a < b ? [a, b] : [b, a])
                }
            })

        const min = compare.max(a[0][0], a[1][0], a[2][0])
        const max = compare.min(a[0][1], a[1][1], a[2][1])

        const res = min > max ? null :
            (t_min <= min && min <= t_max) ? min :
                (t_min <= max && min <= t_max) ? max : null

        if (res === null) return null

        const m: [number, number] = [
            1, // 0 -> min 1-> max
            1  //[0,1,2] -> ['e0', 'e1', 'e2']
        ]

        a.forEach((v, i) => v.forEach((w, j) => {
            if (w == res) {
                m[0] = j
                m[1] = i
            }
        }))

        const n = new Vec3(0, 0, 0)
        const p = ray.getPoint(res)

        if (p.e0 < -2) {
            console.log(1)
        }

        n[axis[m[1]]] = (m[0] == 0) ? 1 : -1

        const hit = new HitRecord(res, ray.getPoint(res), n)

        const [e, f] = this.material.scatter(ray, hit)

        return [hit, e, f]
    }

}

