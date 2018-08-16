import app from './app'

//:HTMLCanvasElement
const canvas = document.createElement('canvas')
canvas.height = 400
canvas.width = 800
//:CanvasRenderingContext2D
const ctx = canvas.getContext('2d')

document.getElementById('app').appendChild(canvas)


const processBar = document.createElement('div')
processBar.className = 'processbar'

const processLine = document.createElement('div')
processLine.className = 'processline'
processLine.id = 'processline'

document.getElementById('app').appendChild(processBar)
processBar.appendChild(processLine)

app(ctx, canvas.width, canvas.height)