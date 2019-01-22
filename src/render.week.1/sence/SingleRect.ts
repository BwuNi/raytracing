import Camera from "../base/Camera";
import Vec3 from "../base/Vec3";
import Hitable from "../shape/Hitable.interface";
import MovingSphere from "../shape/MovingSphere";
import Lambertian from "../material/Lambertian";
import Sphere from "../shape/Sphere";
import Metal from "../material/Metal";
import Dielectric from "../material/Dielectric";
import HitList from "../shape/HitList";
import { Nosie, Color } from "../texture";
import AAB from "../shape/AAB";
import Rect, { Plane } from "../shape/Rect/Rect";
import DiffuseLight from "../material/DiffuseLight";


export default function (): [Camera, Hitable] {

    const ball = new Sphere(
        new Vec3(0, 2, 0),
        2,
        new Lambertian(new Nosie(10))
    )


    const box = new HitList(
        new Plane(
            'e0', [-1, 1],
            'e1', [-1, 1],
            'e2', 1,
            new Lambertian(new Color(new Vec3(0.9,0.1,0.2)))
            // new Metal(0.5, 0.0001)
        ),
        
        new Plane(
            'e0', [-1, 1],
            'e1', [-1, 1],
            'e2', -1,
            new Lambertian(new Color(new Vec3(0.9,0.7,0.1)))
            // new Metal(0.5, 0.0001)
        ),
        
        new Plane(
            'e0', [-1, 1],
            'e2', [-1, 1],
            'e1', 1,
            new Lambertian(new Color(new Vec3(0.9,0.9,0.9)))
            // new Metal(0.5, 0.0001)
        ),
        
        new Plane(
            'e0', [-1, 1],
            'e2', [-1, 1],
            'e1', -1,
            new Lambertian(new Color(new Vec3(0.9,0.9,0.9)))
            // new Metal(0.5, 0.0001)
        ),
        
        new Plane(
            'e1', [-1, 1],
            'e2', [-1, 1],
            'e0', -1,
            new Lambertian(new Color(new Vec3(0.9,0.9,0.9)))
            // new Metal(0.5, 0.0001)
        )
    )
    const light = new Plane(
        'e0', [-.5, .5],
        'e2', [-.5, .5],
        'e1', 0.999,
        // new Lambertian(new Nosie(5))
        new DiffuseLight(1)
    )

    const rect = new Rect(
        0.8,1.499,0.8,
        new Dielectric(1,1.5)
    ).translate(new Vec3(-0.5,-0.25,-0.5))
    
    // const rect = new Sphere(
    //     new Vec3(-0.5,-0.25,-0.5),
    //     0.5,
    //     new Dielectric(0.8,1.5)
    // ).translate(new Vec3(-0.5,-0.25,-0.5))
    
    const rect1 = new Rect(
        0.5,0.7,0.5,
        new Lambertian(new Nosie(800))
    ).translate(new Vec3(0.5,-0.65,0.5))

    const world = new HitList(
        box,
        rect,
        rect1,
        light
        
    )
    const camera = new Camera(
        new Vec3(4, 0, 0),
        new Vec3(0, 0, 0),
        new Vec3(0, 1, 0),
        40, 2, 0.0001,
        0, 1,
        10
    )


    return [camera, world]
}