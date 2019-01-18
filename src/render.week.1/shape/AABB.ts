import { compare } from "./AAB";
import Vec3, { axis } from "../base/Vec3";
import Ray from "../base/Ray";

export default class AABB {

    min: Vec3
    max: Vec3

    static default = () :AABB=> {
        const def = new AABB(new Vec3(0), new Vec3(0))
        def.min = new Vec3(Infinity, Infinity, Infinity)
        def.max = new Vec3(-Infinity, -Infinity, -Infinity)
        return def
    }

    
    static infinity = ():AABB => {
        const def = new AABB(new Vec3(0), new Vec3(0))
        def.max = new Vec3(Infinity, Infinity, Infinity)
        def.min = new Vec3(-Infinity, -Infinity, -Infinity)
        return def
    }

    static t: number = 0
    static f: number = 0

    constructor(a0: Vec3, a1: Vec3) {
        const x = compare.minmax(a0.e0, a1.e0)
        const y = compare.minmax(a0.e1, a1.e1)
        const z = compare.minmax(a0.e2, a1.e2)

        this.min = new Vec3(x[0], y[0], z[0])
        this.max = new Vec3(x[1], y[1], z[1])
    }

    static add(a: AABB = AABB.default(), b?: AABB): AABB {
        if (!b) return a

        const min = new Vec3()
        const max = new Vec3()

        axis.forEach(v => {
            min[v] = compare.min(a.min[v], b.min[v])
            max[v] = compare.max(a.max[v], b.max[v])
        })

        return new AABB(min, max)
    }


    isCrossed(
        ray: Ray,
        t_min: number,
        t_max: number
    ): boolean {

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

        const res = (
            (min < max) &&
            (
                (t_min <= min && min <= t_max) ||
                (t_min <= max && min <= t_max)
            )
        )

        if (res) AABB.t++
        else AABB.f++

        return res
    }
}


