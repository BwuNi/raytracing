import Px from './Px'

export default class RenderTask {
    pixels: Px[]
    position: number
    width:number
    height:number
    
    constructor(p: number, pixels: Px[] ,width:number,height:number) {
        this.position = p
        this.pixels = pixels
        this.height = height
        this.width = width
    }
}