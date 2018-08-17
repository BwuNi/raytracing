import Px from './Px'

export default class RenderTask {
    pixels: Px[]
    position: number
    constructor(p:number) {
        this.position = p
    }
}