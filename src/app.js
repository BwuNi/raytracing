export default function app(ctx, width, height) {

    //:ImageData
    const imageData = ctx.createImageData(width, height)
    //: Uint8ClampedArray
    const image = imageData.data



    const onmessage = {
        warning(msg) {
            alert(msg)
        },
        reportProgress: (bar => (status, num) => {
            console.log(num)
            if (num)
                bar.style.width = num * 100 + '%'
            if (status == 'complete')
                bar.style.width = '100%'
        })(document.getElementById('processline')),
        render(image) {

            image.forEach((v, i) => { imageData.data[i] = v })

            ctx.putImageData(imageData, 0, 0)
        }
    }


    const worker = new Worker('/dist/worker.js')


    worker.postMessage({
        method: 'render',
        args: [image, width, height]
    })

    worker.onmessage = function({ data }) {
        const { method, args } = data

        if (onmessage[method])
            onmessage[method](...args)
        else
            alert(`app: can't find method(${method})`)
    }

}