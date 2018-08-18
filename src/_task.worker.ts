import RenderTask from './task/RenderTask'
import Px from './task/Px'

const appMsg: { [key: string]: Function } = {
    render
}

onmessage = function(e) {
    const { method, args = [] } = e.data

    if (appMsg[method]) {
        appMsg[method](...args)
    } else {
        console.log(`taskWorker: can't find method (${method})`)
    }
}

function render(task: RenderTask) {

    const { pixels, width, height, position } = task
	const len = 400

	let res = new RenderTask(position,[],width,height)

    pixels.forEach((v, i) => {
		renderPixel(v, width, height)
		res.pixels.push(v)

		if(res.pixels.length >= len){
			
			;(<any>postMessage)({
				method:'partComplete',
				args:[res]
			})

			res = new RenderTask(position + i*4,[],width,height)
		}

	})
	
	;(<any>postMessage)({
		method:'allComplete',
		args:[res]
	})
}

function renderPixel(v: Px, width: number, height: number) {
    v.r = v.g = v.b = v.a = 255
}
