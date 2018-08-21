import Vec3 from "./Vec3";
import Material from "./material.interface";
import Ray from "./Ray";
import HitRecord from "./HitRecord";

function randomInUnitSphere() {
    let p: Vec3
    do {
        p = new Vec3(Math.random(), Math.random(), Math.random())
            .mul(2.0)
            .sub(new Vec3(1, 1, 1))
    } while (p.squaredLength() > 1)

    return p
}

export default class Lambertian implements Material {
    albedo: Vec3 = new Vec3(0.5, 0.5, 0.5)

    constructor(albedo: Vec3 = new Vec3(0.5, 0.5, 0.5)) {

        if (albedo) this.albedo = albedo
    }

    scatter(ray_in: Ray, hitRecord: HitRecord) {


        const target = hitRecord.p
            .add(hitRecord.normal)
            .add(randomInUnitSphere())

        return new Ray(hitRecord.p, target.sub(hitRecord.p))
    }
}