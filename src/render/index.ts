import Vec3 from "./vec3"
import Ray from "./ray"
import progress from './progress'

export default function (image: Uint8ClampedArray, width: number, height: number): {
    method: string,
    args: Uint8ClampedArray[]
} {
    progress('start')

    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {

            let index = y * width * 4 + x * 4,
                [r, g, b, a] = sampling(x / width, y / height)

            image[index] = r * 255
            image[index + 1] = g * 255
            image[index + 2] = b * 255
            image[index + 3] = a * 255
        }

        progress(y/height)
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


    const ray = new Ray(origin, leftBottom.add(horizontal.mul(x)).add(vertical.mul(y)))


    const {e0,e1,e2} = color(ray)

    let a = 1


    return [e0,e1,e2, a]

}


function hitSphere(center: Vec3, radius: number, ray: Ray) {
    const oc = Vec3.sub(ray.origin, center)
    const a = Vec3.dot(ray.direction, ray.direction)
    const b = Vec3.dot(oc, ray.direction) * 2
    const c = Vec3.dot(oc, oc) - radius ** 2

    const dist = b ** 2 - 4 * a * c

    return (
        dist < 0 ?
            -1 :
            (-b - Math.sqrt(dist)) / (2 * a)
    )
}

function color(r: Ray) {
    let t1 = hitSphere(new Vec3(0, 0, -1), 0.5, r)

    // 画个球
    if (t1 > 0) {
        const n = Vec3.sub(r.getPoint(t1), new Vec3(0, 0, -1))
        return n.add(1).mul(0.7)
    }

    // 设置背景色
    const
        unitDirection = r.direction.unitVec(),
        t = (unitDirection.e1 + 1.0) * 0.5

    return Vec3.add(new Vec3(1, 1, 1).mul((1 - t)), new Vec3(0.5, 0.7, 1).mul(t))
}

