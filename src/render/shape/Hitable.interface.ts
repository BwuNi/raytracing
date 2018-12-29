import Ray from "../base/Ray";
import HitRecord from "./HitRecord";
import Material, { Attenuation } from "../material/Material.interface";

export default interface Hitable {
    
    material?:Material
    
    hit: (
        ray: Ray,
        t_min: number,
        t_max: number
    ) =>
    HitResult
}

type HitResult = [HitRecord,Ray,Attenuation]

export {
    HitResult
}