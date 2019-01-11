import Ray from "../base/Ray";
import HitRecord from './HitRecord'
import hitable, { HitResult } from "./Hitable.interface";
import Vec3 from "../base/Vec3";
import AABB from "./AABB";
import BVH from "./BVH";


export default class HitList {

    list: hitable[]

    tree: hitable

    _aabb: AABB

    aabb(t_min: number, t_max: number) {
        return this.list.map(v => v.aabb(t_min, t_max)).reduce((a, b) => a.add(b))
    }

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



        if (this.list.length > 0)
            this._aabb = this.list.map(v => v._aabb).reduce((a, b) => a.add(b))
    }

    hit(ray: Ray, t_min: number, t_max: number): HitResult {
        // let closest_t = t_max,
        //     res: HitResult = null

        // this.list.forEach(v => {

        //     if (!v._aabb.hit(ray)) return
        //     let _hit = v.hit(ray, t_min, t_max)
        //     if (_hit && (_hit[0].t < closest_t)) {
        //         res = _hit
        //         closest_t = _hit[0].t
        //     }
        // })

        // return res

        return (<hitable>this.tree).hit(ray, t_min, t_max)
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