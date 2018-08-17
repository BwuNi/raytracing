import HitRecord from './HitRecord'
import Ray from './Ray';
import hitable from './hitable.interface';

export default class HitableList implements hitable {

    list: hitable[] = []

    constructor(hitablelist: hitable[]) {
        this.list = hitablelist
    }

    hit(ray: Ray, t_min: number, t_max: number) {
        let isHitted = false,
            closestHit = t_max,
            record:HitRecord = null

        this.list
            .map(v => v.hit(ray, t_min, t_max))
            .forEach(v => {
                if (v && v.t < closestHit) {
                    record = v
                    closestHit = v.t
                }
            })

        return record
    }
}