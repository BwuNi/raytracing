import Ray from "../base/Ray";
import HitRecord from './HitRecord'
import hitable, { HitResult } from "./Hitable.interface";


export default class HitList {

    list: hitable[]

    constructor(...arg: hitable[]) {
        this.list = arg
    }

    hit(ray: Ray, t_min: number, t_max: number):HitResult {
        let closest_t = t_max,
            res: HitResult = null

        this.list.forEach(v => {
            var _res = v.hit(ray, t_min, t_max)
            if (_res && (_res[0].t < closest_t)) {
                res = _res
                closest_t = res[0].t
            }

        })

        return res
    }

}