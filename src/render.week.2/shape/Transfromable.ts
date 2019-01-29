import AABB from "./AABB";
import Hitable, { HitResult } from "./Hitable.interface";
import Ray from "../base/Ray";
import Vec3, { axis } from "../base/Vec3";
import Matrix3_3 from "../base/Matrix3_3";

export default class Transfromable implements Hitable {
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

    translate(v: Vec3) {
        const aabb = new AABB(this.aabb.min.add(v), this.aabb.max.add(v))

        const hit = (
            ray: Ray,
            t_min: number,
            t_max: number) => {
            const nRay = new Ray(ray.origin.sub(v), ray.direction, ray.time)

            const res = this.hit(nRay, t_min, t_max)

            if (res && res[0]) {
                res[0].p = res[0].p.add(v)
            }


            if (res && res[1]) {
                res[1].origin = res[1].origin.add(v)
            }

            return res
        }

        return new Transfromable(aabb, hit)
    }


    static rorate(
        v: Vec3,
        rAxis: "e0" | "e1" | "e2",
        theta: number
    ): Vec3 {
        const r = new Vec3(v.e0, v.e1, v.e2)
        switch (rAxis) {
            case 'e0':
                r.e1 = Math.cos(theta) * v.e1 - Math.sin(theta) * v.e2

                r.e2 = Math.sin(theta) * v.e1 + Math.cos(theta) * v.e2

                break

            case 'e1':
                r.e0 = Math.cos(theta) * v.e0 + Math.sin(theta) * v.e2

                r.e2 = - Math.sin(theta) * v.e0 + Math.cos(theta) * v.e2

                break


            case 'e2':
                r.e0 = Math.cos(theta) * v.e0 - Math.sin(theta) * v.e1

                r.e1 = Math.sin(theta) * v.e0 + Math.cos(theta) * v.e1

                break

        }

        return r
    }

    static rorateBack(v: Vec3,
        rAxis: "e0" | "e1" | "e2",
        theta: number): Vec3 { return this.rorate(v, rAxis, -theta) }

    rorate(rAxis: "e0" | "e1" | "e2", angle: number) {
        const theta = Math.PI / 180 * angle

        const aabb = new AABB(
            Transfromable.rorate(this.aabb.min, rAxis, theta),
            Transfromable.rorate(this.aabb.max, rAxis, theta)
        )

        const hit = (
            ray: Ray,
            t_min: number,
            t_max: number) => {
            const nRay = new Ray(
                Transfromable.rorateBack(ray.origin, rAxis, theta),
                Transfromable.rorateBack(ray.direction, rAxis, theta),
                ray.time)

            const res = this.hit(nRay, t_min, t_max)

            if (res && res[0]) {
                res[0].p = Transfromable.rorate(res[0].p, rAxis, theta)
                res[0].normal = Transfromable.rorate(res[0].normal, rAxis, theta)
            }


            if (res && res[1]) {
                res[1].origin = Transfromable.rorate(res[1].origin, rAxis, theta)
                res[1].direction = Transfromable.rorate(res[1].direction, rAxis, theta)
            }

            return res
        }

        return new Transfromable(aabb, hit)

    }

    scale(e0: number, e1: number, e2: number) {

        if (e0 === 0 || e1 === 0 || e2 === 0)
            throw "error:can't scale 0"

        const vec = new Vec3(e0, e1, e2)

        const aabb = new AABB(
            this.aabb.min.mul(vec),
            this.aabb.max.mul(vec),
        )


        const hit = (
            ray: Ray,
            t_min: number,
            t_max: number) => {
            const nRay = new Ray(
                ray.origin.div(vec),
                ray.direction.div(vec),
                ray.time)

            const res = this.hit(nRay, t_min, t_max)

            if (res && res[0]) {
                res[0].p = res[0].p.mul(vec)
                res[0].normal = res[0].normal.div(vec)
            }


            if (res && res[1]) {
                res[1].origin = res[1].origin.mul(vec)
                res[1].direction = res[1].direction.mul(vec)
            }

            return res
        }

        return new Transfromable(aabb, hit)


    }

    matrix(m: [number, number, number,
        number, number, number,
        number, number, number]) {

            const matrix = new Matrix3_3(m)

            const inverse = matrix.inverse()

            if(!inverse) throw "Transformable: matrix can't be inversed"
    }
}



