import HitList from "../shape/HitList";
import Dielectric from "../material/Dielectric";
import Vec3 from "../base/Vec3";
import Metal from "../material/Metal";
import Sphere from "../shape/Sphere";
import Camera from "../base/Camera";
import Hitable from "../shape/Hitable.interface";

const ball = new Sphere(
    new Vec3(0, 0, -1),
    0.5,
    new Metal(new Vec3(0.8, 0.4, 0.9), 0.5)
)
const balll = new Sphere(
    new Vec3(1, 0, -1),
    0.5,
    new Metal(new Vec3(0.8, 0.9, 0.4), 0.1)
)
const ballll = new Sphere(
    new Vec3(-1, 0, -1),
    0.5,
    new Dielectric(new Vec3(1, 1, 1), 1.5)
)
const ballll_inside = new Sphere(
    new Vec3(-1, 0, -1),
    -0.45,
    new Dielectric(new Vec3(1, 1, 1), 1.5)
)

const earth = new Sphere(
    new Vec3(0, -100.5, -1),
    100,
    new Metal(0.5, 0.2)
)


const camera = new Camera(
    new Vec3(-2,2,1),
    new Vec3(0,0,-1),
    new Vec3(0,1,0),
    30,2,0.05,
    0,1
)

// const balll = new Sphere(
//     new Vec3(1, 0, -1),
//     0.5,
//     new Metal(new Vec3(0.8, 0.9, 0.4), 0.1)
// )
// const ballll = new Sphere(
//     new Vec3(-1, 0, -1),
//     0.5,
//     new Dielectric(new Vec3(1, 1, 1), 1.5)
// )

// const box = new AAB(
//     new Vec3(-0.5, -0.5, -1.5),
//     new Vec3(0.5, 0.5, -0.5),
//     new Metal(new Vec3(0.8, 0.4, 0.9), 0.5)
// )
// const earth = new Sphere(
//     new Vec3(0, -100.5, -1),
//     100,
//     new Metal(0.5, 0.2)
// )
const world = new HitList(
    ball,
    balll,
    ballll,
    earth
)

export default function():[Camera,Hitable]{
    return [camera,world]
}