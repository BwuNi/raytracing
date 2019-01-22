import Hitable, { HitResult } from "./Hitable.interface";
import Ray from "../base/Ray";
import AABB from "./AABB";
import HitList from "./HitList";
import { axis } from "../base/Vec3";


export default class BVHNode extends Hitable {
    left: Hitable
    right: Hitable
    aabb: AABB

    constructor(left: Hitable, right: Hitable) {
        super()
        this.left = left
        this.right = right
        this.aabb = AABB.add(left.aabb, right.aabb)
    }

    hit(ray: Ray, t_min: number, t_max: number) {
        if (!this.aabb.isCrossed(ray, t_min, t_max)) return null

        const l = this.left.hit(ray, t_min, t_max)
        const r = this.right.hit(ray, t_min, t_max)

        // 如果 l/r 存在至少一个空值
        if (!(l && r)) {
            return l || r
        }
        // 取 t 值小的结果返回
        else{
            return l[0].t < r[0].t ? l : r
        }


        //  if(!this.aabb.isCrossed(ray,t_min,t_max)) return null

        // let closest_t = t_max,
        //     hit: HitResult = null
        // ;
        // (<Hitable[]>[this.left,this.right]).forEach(v => {
        //     var _hit = v.hit(ray, t_min, t_max)
        //     if (_hit && (_hit[0].t < closest_t)) {
        //         hit = _hit
        //         closest_t = _hit[0].t
        //     }
        // })

        // return hit
    }

    static new(arg: Hitable[]): Hitable {
        if (arg.length === 0)  throw '1231'
        if (arg.length === 1) return arg[0]

        const l = sort(arg)

        return new BVHNode(
            BVHNode.new(l.slice(0, l.length / 2)),
            BVHNode.new(l.slice(l.length / 2, l.length))
        )
    }
}

function sort(arg: Hitable[]) {

    const i = axis
        .map(v => arg.map(w => w.aabb.min[v]))
        // 求均值
        .map<[number, number[]]>(
            v => [v.reduce((a, b) => a + b) / v.length, v])
        // 求方差
        .map<[number, number]>(
            (a, i) => [
                i, // 轴索引
                a[1].map(v => v - a[0]).map(v => v ** 2).reduce((a, b) => a + b)
            ])
        // 排序求最大
        .sort((a, b) => b[1] - a[1])
        .map(v=>v[0])

    const xyz = axis[i[0]]

    return arg.sort((a,b)=>a.aabb.min[xyz]-b.aabb.min[xyz])
}
