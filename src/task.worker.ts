import RenderTask from './worker/RenderTask'

const appMsg: { [key: string]: Function } = {
    renderTask(worker: Worker, task: RenderTask) {
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