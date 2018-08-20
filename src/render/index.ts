import Px from '../task/Px'

import Sphere from './utils/Sphere'
import hitable from './utils/hitable.interface'
import HitableList from './utils/HitableList'
import Camera from './utils/Camera'
import Vec3 from './utils/Vec3'
import Ray from './utils/Ray'

export default function renderPixel(px: Px, width: number, height: number) {
    const n = 50
        ;[px.r, px.g, px.b, px.a] = new Array(n)
            .fill(0)
            .map(m =>
                sampling(
                    (px.x + Math.random()) / width,
                    (px.y + Math.random()) / height
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
            .map(v => ((v / n))**(3/4) * 255)
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

const ball0 = new Sphere(new Vec3(0, 0, -1), 0.5)
const ball1 = new Sphere(new Vec3(-1, 0, -1), 0.5)
const ball2 = new Sphere(new Vec3(1, 0, -1), 0.5)
const earth = new Sphere(new Vec3(0, -100.5, -1), 100)
const world = new HitableList([ball0,ball1,ball2, earth])

const camera = new Camera(
    new Vec3(0, 0, 0),//origin
    new Vec3(-2, -1, -1),//leftBottom
    new Vec3(4, 0, 0),//horizontal
    new Vec3(0, 2, 0)//vertical
)

function randomInUnitSphere() {
    let p: Vec3
    do {
        p = new Vec3(Math.random(), Math.random(), Math.random())
            .mul(2.0)
            .sub(new Vec3(1, 1, 1))
    } while (p.squaredLength() >= 1)

    return p
}

function color(r: Ray, world: hitable): Vec3 {
    let hitRecord = world.hit(r, 0.001, Infinity)

    // 递归实现
    if (hitRecord) {
        const target = hitRecord.p
            .add(hitRecord.normal)
            .add(randomInUnitSphere())
        return color(new Ray(hitRecord.p, target.sub(hitRecord.p)), world).mul(0.5)
        // return hitRecord.normal.add(1).mul(0.5)
    }
    // 设置背景色
    const unitDirection = r.direction.unitVec(),
        t = (unitDirection.e1 + 1.0) * 0.5

    // return new Vec3(1, 1, 1)
    return Vec3.add(new Vec3(1, 1, 1).mul((1 - t)), new Vec3(0.5, 0.7, 1).mul(t))


}
