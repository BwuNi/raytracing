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

    refract(hit: HitRecord, inside: number, outside: number) {

        const refraction = refract(this.direction, hit.normal, inside, outside)

        if (refraction) return new Ray(hit.p, refraction)
        else return this.reflect(hit)

    }
}


function reflect(direction: Vec3, normal: Vec3) {
    return direction.sub(normal.mul(Vec3.dot(direction, normal) * 2))
}

function refract(
    direction: Vec3,
    normal: Vec3,
    inside: number,
    outside: number
) {
    const _normal = normal.mul(-1)

    const cos2_in =
        Vec3.dot(_normal, direction) ** 2 /
        (_normal.squaredLength() * direction.squaredLength())

    const sin_in = (1 - cos2_in) ** (1 / 2)
    const sin_out = sin_in * inside / outside

    //全反射
    if (sin_out > 1) {
        return null
    }

    const cos2_out = 1 - sin_out ** 2

    const x = direction.squaredLength()
    const y = _normal.squaredLength()
    const z = Vec3.dot(direction, _normal)

    const a = y ** 2 * (1 - cos2_out)
    const b = 2 * y * z * (1 - cos2_out)
    const c = cos2_out * y * x - z ** 2

    const d = (b ** 2 - 4 * a * c) ** 0.5

    return (d
        ? direction.add(_normal.mul((-b + d) / (2 * a)))
        : null
    )
}
