import Vec3 from './Vec3'
import HitRecord from '../shape/HitRecord'

export default class Ray {
    origin: Vec3
    direction: Vec3
    constructor(origin: Vec3, direction: Vec3) {
        this.origin = origin
        this.direction = direction
    }

    getPoint(t: number) {
        return this.origin.add(this.direction.mul(t))
    }

    reflect(hit: HitRecord) {
        return new Ray(hit.p, reflect(this.direction, hit.normal))
    }
}

function reflect(v: Vec3, n: Vec3) {
    return v.sub(n.mul(Vec3.dot(v, n) * 2))
}
