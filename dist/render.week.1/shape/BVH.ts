import Ray from "../base/Ray";
import HitRecord from './HitRecord'
import hitable, { HitResult } from "./Hitable.interface";
import Vec3 from "../base/Vec3";
import AABB from "./AABB";



export default class BVH implements hitable {

    left: hitable

    right: hitable

    _aabb: AABB

    aabb() { return this._aabb }

    constructor(left: hitable, right: hitable) {
        this.left = left
        this.right = right
        this._aabb = this.left._aabb.add(this.right._aabb)
    }

    hit(ray: Ray, t_min: number, t_max: number): HitResult {
        let closest_t = t_max,
            hit: HitResult = null

        if (this.left.aabb(t_min, t_max).hit(ray)){
            let _hit = this.left.hit(ray, t_min, t_max)
            if (_hit && (_hit[0].t < closest_t)) {
                hit = _hit
                closest_t = _hit[0].t
            }
        }
        if (this.right.aabb(t_min, t_max).hit(ray)) {
            let _hit = this.right.hit(ray, t_min, t_max)
            if (_hit && (_hit[0].t < closest_t)) {
                hit = _hit
                closest_t = _hit[0].t
            }
        }
        return hit
    }

}