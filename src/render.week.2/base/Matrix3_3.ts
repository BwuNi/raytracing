import Vec3 from "../../render.weekend/base/Vec3";

export default class Matrix3_3 {
    value: [
        number, number, number,
        number, number, number,
        number, number, number
    ]


    constructor(a: [
        number, number, number,
        number, number, number,
        number, number, number
    ]) {
        this.value = a
    }

    vec3(v: Vec3): Vec3 {
        const c0 = new Vec3(this.value[0], this.value[3], this.value[6])
        const c1 = new Vec3(this.value[1], this.value[4], this.value[7])
        const c2 = new Vec3(this.value[2], this.value[5], this.value[8])

        return new Vec3(
            Vec3.dot(v, c0),
            Vec3.dot(v, c1),
            Vec3.dot(v, c2)
        )
    }


    det() {
        const [
            a, b, c,
            d, e, f,
            g, h, i,
        ] = this.value

        return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g)
    }

    inverse(): Matrix3_3 {
        const det = this.det()

        if (det === 0) return null

        const m = <[
            number, number, number,
            number, number, number,
            number, number, number
        ]>M(this.transposed().value).map(v => v / det)

        return new Matrix3_3(m)
    }

    transposed(): Matrix3_3 {
        const [
            v1_1, v1_2, v1_3,
            v2_1, v2_2, v2_3,
            v3_1, v3_2, v3_3,
        ] = this.value
        return new Matrix3_3([
            v1_1, v2_1, v3_1,
            v1_2, v2_2, v3_2,
            v1_3, v2_3, v3_3,
        ])
    }

    matrix3_3(v: Matrix3_3) {
        const [
            v1_1, v1_2, v1_3,
            v2_1, v2_2, v2_3,
            v3_1, v3_2, v3_3,
        ] = v.value

        const [
            w1_1, w1_2, w1_3,
            w2_1, w2_2, w2_3,
            w3_1, w3_2, w3_3,
        ] = this.value




    }

}

function det2_2([a, b, c, d]: [number, number, number, number]) {
    return a * d - b * c
}

function M([
    v1_1, v1_2, v1_3,
    v2_1, v2_2, v2_3,
    v3_1, v3_2, v3_3,
]: [
        number, number, number,
        number, number, number,
        number, number, number
    ]) {

    const a: [
        [number, number, number],
        [number, number, number],
        [number, number, number]
    ] = [
            [v1_1, v1_2, v1_3],
            [v2_1, v2_2, v2_3],
            [v3_1, v3_2, v3_3],
        ]


    const c = a.map((v, i) =>
        v.map((w, j) =>
            a.filter((e, _i) => _i != i)
                .map(f =>
                    f.filter((_w, _j) => j != _j)
                )
        )
    )
        .reduce((a, b) => a.concat(b))
        .map(v => det2_2([v[0][0], v[0][1], v[1][0], v[1][1]]))
        .map((v, i) => v * (-1) ** i)

    return <[
        number, number, number,
        number, number, number,
        number, number, number
    ]>c
}
console.log(
    new Matrix3_3([
        1, 2, 3,
        0, 1, 4,
        5, 6, 0
    ]).inverse()
)

const o = new Matrix3_3([
    1, 2, 3,
    0, 1, 4,
    5, 6, 0
])

const i = o.inverse()

const vec = new Vec3(1, 6, 3)

const arc = new Vec3(3, -1, 1)

console.log(
    Vec3.dot(
        o.vec3(vec),
        i.transposed().vec3(arc)
    )
)
//22 18 41

// 如何求3X3矩阵的逆矩
//https://zh.wikihow.com/%E6%B1%823X3%E7%9F%A9%E9%98%B5%E7%9A%84%E9%80%86%E7%9F%A9%E9%98%B5
