import Ray from "../base/Ray";
import HitRecord from "./HitRecord";
import Material, { Attenuation } from "../material/Material.interface";
import AABB from "./AABB";

export default interface Hitable {
    
    material?:Material

    aabb:(tmin:number,tmax:number)=>AABB
    
    _aabb:AABB
    
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