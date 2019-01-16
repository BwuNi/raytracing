import Camera from "../base/Camera";
import Vec3 from "../base/Vec3";
import Hitable from "../shape/Hitable.interface";
import MovingSphere from "../shape/MovingSphere";
import Lambertian from "../material/Lambertian";
import Sphere from "../shape/Sphere";
import Metal from "../material/Metal";
import Dielectric from "../material/Dielectric";
import HitList from "../shape/HitList";
import { Checker, Color } from "../texture";

import random from '../base/random'

const camera = new Camera(
    new Vec3(9, 1.1, 2),
    new Vec3(0, 0.6, -1),
    new Vec3(0, 1, 0),
    30, 2, 0.05,
    0, 1,
    new Vec3(9, 1.5, 2).sub(new Vec3(0, 0, -1)).length() * 0.5
)

function createSence(): Hitable {
    const list: Hitable[] = (new Array(20)).fill(0).map((v, _a) => (new Array(20)).fill(0).map((v, _b) => {
        const a = _a - 11
        const b = _b - 11
        const choose_mat = random(a * 310 + b)
        const center = new Vec3(a + 0.9 * random(a * 311 + b), 0.2, b + 0.9 * random(a * 312 + b))
        if (center.sub(new Vec3(4, 0.2, 0)).length() > 0.9) {
            if (choose_mat < 0.4) {
                return new MovingSphere(
                    center,
                    center.add(new Vec3(0, random(a * 316 + b), 0).mul(0.5)),
                    0.2,
                    new Lambertian(new Vec3(random(a * 313 + b) * random(a * 314 + b), random(a * 315 + b) * random(a * 316 + b), random(a * 317 + b) * random(a * 318 + b))),
                    camera.time0, camera.time1
                )
            } else if ((choose_mat < 0.7)) {
                return new Sphere(center, 0.2,
                    new Metal(new Vec3(0.5 * (random(a * 319 + b)), 0.5 * (1 + random(a * 320 + b)), 0.5 * (1 + random(a * 321 + b))), 0.5 * (1 + random(a * 322 + b)))
                )
            } else {
                return new Sphere(center, 0.2,
                    new Dielectric(new Vec3(1, 1, 1), 1.5)
                )
            }
        }
    })).reduce((a, b) => a.concat(b)).filter(i => i)

    list.push(
        new Sphere(new Vec3(4, 1, 0), 1,
            new Metal(new Vec3(0.7, 0.6, 0.5), 0)
        )
    )

    list.push(
        new Sphere(new Vec3(-4, 1, 0), 1,
            new Lambertian(new Vec3(0.4, 0.2, 0.1))
        )
    )

    list.push(
        new Sphere(new Vec3(0, 1, 0), 1,
            new Dielectric(new Vec3(1, 1, 1), 1.5)
        )
    )

    list.push(
        new Sphere(new Vec3(0, -1000, 0), 1000,
            new Lambertian(
                new Checker(
                    new Color(new Vec3(0.2,0.3,0.1)),
                    new Color(new Vec3(0.9,0.9,0.9))
                ))
        )
    )

    return new HitList(...list)

}

export default function():[Camera,Hitable]{
    return [camera,createSence()]
}