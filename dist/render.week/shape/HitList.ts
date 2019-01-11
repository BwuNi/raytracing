import Ray from "../base/Ray";
import HitRecord from './HitRecord'
import hitable, { HitResult } from "./Hitable.interface";
import Vec3 from "../base/Vec3";


export default class HitList {

    list: hitable[]

    tree: hitable


    constructor(...arg: hitable[]) {
        this.list = []

        arg.forEach(v => {
            if (v instanceof HitList) {
                v.list.forEach(v => this.list.push(v))
            } else {
                this.list.push(v)
            }
        })

        this.tree = createTree(...this.list)



    }

    hit(ray: Ray, t_min: number, t_max: number): HitResult {
        let closest_t = t_max,
            res: HitResult = null

        this.list.forEach(v => {
            let _hit = v.hit(ray, t_min, t_max)
            if (_hit && (_hit[0].t < closest_t)) {
                res = _hit
                closest_t = _hit[0].t
            }
        })

        return res
    }

}


function createTree(...arg: hitable[]): hitable {
    if (arg.length === 0) {
        return null
    }
    else if (arg.length === 1) {
        return arg[0]
    }

    const axis = <'e0' | 'e1' | 'e2'>
        ['e0', 'e1', 'e2'][Math.floor(Math.random() * 3)]

    const l = arg
        .map(
            v => <[hitable, number]>[v, (v._aabb.min[axis] + v._aabb.max[axis]) / 2])
        .sort((a, b) => a[1] - b[1])
        .map(v => v[0])


    const left: hitable[] = l.slice(0,l.length/2)

    const right: hitable[] = l.slice(l.length/2,l.length)

    return new BVH(createTree(...left), createTree(...right))
}