// export default class Vec3 {

//     e0: number = 0
//     e1: number = 0
//     e2: number = 0


//     constructor(e0 = 0, e1 = 0, e2 = 0) {
//         this.e0 = e0
//         this.e1 = e1
//         this.e2 = e2
//     }

//     // static new(...arg: [number | Vec3] | [number, number, number]): Vec3 {
//     //     if (arg.length > 1) return new Vec3(<number>arg[0], <number>arg[1], <number>arg[2])
//     //     else if (typeof arg[0] == 'number') return new Vec3(arg[0], arg[0], arg[0])
//     //     else if (typeof arg[0] == 'object') return arg[0]
//     // }

//     static new(a: number | Vec3,b?:number,c?:number): Vec3 {
//         if(typeof a == 'object') return (<Vec3>a)
//         else if(b||c||b==0||c==0) return new Vec3(a,b,c)
//         else return new Vec3(a,a,a)
//     }

//     static add(a1: number | Vec3, a2: number | Vec3): Vec3 {
//         const v1 = Vec3.new(a1)
//         const v2 = Vec3.new(a2)
//         return new Vec3(v1.e0 + v2.e0, v1.e1 + v2.e1, v1.e2 + v2.e2)
//     }

//     static sub(a1: number | Vec3, a2: number | Vec3): Vec3 {
//         const v1 = Vec3.new(a1)
//         const v2 = Vec3.new(a2)
//         return new Vec3(v1.e0 - v2.e0, v1.e1 - v2.e1, v1.e2 - v2.e2)
//     }

//     static mul(a1: number | Vec3, a2: number | Vec3): Vec3 {
//         const v1 = Vec3.new(a1)
//         const v2 = Vec3.new(a2)
//         return new Vec3(v1.e0 * v2.e0, v1.e1 * v2.e1, v1.e2 * v2.e2)
//     }

//     static div(a1: number | Vec3, a2: number | Vec3): Vec3 {
//         const v1 = Vec3.new(a1)
//         const v2 = Vec3.new(a2)
//         return new Vec3(v1.e0 / v2.e0, v1.e1 / v2.e1, v1.e2 / v2.e2)
//     }

//     static dot(a1: number | Vec3, a2: number | Vec3) {
//         const v1 = Vec3.new(a1)
//         const v2 = Vec3.new(a2)
//         return v1.e0 * v2.e0 + v1.e1 * v2.e1 + v1.e2 * v2.e2
//     }

//     static cross(a1: number | Vec3, a2: number | Vec3) {
//         const v1 = Vec3.new(a1)
//         const v2 = Vec3.new(a2)
//         return new Vec3(
//             (v1.e1 * v2.e2 - v1.e2 * v2.e1),
//             (v1.e0 * v2.e2 - v1.e2 * v2.e0) * (-1),
//             (v1.e0 * v2.e1 - v1.e1 * v2.e0)
//         )
//     }

//     // 向量长度
//     squaredLength() {
//         return this.e0 ** 2 + this.e1 ** 2 + this.e2 ** 2
//     }
//     length() {
//         return Math.sqrt(this.squaredLength())
//     }

//     // 向量加减乘除
//     add(v: Vec3 | number) {
//         return Vec3.add(this, v)
//     }

//     sub(v: Vec3 | number) {
//         return Vec3.sub(this, v)
//     }

//     mul(v: Vec3 | number) {

//         return Vec3.mul(this, v)
//     }

//     div(v: Vec3 | number) {
//         return Vec3.div(this, v)
//     }

//     //单位向量(向量方向)
//     unitVec() {
//         return this.div(this.length())
//     }


// }


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

const axis: ['e0', 'e1', 'e2'] = ['e0', 'e1', 'e2']


type Matrix = [
    number, number, number,
    number, number, number,
    number, number, number
]

export { axis ,Matrix}

