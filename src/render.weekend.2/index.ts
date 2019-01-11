import Px from '../task/Px'
import Ray from './base/Ray'
import Vec3 from './base/Vec3'
import Camera from './base/Camera'
import Sphere from './shape/Sphere'
import HitList from './shape/HitList'
import Metal from './material/Metal'
import Dielectric from './material/Dielectric'
import Lambertian from './material/Lambertian'
import hitable from './shape/Hitable.interface';
import MovingSphere from './shape/MovingSphere';
import AAB from './shape/AAB';


const random = function (seed: number) { return parseFloat('0.' + Math.sin(seed).toString().substr(6)); }

// const camera = new Camera(
//     new Vec3(9, 1.1, 2),
//     new Vec3(0, 0.6, -1),
//     new Vec3(0, 1, 0),
//     30, 2, 0.05,
//     0,1,
//     new Vec3(9, 1.5, 2).sub(new Vec3(0, 0, -1)).length() * 0.5
// )

// const ball = new Sphere(
//     new Vec3(0, 0, -1),
//     0.5,
//     new Metal(new Vec3(0.8, 0.4, 0.9), 0.5)
// )
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
// const ballll_inside = new Sphere(
//     new Vec3(-1, 0, -1),
//     -0.45,
//     new Dielectric(new Vec3(1, 1, 1), 1.5)
// )

// const earth = new Sphere(
//     new Vec3(0, -100.5, -1),
//     100,
//     new Metal(0.5, 0.2)
// )


// const world =createSence()

const camera = new Camera(
    new Vec3(-2,2,1),
    new Vec3(0,0,-1),
    new Vec3(0,1,0),
    30,2,0.05,
    0,1
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

const box = new AAB(
    new Vec3(-0.5, -0.5, -1.5),
    new Vec3(0.5, 0.5, -0.5),
    new Metal(new Vec3(0.8, 0.4, 0.9), 0.5)
)
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

const n = 10

export default function renderPixel(v: Px, width: number, height: number) {
    ;[v.r, v.g, v.b, v.a] = new Array(n)
        .fill(0)
        .map(m =>
            color((v.x + Math.random()) / width, (v.y + Math.random()) / height)
        )
        .reduce((res, v) => res.map((item, i) => (item += v[i])), [0, 0, 0])
        .map(v => Math.floor((v / n) ** 0.5 * 255.99))
        .concat([255])
}

function color(_x: number, _y: number) {
    const [x, y] = [_x, 1 - _y]

    const r = camera.getRay(x, y)

    const res = trace(r)

    return [res.e0, res.e1, res.e2]
}

function trace(r: Ray, step = 0): Vec3 {
    if (step > 50) return new Vec3(0, 0, 0)

    const res = world.hit(r, 0.001, Infinity)

    if (res) {
        return trace(res[1], ++step).mul(res[2])
    } else {
        // 设置背景色
        const
            unitDirection = r.direction.unitVec(),
            t = (unitDirection.e1 + 1.0) * 0.5
        return Vec3.add(new Vec3(1, 1, 1).mul(1 - t), new Vec3(0.3, 0.5, 1).mul(t))
    }
}


function createSence(): hitable {
    const list: hitable[] = (new Array(20)).fill(0).map((v, _a) => (new Array(20)).fill(0).map((v, _b) => {
        const a = _a - 11
        const b = _b - 11
        const choose_mat = random(a * 310 + b)
        const center = new Vec3(a + 0.9 * random(a * 311 + b), 0.2, b + 0.9 * random(a * 312 + b))
        if (center.sub(new Vec3(4, 0.2, 0)).length() > 0.9) {
            if (choose_mat < 0.4) {
                return new MovingSphere(
                    center,
                    center.add(new Vec3(0,random(a * 316 + b),0).mul(0.5)), 
                    0.2,
                    new Lambertian(new Vec3(random(a * 313 + b) * random(a * 314 + b), random(a * 315 + b) * random(a * 316 + b), random(a * 317 + b) * random(a * 318 + b))),
                    camera.time0,camera.time1
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
            new Lambertian(new Vec3(0.5, 0.5, 0.5))
        )
    )

    return new HitList(...list)

}