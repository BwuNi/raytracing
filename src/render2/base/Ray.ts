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
		
			// return new Ray(hit.p,this.direction)


		const refraction = refract(this.direction, hit.normal, inside, outside)

		if(Vec3.dot(hit.normal, this.direction)  > 0){
			hit.normal = hit.normal.mul(-1)
		}

		
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
    const n = inside / outside

    const _normal = normal.mul(-1)

    const cos2_in =
        Vec3.dot(_normal, direction) ** 2 /
        (_normal.squaredLength() * direction.squaredLength())

    const sin_in = (1 - cos2_in) ** (1 / 2)



    if (sin_in / n > 1) return null

    const cos2_out = 1 - (1 - cos2_in) / n ** 2

    const a = direction.squaredLength()
    const b = _normal.squaredLength()
    const c = Vec3.dot(direction, _normal)
    const k = cos2_out

    const aa = b ** 2 * (1 - k)
    const bb = 2 * b * c * (1 - k)
    const cc = c ** 2 - a * b * k

    const dd = bb ** 2 - 4 * aa * cc

    if (dd > 0) {
        const n = (-1 * bb + dd ** (1 / 2)) / (2 * aa)
        const r1 = direction.add(_normal.mul(n))

        if (Vec3.dot(r1, direction) > 0) return r1

		if (sin_in > 0.99) console.log(1) 

        const m = (-1 * bb - dd ** (1 / 2)) / (2 * aa)
        const r2 = direction.add(_normal.mul(m))

        if (Vec3.dot(r2, direction) > 0) return r2
    }

    return null
}
