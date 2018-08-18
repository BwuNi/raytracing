import RenderTask from './worker/RenderTask'
import render from './renderTask/index'

const appMsg: { [key: string]: Function } = {
    renderTask(task: RenderTask) {

        render(task, (task) => {
            ; (<any>postMessage)({
                method:'render',
                args:[task]
            })
        })

    }
}

onmessage = function (e) {
    const { method, args = [] } = e.data

    if (appMsg[method]) {
        const msg = appMsg[method](...args)
        if (msg) {
            ; (<any>postMessage)(msg)
        }
    } else {
        console.log(`taskWorker: can't find method (${method})`)
    }
}
