import Px from '../task/Px'
import Ray from './base/Ray'
import Vec3 from './base/Vec3'
import Camera from './base/Camera'
import Sphere from './shape/Sphere'
import HitList from './shape/HitList'
import Metal from './material/Metal'
import Lambertian from './material/Lambertian'
import Dielectirc from './material/Dielectirc'

const camera = new Camera(
    new Vec3(0, 0, 1), //origin
    new Vec3(-2, -1, -1), //leftBottom
    new Vec3(4, 0, 0), //horizontal
    new Vec3(0, 2, 0) //vertical
)

const ball = new Sphere(
	new Vec3(0, 0, -1), 
	0.5, 
	new Metal(new Vec3(0.8,0.4,0.9),0.5)
)
const balll = new Sphere(
	new Vec3(1, 0, -1), 
	0.5, 
	new Metal(new Vec3(0.8,0.9,0.4),0.1)
)
const ballll = new Sphere(
	new Vec3(-1, 0, -1), 
	0.5, 
	new Dielectirc(new Vec3(1,1,1))
)

const earth = new Sphere(
    new Vec3(0, -100.5, -1), 
    100, 
    new Metal(0.8,0.2)
)

const World = new HitList(ball, balll, ballll, earth)

const n = 1

export default function renderPixel(v: Px, width: number, height: number) {
    ;[v.r, v.g, v.b, v.a] = new Array(n)
        .fill(0)
        .map(m =>
            color((v.x + Math.random()) / width, (v.y + Math.random()) / height)
        )
        .reduce((res, v) => res.map((item, i) => (item += v[i])), [0, 0, 0])
        .map(v => Math.floor((v / n) * 255.99))
        .concat([255])
}

function color(_x: number, _y: number) {
    const [x, y] = [_x, 1 - _y]

    const r = camera.getRay(x, y)

    const res = trace(r)

    return [res.e0, res.e1, res.e2]
}

function trace(r: Ray, step = 0, n: number | Vec3 = 1) {
    if (step > 50) return new Vec3(0, 0, 0)

    const hit = World.hit(r, 0.001, Infinity)

    let res: Vec3

    if (hit) {
        res = trace(hit.ray, ++step, hit.attenuation.mul(n))
    } else {
        // 设置背景色
        const unitDirection = r.direction.unitVec(),
            t = (unitDirection.e1 + 1.0) * 0.5

        res = Vec3.add(
            new Vec3(1, 1, 1).mul(1 - t),
            new Vec3(0.3, 0.5, 1).mul(t)
        ).mul(n)
    }
    return res
}
