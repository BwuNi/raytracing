import HitRecord from './HitRecord'
import Ray from './Ray';
import hitable from './hitable.interface';
import Vec3 from './Vec3';

export default class HitableList implements hitable {

    list: hitable[] = []

    constructor(hitablelist: hitable[]) {
        this.list = hitablelist
    }

    hit(ray: Ray, t_min: number, t_max: number) {
        let closestHit = t_max,
            hit: HitRecord = null,
            rayOut: Ray = null,
            attenuation: Vec3 = null

        this.list
            .map(v => v.hit(ray, t_min, t_max))
            .forEach(v => {
                if (v.hit && v.hit.t < closestHit) {
                    hit = v.hit
                    rayOut = v.rayOut
                    attenuation = v.attenuation
                    closestHit = v.hit.t 
                }
            })

        return {
            hit,rayOut,attenuation
        }
    }


}