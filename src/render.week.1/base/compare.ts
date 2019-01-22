const compare = {
    minmax(a: number, b: number, c?: number): [number, number] {
        const res: [number, number] = a < b ? [a, b] : [b, a]
        if (!c && c !== 0) return res
        if (c < res[0]) return (res[0] = c, res)
        if (c > res[1]) return (res[1] = c, res)
        return res
    },
    min(a: number, b: number, c?: number): number {
        const res: number = a < b ? a : b
        if (!c && c !== 0) return res
        if (c < res) return c
        return res
    },
    max(a: number, b: number, c?: number): number {
        const res: number = a > b ? a : b
        if (!c && c !== 0) return res
        if (c > res) return c
        return res
    },
    minmaxT<T>(
        [a, b, c]: [T, T, T?],
        func: (a: T) => number
    ): [T, T] {
        const res: [T, T] = func(a) < func(a) ? [a, b] : [b, a]

        if (c === undefined) return res
        if (func(<T>c) < func(res[0])) return (res[0] = c, res)
        if (func(<T>c) > func(res[0])) return (res[1] = c, res)

        return res
    },
    minT<T>(
        [a, b, c]: [T, T, T?],
        func: (a: T) => number
    ): T {
        const res: T = func(a) < func(b) ? a : b
        if (c !== undefined && (func(<T>c) < func(res))) return c
        return res
    },
    maxT<T>(
        [a, b, c = null]: [T, T, T?],
        func: (a: T) => number
    ): T {
        const res: T = func(a) > func(b) ? a : b
        if (c !== undefined && (func(<T>c) > func(res))) return c
        return res
    }
}



export default compare
