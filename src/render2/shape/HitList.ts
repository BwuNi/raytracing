import Ray from "../base/Ray";
import HitRecord from './HitRecord'
import hitable from "./Hitable.interface";


export default class HitList {

    list: hitable[]

    constructor(...arg: hitable[]) {
        this.list = arg
    }

    hit(ray: Ray, t_min: number, t_max: number) {
        let closest_t = t_max,
            hit: HitRecord = null

        this.list.forEach(v => {
            var _hit = v.hit(ray, t_min, t_max)
            if (_hit && (_hit.t < closest_t)) {
                hit = _hit
                closest_t = _hit.t
            }

        })

        return hit
    }

}