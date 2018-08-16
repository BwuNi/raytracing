import Vec3 from './vec3'
import Ray from './ray'

export default function(canvas) {
    if (!canvas.getContext) return

    const
        ctx = canvas.getContext('2d'),
        width = canvas.width,
        height = canvas.height,
        imageData = ctx.createImageData(width, height)


    draw(ctx, width, height, imageData)
}

function draw(ctx, width, height, imageData) {
    const data = imageData.data

    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {

            let index = y * width * 4 + x * 4,
                [r, g, b, a] = sampling(x / width, y / height)

            data[index] = r * 255
            data[index + 1] = g * 255
            data[index + 2] = b * 255
            data[index + 3] = a * 255
        }
    }

    ctx.putImageData(imageData, 0, 0);
}


// input   x [0..1] y [1..0]
// output  x [-2,2] y [-1,1]
// function transform(x, y) {
//     return [(x - 0.5) * 4, (0.5 - y) * 2]
// }


// input   x [0..1] y [1..0]
// output  x [0..1] y [0..1]
function transform(x, y) {
    return [x, 1 - y]
}

function hitSphere(center, radius, ray) {
    const oc = Vec3.sub(ray.origin, center)

    const a = Vec3.dot(ray.direction, ray.direction)
    const b = Vec3.dot(oc, ray.direction) * 2
    const c = Vec3.dot(oc, oc) - radius ** 2

    const dist = b ** 2 - 4 * a * c

    return (
        dist < 0 ?
        -1:
        (-b - Math.sqrt(dist)) / (2 * a)
    )
}



function color(r) {
    let t1 = hitSphere(new Vec3(0, 0, -1), 0.5, r)


    if (t1 > 0) {
        const n = Vec3.sub(r.getPoint(t1), new Vec3(0, 0, -1))


        return n.add(new Vec3( 1,  1, 1)).mul(1)
    }

    const
        unitDirection = r.direction.unitVec(),
        t = (unitDirection.e[1] + 1.0) * 0.5



    return Vec3.add(new Vec3(1, 1, 1).mul((1 - t)), new Vec3(0.5, 0.7, 1).mul(t))
}

function sampling(x, y) {
    const [_x, _y] = transform(x, y)

    const origin = new Vec3(0, 0, 0)
    const vertical = new Vec3(0, 2, 0)
    const horizontal = new Vec3(4, 0, 0)
    const leftBottom = new Vec3(-2, -1, -1)


    const ray = new Ray(origin, leftBottom.add(horizontal.mul(_x)).add(vertical.mul(_y)))


    const vec = color(ray)

    let a = 1

    return [...vec.e, a]
}


function hitable(params) {
    
}