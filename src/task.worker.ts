import RenderTask from './task/RenderTask'
import renderPixel from './render2/index'


const appMsg: { [key: string]: Function } = {
	render
}

onmessage = function (e) {
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

	let res = new RenderTask(position, [], width, height)

	function doTask(i: number) {

		for (let j = 0; j < len; j++) {
			renderPixel(pixels[i + j], width, height)
			res.pixels.push(pixels[i + j])
		}

		; (<any>postMessage)({
			method: 'partComplete',
			args: [res]
		})

		if ((i + len) < pixels.length) {

			res = new RenderTask(position + (i + len) * 4, [], width, height)

			return setTimeout(() => {
				doTask(i + len)
			}, 0);

		} else {
			; (<any>postMessage)({
				method: 'allComplete',
				args: [res]
			})
		}

	}
	
	doTask(0)
}

