import render from './render'

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