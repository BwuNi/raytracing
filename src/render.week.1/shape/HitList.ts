import Ray from "../base/Ray";
import HitRecord from './HitRecord'
import Hitable, { HitResult } from "./Hitable.interface";
import Vec3 from "../base/Vec3";
import AABB from "./AABB";
import BVHNode from "./BVHNode";


export default class HitList extends Hitable {

    list: Hitable[]
    aabb: AABB
    tree: Hitable


    constructor(...arg: Hitable[]) {
        super()
        this.list = []
        arg.forEach(
            v => {
                if (v instanceof HitList) {
                    v.list.forEach(v => this.list.push(v))
                } else {
                    this.list.push(v)
                }
            }
        )
        this.aabb = this.list.map(v => v.aabb).reduce((a, b) => AABB.add(a, b))

        this.tree = BVHNode.new(this.list)

        console.log(this.tree)
    }

    hit(ray: Ray, t_min: number, t_max: number): HitResult {
        return this.tree.hit(ray, t_min, t_max)

        // if(!this.aabb.isCrossed(ray,t_min,t_max)) return null

        // let closest_t = t_max,
        //     hit: HitResult = null

        // this.list.forEach(v => {
        //     var _hit = v.hit(ray, t_min, t_max)
        //     if (_hit && (_hit[0].t < closest_t)) {
        //         hit = _hit
        //         closest_t = _hit[0].t
        //     }
        // })

        // return hit
    }

}