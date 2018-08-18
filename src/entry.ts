import Px from './worker/Px'
import RenderTask from './worker/RenderTask'



let imageData: ImageData
let canvas = document.getElementsByTagName('canvas')[0]

let ctx: CanvasRenderingContext2D
let workerTasks: { worker: Worker; amount: number; complete: number }[] = []
let amount = 0
let complete = 0

let bar= document.getElementById('processline')


//:HTMLCanvasElement
canvas.height = 400
canvas.width = 800
//:CanvasRenderingContext2D
const _ctx = canvas.getContext('2d')


function app(ctx: CanvasRenderingContext2D, width: number, height: number) {
    initTasks(ctx, 2, width, height)
}

app(_ctx, canvas.width, canvas.height)


const taskMsg: { [key: string]: Function } = {
    warning(msg: string) {
        alert(msg)
    },

    render(worker: Worker, task: RenderTask) {
        const position = task.position

        task.pixels.forEach((v, i) => {
            const _i = i * 4
            imageData.data[_i + position] = v.color[0]
            imageData.data[_i + position + 1] = v.color[1]
            imageData.data[_i + position + 2] = v.color[2]
            imageData.data[_i + position + 3] = v.color[3]
        })

        ctx.putImageData(imageData, 0, 0)

        complete += task.pixels.length

        bar.style.width = complete / amount * 100 + '%'



    }

}


// 初始化所有 task
function initTasks(_ctx: CanvasRenderingContext2D, taskCount: number, width: number, height: number) {


    imageData = _ctx.createImageData(width, height)
    ctx = _ctx
    workerTasks = []

    const n = width * height
    const length = Math.ceil(n / taskCount)

    amount = n

    let task = new RenderTask(0, [], width, height)

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = y * width * 4 + x * 4


            task.pixels.push(new Px(x, y))

            if (task.pixels.length >= length || index / 4 === (n - 1)) {
                createTask(task)
                task = new RenderTask(index + 4, [], width, height)
            }
        }
    }



}


// 生成一个 task
function createTask(task: RenderTask) {
    const worker = new Worker('./dist/task.worker.js')

    worker.postMessage({
        method: 'renderTask',
        args: [task]
    })

    worker.onmessage = function (res: {
        data: { method: string; args: any[] }
    }) {
        const { method, args } = res.data

        if (taskMsg[method]) {
            taskMsg[method](worker, ...args)
        } else {
            ; (<any>postMessage)({
                method: 'warning',
                args: [`worker: can't find method (${method})`]
            })
        }
    }

    workerTasks.push({ worker, amount: task.pixels.length, complete: 0 })


    task = null
}



