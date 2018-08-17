import Px from './worker/Px'
import RenderTask from './worker/RenderTask'

let wokers: Worker[] = []

const taskMsg: { [key: string]: Function } = {
    render(width: number, height: number) {
        initTasks(10, width, height)
    }
}

const appMsg: { [key: string]: Function } = {
    taskComplete(worker: Worker, task: RenderTask) {

        wokers = wokers.filter(v => {
            const res = v !== worker
            if (!res) { v.terminate() }
            return res
        });

        (<any>postMessage)({
            method: 'partComplete',
            args: [task]
        })
    }
}

onmessage = function (e) {
    const { method, args = [] } = e.data

    if (appMsg[method]) {
        const msg = appMsg[method](...args)
        if (msg) {
            (<any>postMessage)(msg)
        }
    } else {
        (<any>postMessage)({
            method: 'warning',
            args: [`worker: can't find method (${method})`]
        })
    }
}


function initTasks(taskCount: number, width: number, height: number) {

    const n = width * height
    const length = Math.ceil(n / taskCount)

    let task = new RenderTask(0)


    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {

            let index = y * width * 4 + x * 4

            if (task.pixels.length >= length) {
                createTask(task)
                task = new RenderTask(index)
            }
            task.pixels.push(new Px(x, y, width, height))
        }

    }
}



function createTask(task: RenderTask) {
    const woker = new Worker('./task.worker.js')

    worker.postMessage({
        method: 'renderTask',
        args: [task]
    })

    worker.onmessage = function (res: { data: { method: string, args: any[] } }) {

        const { method, args } = res.data

        if (taskMsg[method]) {
            taskMsg[method](worker, ...args)
        }
        else {
            (<any>postMessage)({
                method: 'warning',
                args: [`worker: can't find method (${method})`]
            })
        }
    }

    wokers.push(woker)
}


