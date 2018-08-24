import Px from './Px'

export default class RenderTask {
    pixels: Px[]
    position: number
    width:number
    height:number
    
    constructor(pixels: Px[] ,width:number,height:number) {
        this.pixels = pixels
        this.height = height
        this.width = width
    }
}