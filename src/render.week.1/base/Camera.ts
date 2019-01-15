import Vec3 from './Vec3'
import Ray from './Ray';

function randomInUnitDist(): Vec3 {
    while (true) {
        let p = (
            new Vec3(Math.random(), Math.random(), 0))
            .mul(2)
            .sub(new Vec3(1, 1, 0))
        if (Vec3.dot(p,p)> 1) return p
    }
}

export default class Camera {

    origin: Vec3
    vertical: Vec3
    horizontal: Vec3
    leftBottom: Vec3
    lensRadius: number
    focusDist: number

    u: Vec3
    v: Vec3
    w: Vec3

    time0: number
    time1: number
    constructor(lookfrom: Vec3, lookto: Vec3, vup: Vec3, vfov: number, aspect: number, aperture: number, t0: number, t1: number, focuDist?: number) {
        let theta = vfov * Math.PI / 180
        let harf_height = Math.tan(theta / 2)
        let harf_width = harf_height * aspect

        this.time0 = t0
        this.time1 = t1
        this.lensRadius = aperture / 2
        this.origin = lookfrom
        this.w = lookfrom.sub(lookto).unitVec()
        this.u = Vec3.cross(vup, this.w).unitVec()
        this.v = Vec3.cross(this.w, this.u)

        this.focusDist = focuDist ? focuDist : lookfrom.sub(lookto).length()
        this.vertical = this.v.mul(harf_height * 2).mul(this.focusDist)
        this.horizontal = this.u.mul(harf_width * 2).mul(this.focusDist)
        this.leftBottom = this.origin
            .sub(this.horizontal.mul(0.5))
            .sub(this.vertical.mul(0.5))
            .sub(this.w.mul(this.focusDist))
    }


    getRay(x: number, y: number): Ray {
        const rd = randomInUnitDist().mul(this.lensRadius)
        const offset = this.u.mul(rd.e0).add(this.v.mul(rd.e1))

        return new Ray(
            this.origin.add(offset),
            this.leftBottom
                .add(this.horizontal.mul(x))
                .add(this.vertical.mul(y))
                .sub(this.origin)
                .sub(offset),
            this.time0 + Math.random() * (this.time1 - this.time0)
        )
    }

}