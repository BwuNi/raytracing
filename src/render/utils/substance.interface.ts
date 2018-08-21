import material from './material.interface'
import hitable from './hitable.interface';

export default class Substance{
    material:material
    hitable:hitable
    constructor(material:material,hit:hitable) {
        this.hitable = hit
        this.material = material    
    }

}