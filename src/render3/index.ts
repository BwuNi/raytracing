import Px from '../task/Px'

import Sphere from './utils/Sphere'
import hitable from './utils/hitable.interface'
import HitableList from './utils/HitableList'
import Camera from './utils/Camera'
import Vec3 from './utils/Vec3'
import Ray from './utils/Ray'
import Lambertian from './utils/Lambertian'
import Metal from './utils/Metal'
import Dielectirc from './utils/Dielectirc'

export default function renderPixel(px: Px, width: number, height: number) {
    const n = 1000
        ;[px.r, px.g, px.b, px.a] = new Array(n)
            .fill(0)
            .map(m =>
                sampling(
                    (px.x + Math.random()) / width,
                    (px.y + Math.random()) / height,
                )
            )
            .reduce(
                (res, v) => {
                    res[0] += v[0]
                    res[1] += v[1]
                    res[2] += v[2]
                    res[3] += v[3]
                    return res
                },
                [0, 0, 0, 0]
            )
            .map(v => (v / n) ** (2 / 4) * 255)
}

function sampling(_x: number, _y: number) {

    const [x, y] = transform(_x, _y)

    const ray = camera.getRay(x, y)

    const { e0, e1, e2 } = color(ray, world)

    return [e0, e1, e2, 1]
}

// input   x [0..1] y [1..0]
// output  x [0..1] y [0..1]
function transform(x: number, y: number) {
    return [x, 1 - y]
}

const ball0 = new Sphere(
    new Vec3(0, 0, -1), 0.5,
     new Lambertian(new Vec3(0.5, 0.5, 0.5)))
const ball1 = new Sphere(
    new Vec3(-1, 0, -1), 0.5, 
    new Metal(new Vec3(0.8, 0.8, 0.8)))
const ball2 = new Sphere(
    new Vec3(1, 0, -1), 0.5, 
    new Dielectirc(new Vec3(0.8, 0.8, 0.8),1.3))
const earth = new Sphere(
    new Vec3(0, -10000.5, -1), 10000, 
    new Lambertian(new Vec3(0.5, 0.5, 0.5)))
const world = new HitableList([
    ball0,
     ball1, 
     ball2, 
    earth
])

const camera = new Camera(
    new Vec3(0, 0, 1), //origin
    new Vec3(-2, -1, -1), //leftBottom
    new Vec3(4, 0, 0), //horizontal
    new Vec3(0, 2, 0) //vertical
)


function color(
    r: Ray,
    world: hitable,
    step: number = 0,
    _attenuation: number | Vec3 = 1
): Vec3 {
    if (step > 50) return new Vec3(0, 0, 0)

    if (step > 2) {

        Math.random()

    }

    let { hit, rayOut, attenuation } = world.hit(r, 0.001, Infinity)



    // 递归实现
    if (hit) {
        if (!rayOut) {
            return new Vec3(0, 0, 0)
        }

        return color(rayOut, world, ++step, attenuation.mul(_attenuation))
    }
    // 设置背景色
    const unitDirection = r.direction.unitVec(),
        t = (unitDirection.e1 + 1.0) * 0.5

    // return new Vec3(1, 1, 1)
    return Vec3.add(new Vec3(1, 1, 1).mul(1-t), new Vec3(0.3, 0.5, 1).mul(t)).mul(_attenuation)

}