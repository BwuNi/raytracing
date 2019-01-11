import Ray from "../base/Ray";
import HitRecord from './HitRecord'
import hitable, { HitResult } from "./Hitable.interface";
import Vec3 from "../base/Vec3";


export default class HitList {

    list: hitable[]

    constructor(...arg: hitable[]) {
        this.list = arg
    }

    hit(ray: Ray, t_min: number, t_max: number): HitResult {
        let closest_t = t_max,
            hit: HitResult = null

        this.list.forEach(v => {
            var _hit = v.hit(ray, t_min, t_max)
            if (_hit && (_hit[0].t < closest_t)) {
                hit = _hit
                closest_t = _hit[0].t
            }
        })

        return hit
    }

}