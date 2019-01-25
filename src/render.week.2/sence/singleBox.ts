import HitList from "../shape/HitList";
import Dielectric from "../material/Dielectric";
import Vec3 from "../base/Vec3";
import Metal from "../material/Metal";
import Sphere from "../shape/Sphere";
import Camera from "../base/Camera";
import Hitable from "../shape/Hitable.interface";
import Box from "../shape/Box";

const box = new Box(
    new Vec3(1.5, 1, 2),
    new Metal(new Vec3(0.8, 0.4, 0.9), 0.5)
)
const ball = new Sphere(
    new Vec3(0, 0, 0),
    1,
    new Metal(new Vec3(0.8, 0.4, 0.9), 0.5)
)
.scale(1,0.5,1.5)
.rorate('e2',30)
.rorate('e1',-20)
.translate(new Vec3(0,0.2,0))


const earth = new Sphere(
    new Vec3(0, -100.501, -1),
    100,
    new Metal(0.5, 0.2)
).translate(new Vec3(0,-0.3,0))


const camera = new Camera(
    new Vec3(-3,1.5,2),
    new Vec3(0,0,0),
    new Vec3(0,1,0),
    45,2,0.05,
    0,1
)


const world = new HitList(
    ball,
    earth
)

export default function():[Camera,Hitable]{
    return [camera,world]
}