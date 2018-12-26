import Vec3 from './Vec3'
import Ray from './Ray';

export default class Camera {

    origin: Vec3
    vertical: Vec3
    horizontal: Vec3
    leftBottom: Vec3

    constructor(origin: Vec3, leftBottom: Vec3, horizontal: Vec3, vertical: Vec3) {
        this.origin = origin
        this.vertical = vertical
        this.leftBottom = leftBottom
        this.horizontal = horizontal
    }

    getRay(x: number, y: number): Ray {
        return new Ray(
            this.origin,
            this.leftBottom
                .add(this.horizontal.mul(x))
                .add(this.vertical.mul(y))
                .sub(this.origin))
    }
}