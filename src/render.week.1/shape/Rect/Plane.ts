import Hitable, { HitResult } from "../Hitable.interface";
import Material from "../../material/Material.interface";
import AABB from "../AABB";
import Vec3 from "../../base/Vec3";
import Ray from "../../base/Ray";
import HitRecord from "../HitRecord";

type Axis = 'e0' | 'e1' | 'e2'

export default class Plane implements Hitable {

    material: Material

    aabb: AABB

    x: {
        name: Axis,
        range: [number, number]
    }

    y: {
        name: Axis,
        range: [number, number]
    }

    z: {
        name: Axis,
        value: number
    }

    constructor(
        x: Axis, [x0, x1]: [number, number],
        y: Axis, [y0, y1]: [number, number],
        z: Axis, k: number,
        matrial: Material,
    ) {

        this.material = matrial

        const a0 = new Vec3(0)
        const a1 = new Vec3(0)

        a0[x] = x0
        a0[y] = y0
        a0[z] = k - 0.001

        a1[x] = x1
        a1[y] = y1
        a1[z] = k + 0.001

        this.aabb = new AABB(a0,a1)
        // this.aabb = AABB.infinity()

        this.x = {
            name: x,
            range: [x0, x1]
        }

        this.y = {
            name: y,
            range: [y0, y1]
        }

        this.z = {
            name: z,
            value: k
        }
    }

    hit(ray: Ray, t_min: number, t_max: number): HitResult {
        const [x, y, z] = [this.x, this.y, this.z]

            // const a = <[[number, number], [number, number], [number, number]]>
            ;
        const a = <[[number, number], [number, number]]>[x, y].map<[number, number]>((v, i) => {
            const m = ray.direction[v.name]
            const n = ray.origin[v.name]
            const min = v.range[0]
            const max = v.range[1]

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


        const m = ray.direction[z.name]
        const n = ray.origin[z.name]

        if (m === 0) { return null }

        const b = (z.value - n) / m

        if (
            a[0][0] < b &&
            a[1][0] < b &&
            a[0][1] > b &&
            a[1][1] > b &&
            t_min < b &&
            t_max > b
        ) {

            const normal = new Vec3(0)

            normal[z.name] = n < z.value ? -1 : 1

            const hit = new HitRecord(
                b,
                ray.getPoint(b),
                normal)

            const [e, f] = this.material.scatter(ray, hit)
            return [hit, e, f]
        }

        return null

    }
}