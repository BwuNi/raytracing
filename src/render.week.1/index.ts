import Px from '../task/Px'
import Ray from './base/Ray'
import Vec3 from './base/Vec3'
import sence from './sence'


const n = 30
const [camera,world] = sence()

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

    if (res && res[1]) {
        return trace(res[1], ++step).mul(res[2])
    }else if(res){
        return res[2]?res[2]:new Vec3(0,0,0)
    } else {
        // 设置背景色
        return new Vec3(0,0,0)
        const
            unitDirection = r.direction.unitVec(),
            t = (unitDirection.e1 + 1.0) * 0.5
        return Vec3.add(new Vec3(1, 1, 1).mul(1 - t), new Vec3(0.3, 0.5, 1).mul(t))
    }
}


