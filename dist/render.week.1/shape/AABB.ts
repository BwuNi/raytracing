import Vec3 from "../base/Vec3";
import Ray from "../base/Ray";

const compare = {
    minmax(a: number, b: number, c?: number): [number, number] {
        const res: [number, number] = a < b ? [a, b] : [b, a]
        if (!c && c !== 0) return res
        if (c < res[0]) return (res[0] = c, res)
        if (c > res[1]) return (res[1] = c, res)
        return res
    },
    min(a: number, b: number, c?: number): number {
        const res: number = a < b ? a : b
        if (!c && c !== 0) return res
        if (c < res) return c
        return res
    },
    max(a: number, b: number, c?: number): number {
        const res: number = a > b ? a : b
        if (!c && c !== 0) return res
        if (c > res) return c
        return res
    }
}


export default class AABB {
    min: Vec3
    max: Vec3

    static f: number = 0
    static t: number = 0

    constructor(a0: Vec3, a1: Vec3) {
        const x = compare.minmax(a0.e0, a1.e0)
        const y = compare.minmax(a0.e1, a1.e1)
        const z = compare.minmax(a0.e2, a1.e2)

        this.min = new Vec3(x[0], y[0], z[0])
        this.max = new Vec3(x[1], y[1], z[1])
    }

    add(a: AABB) {
        return new AABB(
            new Vec3(
                compare.min(this.min.e0, a.min.e0),
                compare.min(this.min.e1, a.min.e1),
                compare.min(this.min.e2, a.min.e2)
            ),
            new Vec3(
                compare.max(this.max.e0, a.max.e0),
                compare.max(this.max.e1, a.max.e1),
                compare.max(this.max.e2, a.max.e2)
            ),
        )
    }

    temp:[[number, number], [number, number], [number, number]] = [[0,0],[0,0],[0,0]]

    
    hit(ray: Ray): boolean {
        const a = <[[number, number], [number, number], [number, number]]>
            (<['e0', 'e1', 'e2']>['e0', 'e1', 'e2']).map((v,i) => {
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

        return max >= min ? (AABB.t++ , true) : (AABB.f++ , false)
    }
}

export {
    compare
}