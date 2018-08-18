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

initTasks(ctx, height, width, 2)

function initTasks(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    amount: number
) {
    const n = width * height
    const len = Math.ceil(n / amount)

    let task = new RenderTask(0, [], width, height)

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            task.pixels.push(new Px(x, y))

            if (task.pixels.length >= len || y * width + x === n - 1) {
                performTask(task)
                task = new RenderTask(y * width * 4 + x * 4, [], width, height)
            }
        }
    }
}

const amount = width * height
let complete = 0

const taskMsg: { [key: string]: Function } = {
    partComplete(worker: Worker, task: RenderTask) {
		
		task.pixels.forEach((v,i)=>{
            const _i = i * 4
            image.data[_i + task.position] = v.r
            image.data[_i + task.position + 1] = v.g
            image.data[_i + task.position + 2] = v.b
            image.data[_i + task.position + 3] = v.a
		})

		complete += task.pixels.length
		bar.style.width = (complete/amount*100) +'%'

		ctx.putImageData(image, 0, 0)
		
	},

    allComplete(worker: Worker, task: RenderTask) {

		task.pixels.forEach((v,i)=>{
            const _i = i * 4
            image.data[_i + task.position] = v.r
            image.data[_i + task.position + 1] = v.g
            image.data[_i + task.position + 2] = v.b
            image.data[_i + task.position + 3] = v.a
		})

		complete += task.pixels.length
		bar.style.width = (complete/amount*100) +'%'

		ctx.putImageData(image, 0, 0)
		
		worker.terminate()

	}
}

// 执行一个 task
function performTask(task: RenderTask) {
    const worker = new Worker('./dist/_task.worker.js')

	console.log(2)
    worker.postMessage({
        method: 'render',
        args: [task]
    })

    worker.onmessage = function(res: {
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
