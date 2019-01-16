import Camera from "../base/Camera";
import Vec3 from "../base/Vec3";
import Hitable from "../shape/Hitable.interface";
import MovingSphere from "../shape/MovingSphere";
import Lambertian from "../material/Lambertian";
import Sphere from "../shape/Sphere";
import Metal from "../material/Metal";
import Dielectric from "../material/Dielectric";
import HitList from "../shape/HitList";
import { Nosie } from "../texture";


export default function (): [Camera, Hitable] {
    const ball = new Sphere(
        new Vec3(0, 2, 0),
        2,
        new Lambertian(new Nosie(5))
    )

    const earth = new Sphere(
        new Vec3(0, -1000, 0),
        1000,
        new Lambertian(new Nosie(5))
    )
    const world = new HitList(
        ball,
        earth
    )
    const camera = new Camera(
        new Vec3(12, 2, 3),
        new Vec3(0, 0, 0),
        new Vec3(0, 1, 0),
        20, 2, 0.0001,
        0, 1,
        10
    )
    return [camera, world]
}