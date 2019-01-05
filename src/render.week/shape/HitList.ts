import Ray from "../base/Ray";
import HitRecord from './HitRecord'
import hitable, { HitResult } from "./Hitable.interface";
import Vec3 from "../base/Vec3";
import AABB from "./AABB";


export default class HitList {

    list: hitable[]
    _aabb: AABB
    aabb(t_min: number, t_max: number) {
        return this.list.map(v => v.aabb(t_min, t_max)).reduce((a, b) => a.add(b))
    }

    constructor(...arg: hitable[]) {
        this.list = arg

        if (this.list.length > 0)
            this._aabb = this.list.map(v => v._aabb).reduce((a, b) => a.add(b))
    }

    hit(ray: Ray, t_min: number, t_max: number): HitResult {
        let closest_t = t_max,
            res: HitResult = null

        this.list.forEach(v => {

            if (!v._aabb.hit(ray)) return
            var _hit = v.hit(ray, t_min, t_max)
            if (_hit && (_hit[0].t < closest_t)) {
                res = _hit
                closest_t = _hit[0].t
            }
        })
        return res
    }

}