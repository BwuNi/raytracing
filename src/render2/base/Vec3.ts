export default class Vec3 {

    e0: number = 0
    e1: number = 0
    e2: number = 0


    constructor(e0 = 0, e1 = 0, e2 = 0) {
        this.e0 = e0
        this.e1 = e1
        this.e2 = e2
    }


    static add(v1: number | Vec3, v2: number | Vec3): Vec3 {
        return (
            typeof v1 === 'number'
                ? Vec3.add(new Vec3(v1, v1, v1), v2)
                : typeof v2 === 'number'
                    ? Vec3.add(v1, new Vec3(v2, v2, v2))
                    : new Vec3(v1.e0 + v2.e0, v1.e1 + v2.e1, v1.e2 + v2.e2)
        )
    }

    static sub(v1: number | Vec3, v2: number | Vec3): Vec3 {
        return (
            typeof v1 === 'number'
                ? Vec3.sub(new Vec3(v1, v1, v1), v2)
                : typeof v2 === 'number'
                    ? Vec3.sub(v1, new Vec3(v2, v2, v2))
                    : new Vec3(v1.e0 - v2.e0, v1.e1 - v2.e1, v1.e2 - v2.e2)
        )
    }

    static mul(v1: number | Vec3, v2: number | Vec3): Vec3 {
        return (
            typeof v1 === 'number'
                ? Vec3.mul(new Vec3(v1, v1, v1), v2)
                : typeof v2 === 'number'
                    ? Vec3.mul(v1, new Vec3(v2, v2, v2))
                    : new Vec3(v1.e0 * v2.e0, v1.e1 * v2.e1, v1.e2 * v2.e2)
        )
    }

    static div(v1: number | Vec3, v2: number | Vec3): Vec3 {

        return (
            typeof v1 === 'number'
                ? Vec3.div(new Vec3(v1, v1, v1), v2)
                : typeof v2 === 'number'
                    ? Vec3.div(v1, new Vec3(v2, v2, v2))
                    : new Vec3(v1.e0 / v2.e0, v1.e1 / v2.e1, v1.e2 / v2.e2)
        )
    }

    static dot(v1: Vec3, v2: Vec3) {
        return v1.e0 * v2.e0 + v1.e1 * v2.e1 + v1.e2 * v2.e2
    }

    static cross(v1: Vec3, v2: Vec3) {
        return new Vec3(
            (v1.e1 * v2.e2 - v1.e2 * v2.e1),
            (v1.e0 * v2.e2 - v1.e2 * v2.e0) * (-1),
            (v1.e0 * v2.e1 - v1.e1 * v2.e0)
        )
    }

    // 向量长度
    squaredLength() {
        return this.e0 ** 2 + this.e1 ** 2 + this.e2 ** 2
    }
    length() {
        return Math.sqrt(this.squaredLength())
    }

    // 向量加减乘除
    add(v: Vec3 | number) {
        return Vec3.add(this, v)
    }

    sub(v: Vec3 | number) {
        return Vec3.sub(this, v)
    }

    mul(v: Vec3 | number) {

        return Vec3.mul(this, v)
    }

    div(v: Vec3 | number) {
        return Vec3.div(this, v)
    }

    //单位向量(向量方向)
    unitVec() {
        return this.div(this.length())
    }


}

