export default {
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
    }
}