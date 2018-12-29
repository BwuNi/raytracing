import Px from './task/Px'
import RenderTask from './task/RenderTask'

const height = 400
const width = 800

const canvas = document.getElementsByTagName('canvas')[0]
canvas.height = height
canvas.width = width

const ctx = canvas.getContext('2d')
const image = ctx.createImageData(width, height)
const bar = document.getElementById('processline')


initTasks(ctx, width, height, 4)

function initTasks(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    amount: number
) {
    const n = width * height
    const len = Math.ceil(n / amount)


    const pixels: Px[][] = []
    for (let y = 0; y < height; y++) {
        pixels.push([])
        for (let x = 0; x < width; x++) {
            pixels[y].push(new Px(x, y))
        }
    }

    let task = new RenderTask([], width, height)
    while (pixels.length) {

        const y = Math.floor(Math.random() * (pixels.length - 0.0001))

        const pxs = pixels[y]

        const x = Math.floor(Math.random() * (pxs.length - 0.0001))

        const px = pxs.splice(x, 1)[0]

        task.pixels.push(px)
        
        if (pxs.length == 0) pixels.splice(y, 1)

        if (task.pixels.length >= len || pixels.length == 0) {
            performTask(task)
            task = new RenderTask([], width, height)
        }
    }
}


// 执行一个 task
function performTask(task: RenderTask) {

    const worker = new Worker('./dist/task.worker.js')

    worker.postMessage({
        method: 'render',
        args: [task]
    })

    worker.onmessage = function (res: {
        data: { method: string; args: any[] }
    }) {
        const { method, args } = res.data

        if (taskMsg[method]) {
            taskMsg[method](worker, ...args)
        } else {
            alert(`app : can't find method (${method})`)
        }
    }

}



const amount = width * height
let complete = 0


const taskMsg: { [key: string]: Function } = {
    partComplete(worker: Worker, task: RenderTask) {
        task.pixels.forEach((v, i) => {
            const position = (v.x + v.y * task.width) * 4
            image.data[position] = v.r
            image.data[position + 1] = v.g
            image.data[position + 2] = v.b
            image.data[position + 3] = v.a
        })

        complete += task.pixels.length
        bar.style.width = (complete / amount) * 100 + '%'

        ctx.putImageData(image, 0, 0)
    },

    allComplete(worker: Worker, task: RenderTask | null) {
        if (task) {
            task.pixels.forEach((v, i) => {
                const position = (v.x + v.y * task.width) * 4
                image.data[position] = v.r
                image.data[position + 1] = v.g
                image.data[position + 2] = v.b
                image.data[position + 3] = v.a
            })

            complete += task.pixels.length
            bar.style.width = ((complete / amount) > 1 ? 1 : (complete / amount)) * 100 + '%'


            console.log(complete)

            ctx.putImageData(image, 0, 0)
        }

        worker.terminate()
    }
}