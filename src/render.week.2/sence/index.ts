import Ray from "../base/Ray";
import Vec3 from "../base/Vec3";

import threeBalls from './threeBalls'
import singleBox from './singleBox'
import manyBalls from './manyBalls'
import Camera from "../base/Camera";
import Hitable from "../shape/Hitable.interface";

type Background = (ray: Ray) => Vec3

const bgNormal = (r: Ray) => {
    const
        unitDirection = r.direction.unitVec(),
        t = (unitDirection.e1 + 1.0) * 0.5
    return Vec3.add(new Vec3(1, 1, 1).mul(1 - t), new Vec3(0.3, 0.5, 1).mul(t))
}

const bgBlack =  (r: Ray) => new Vec3(0,0,0)

const [camera,world,background] = <[Camera,Hitable,Background]>[...singleBox(),bgNormal]

export {
    background,world,camera
}
