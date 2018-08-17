// import render from './render'

const worker = { render }

onmessage = function(e) {
    const { method, args = [] } = e.data

    if (worker[method]) {
        const msg = worker[method](...args)
        if (msg) {
            postMessage(msg)
        }
    } else
        postMessage({
            method: 'warning',
            args: [`worker: can't find method (${method})`]
        })
}

function createRenderTask(threadCount, image, width, height) {


    const n = width * height

    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {

            let index = y * width * 4 + x * 4

            image[index] = r * 255
            image[index + 1] = g * 255
            image[index + 2] = b * 255
            image[index + 3] = a * 255
        }

        progress(y / height)
    }
}


class Pixel {
    static width = 0
    static height = 0

    color = [255, 255, 255, 255]

    constructor(x, y) {
        this.x = x
        this.y = w
    }

    fill(r, g, b, a) {
        this.color = [r, g, b, a]
    }
}


class RenderTaskTask {

}