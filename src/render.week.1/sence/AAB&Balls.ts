import Camera from "../base/Camera";
import Vec3 from "../base/Vec3";
import Hitable from "../shape/Hitable.interface";
import MovingSphere from "../shape/MovingSphere";
import Lambertian from "../material/Lambertian";
import Sphere from "../shape/Sphere";
import Metal from "../material/Metal";
import Dielectric from "../material/Dielectric";
import HitList from "../shape/HitList";
import AAB from "../shape/AAB";
import Rect from "../shape/Rect";


export default function (): [Camera, Hitable] {
    const balll = new Sphere(
        new Vec3(1, 0, -1),
        0.5,
        new Metal(new Vec3(0.8, 0.9, 0.4), 0.1)
    )
    const ballll = new Sphere(
        new Vec3(-1, 0, -1),
        0.5,
        new Metal(new Vec3(0.8, 0.4, 0.9), 0.5)
    )

    // const box = new AAB(
    //     new Vec3(-0.25, -0.25, -1.25),
    //     new Vec3(0.25, 0.25, -0.25),
    //     new Metal(new Vec3(0.8, 0.4, 0.9), 0.5)
    // )
    
    const box = new Rect(
        1,1,1,
        new Dielectric(new Vec3(1, 1, 1), 1)
    )
    .translate(new Vec3(0,0,-1))

    const earth = new Sphere(
        new Vec3(0, -100.5, -1),
        100,
        new Metal(0.5, 0.2)
    )
    const world = new HitList(
        box,
        balll,
        ballll,
        earth
    )

    const camera = new Camera(
        new Vec3(-2, 2, 1),
        new Vec3(0, 0, -1),
        new Vec3(0, 1, 0),
        30, 2, 0.05,
        0, 1
    )
    return [camera, world]
}