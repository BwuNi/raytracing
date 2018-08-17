
import Sphere from './utils/Sphere'
import hitable from './utils/hitable.interface'
import HitableList from "./utils/HitableList";
import Camera from "./utils/Camera";
import Vec3 from "./utils/Vec3"
import Ray from "./utils/Ray"


import progress from './progress'

export default function (image: Uint8ClampedArray, width: number, height: number): {
    method: string,
    args: Uint8ClampedArray[]
} {
    progress('start')

    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {

            let index = y * width * 4 + x * 4
            const n = 100

            let [r, g, b, a] = new Array(n)
                .fill(0)
                .map(v => sampling((x + Math.random()) / width, (y + Math.random()) / height))
                .reduce((res, v) => {
                    res[0] += v[0]
                    res[1] += v[1]
                    res[2] += v[2]
                    res[3] += v[3]
                    return res
                }, [0, 0, 0, 0])
                .map(v => v / n)

            image[index] = r * 255
            image[index + 1] = g * 255
            image[index + 2] = b * 255
            image[index + 3] = a * 255
        }

        progress(y / height)
    }

    progress('complete')

    return {
        method: 'render',
        args: [image]
    }
}


// input   x [0..1] y [1..0]
// output  x [0..1] y [0..1]
function transform(x: number, y: number) {
    return [x, 1 - y]
}

function sampling(_x: number, _y: number) {
    const [x, y] = transform(_x, _y)

    const origin = new Vec3(0, 0, 0)
    const vertical = new Vec3(0, 2, 0)
    const horizontal = new Vec3(4, 0, 0)
    const leftBottom = new Vec3(-2, -1, -1)

    const ray = camera.getRay(x, y)

    const { e0, e1, e2 } = color(ray,world)

    return [e0, e1, e2, 1]

}


const ball = new Sphere(new Vec3(0, 0, -1), 0.5)
const earth = new Sphere(new Vec3(0, -100.5, -1), 100)
const world = new HitableList([ball, earth])

const camera = new Camera(new Vec3(0, 0, 0), new Vec3(-2, -1, -1), new Vec3(4, 0, 0), new Vec3(0, 2, 0))

function randomInUnitSphere() {
    let p: Vec3
    do {
        p = new Vec3(Math.random(), Math.random(), Math.random()).mul(2.0).sub(new Vec3(1, 1, 1))
    } while (p.squaredLength() >= 1)

    return p
}


function color(r: Ray, world: hitable): Vec3 {
    const hitRecord = world.hit(r, 0, Infinity)

    if (hitRecord) {
        const target = hitRecord.p.add(hitRecord.normal).add(randomInUnitSphere())
        return color(new Ray(hitRecord.p, target.sub(hitRecord.p)),world).mul(0.5)
        // return hitRecord.normal.add(1).mul(0.5)
    }


    // 设置背景色
    const
        unitDirection = r.direction.unitVec(),
        t = (unitDirection.e1 + 1.0) * 0.5

    return new Vec3(1,1,1)
    // return Vec3.add(new Vec3(1, 1, 1).mul((1 - t)), new Vec3(0.5, 0.7, 1).mul(t))
}

